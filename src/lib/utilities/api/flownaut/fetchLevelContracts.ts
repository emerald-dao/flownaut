import { addresses } from "$stores/flow/FlowStore";

export const fetchLevelContracts = async (
  levelId: string
) => {
  let contracts = import.meta.glob('/src/lib/content/flownaut/*/*/*/*.cdc');

  const iterableFiles = Object.keys(contracts);

  const thisLevelFiles = iterableFiles.filter((path) => {
    return path.split('/')[5] == levelId;
  })

  let allContracts: { [contractName: string]: string } = {};
  for (const path of thisLevelFiles) {
    const contractName = path.split('/')[8].split('.')[0];
    const contractCode = (await import(`../../../content/flownaut/${levelId}/en/contracts/${contractName}.cdc?raw`)).default;
    allContracts[contractName] = contractCode
  }

  let contractDependencies: { [contractName: string]: string[] } = {}
  for (const contractName in allContracts) {
    const dependencies = getDependencies(allContracts[contractName], Object.keys(allContracts));
    contractDependencies[contractName] = dependencies;
  }

  const deployOrder = tsort(createEdges(contractDependencies)).filter(contractName => {
    const isNotStandardContract = !addresses[contractName];
    return isNotStandardContract;
  })
  return { allContracts, deployOrder };
};

function getDependencies(code: string, contractNames: string[]) {
  var words = code.split(' ').join(',').split('\r').join(',').split('\n').join(',').split(',').filter(word => word !== '');

  let dependencies = [];
  let previousWord = '';
  for (var i = 0; i < words.length; i++) {
    let currentWord = words[i];
    if (previousWord === 'import' && contractNames.includes(currentWord)) {
      dependencies.push(currentWord);
    } else if (previousWord === 'pub' && currentWord === 'contract') {
      break
    }
    previousWord = currentWord;
  }
  return dependencies;
}

function tsort(edges) {
  let nodes = {}, sorted = [], visited = {};

  let Node = function (id) {
    this.id = id;
    this.afters = [];
  }

  edges.forEach((v) => {
    let from = v[0], to = v[1];
    if (!nodes[from]) nodes[from] = new Node(from);
    if (!nodes[to]) nodes[to] = new Node(to);
    nodes[from].afters.push(to);
  });

  Object.keys(nodes).forEach(function visit(idstr, ancestors) {
    let node = nodes[idstr], id = node.id;

    if (visited[idstr]) return;
    if (!Array.isArray(ancestors)) ancestors = [];

    ancestors.push(id);
    visited[idstr] = true;
    node.afters.forEach(function (afterID) {
      if (ancestors.indexOf(afterID) >= 0)
        throw new Error('closed chain : ' + afterID + ' is in ' + id);
      visit(afterID.toString(), ancestors.map(function (v) { return v }));
    });
    sorted.unshift(id);
  });

  return sorted;
}

const createEdges = (dep) => {
  let result = []
  Object.keys(dep).forEach(key => {
    dep[key].forEach(n => {
      result.push([n, key])
    })
  })
  return result
}