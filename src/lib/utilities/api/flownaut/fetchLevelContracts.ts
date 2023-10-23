import { addresses } from "$stores/flow/FlowStore";

export const fetchLevelContracts = async (
  levelId: string
) => {
  // the `{ as: 'raw' }` makes it so that we can import the content directly as a string! Woooohoooo
  let contracts = import.meta.glob('/src/lib/content/flownaut/*/*/*/*.cdc', { as: 'raw' });
  let allContracts: { [contractName: string]: string } = {};
  for (const path in contracts) {
    if (path.split('/')[5] == levelId) {
      const contractName = (path.split('/')[8]).split('.')[0];
      const mod = await contracts[path]()
      allContracts[contractName] = mod;
    }
  }

  // for each contract, get what dependencies it relies on
  let contractDependencies: { [contractName: string]: string[] } = {}
  for (const contractName in allContracts) {
    const dependencies = getDependencies(allContracts[contractName], Object.keys(allContracts));
    contractDependencies[contractName] = dependencies;
  }

  // order the depencies for deployment
  const deployOrder = orderDependencies(contractDependencies).filter(contractName => {
    return !addresses[contractName];
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

function orderDependencies(contractDependencies) {
  var keys = Object.keys(contractDependencies),
    used = new Set,
    result = [],
    i, item, length;

  do {
    length = keys.length;
    i = 0;
    while (i < keys.length) {
      if (contractDependencies[keys[i]].every(Set.prototype.has, used)) {
        item = keys.splice(i, 1)[0];
        result.push(item);
        used.add(item);
        continue;
      }
      i++;
    }
  } while (keys.length && keys.length !== length)
  result.push(...keys);

  return result;
}