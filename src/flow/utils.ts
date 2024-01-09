import { transactionStore } from '$stores/flow/TransactionStore';
import * as fcl from '@blocto/fcl';
import type { TransactionStatusObject } from '@blocto/fcl';
import type { ActionExecutionResult } from '$lib/stores/custom/steps/step.interface';
import { ECurrencies } from '$lib/types/common/enums';
import { removeWhitespace } from '$lib/utilities/dataTransformation/removeWhitespace';
import { addresses } from '$stores/flow/FlowStore';
import dappInfo from '$lib/config/config';
// import flowJSON from '../../flow.json';

export function replaceWithProperValues(cadence: String, defaultContractAddress: string | undefined) {
  let broken = cadence.split(/\s/g);
  for (let i = 0; i < broken.length; i++) {
    if (broken[i] == "import" && broken[i + 2] == "from") {
      let contractAddress = addresses[broken[i + 1]] || defaultContractAddress;
      if (!contractAddress.startsWith('0x')) {
        contractAddress = '0x' + contractAddress;
      }
      cadence = cadence.replace(broken[i + 3], contractAddress)
    } else if (
      broken[i] == "transaction(" ||
      (broken[i] == "pub" && broken[i + 1] == "fun" && broken[i + 2] == "main") ||
      (broken[i] == "pub" && broken[i + 1] == "contract")
    ) {
      break;
    }
  }
  return cadence;
}

export function switchToToken(script: string, currency: ECurrencies) {
  if (currency === ECurrencies.USDC) {
    return (
      script
        .replaceAll('flowTokenReceiver', 'USDCVaultReceiver')
        .replaceAll('flowTokenVault', 'USDCVault')
        .replaceAll('FlowToken', 'FiatToken')
    );
  }
  return script;
}

export const executeTransaction: (
  transaction: () => Promise<string>,
  actionAfterSucceed?: (res: TransactionStatusObject) => Promise<ActionExecutionResult>
) => Promise<ActionExecutionResult> = async (transaction, actionAfterSucceed) => {
  transactionStore.initTransaction();

  try {
    // We start the transaction
    const transactionId = await transaction();
    console.log('Transaction Id', transactionId);

    // We connect our TransactionStore to the transaction to get the status
    fcl.tx(transactionId).subscribe(async (res: TransactionStatusObject) => {
      transactionStore.subscribeTransaction(res, transactionId);
    });

    // We wait for the transaction to be sealed to get the result
    const executionResult = (await fcl.tx(transactionId).onceSealed()) as TransactionStatusObject;

    // Once sealed, we check if the execution has an actionAfterSucceed, if so, we execute it
    if (actionAfterSucceed) {
      try {
        // We execute the actionAfterSucceed and return the result
        const action = await actionAfterSucceed(executionResult);

        setTimeout(() => {
          transactionStore.resetTransaction();
        }, 1000);

        return action;
      } catch (e) {
        transactionStore.resetTransaction();

        return {
          state: 'error',
          error: 'Error executing actionAfterSucceed: ' + e
        } as ActionExecutionResult;
      }
    } else {
      setTimeout(() => {
        transactionStore.resetTransaction();
      }, 1000);

      return {
        state: 'success',
        error: ''
      } as ActionExecutionResult;
    }
  } catch (e) {
    transactionStore.subscribeTransaction({
      blockId: '',
      events: [],
      status: 4,
      statusString: '',
      errorMessage: e as string,
      statusCode: 1
    }, '');

    setTimeout(() => {
      transactionStore.resetTransaction();
    }, 6000);

    console.error('Error in executeTransaction: ', e);

    return {
      state: 'error',
      error: e
    } as ActionExecutionResult;
  }
};

export const formatFix = (value) => {
  const i = Number.parseFloat(value);
  if (i % 1 == 0) {
    return i.toFixed(4);
  }
  return i.toFixed(4);
};

export const getFindProfile = async (address: string) => {
  try {
    return await fcl.query({
      cadence: `
        import FIND from 0x35717efbbce11c74
        pub fun main(address: Address): Profile? {
            if let name = FIND.reverseLookup(address) {
              let profile = FIND.lookup(name)!
              return Profile(_name: name, _address: address, _avatar: profile.getAvatar())
            }
            
            return nil
        }

        pub struct Profile {
          pub let name: String
          pub let address: Address
          pub let avatar: String

          init(_name: String, _address: Address, _avatar: String) {
            self.name = _name
            self.address = _address
            self.avatar = _avatar
          }
        }
        `,
      args: (arg, t) => [arg(address, t.Address)]
    });
  } catch (e) {
    return null;
  }
};

export const verifyAccountOwnership = async (userObject) => {
  if (!userObject.loggedIn) {
    return false;
  }
  const accountProofService = userObject.services.find(
    (services) => services.type === 'account-proof'
  );
  return await fcl.AppUtils.verifyAccountProof(dappInfo.title, accountProofService.data, {
    fclCryptoContract: null
  });
};

export const getContractNameFromContractCode = (contractCode: string) => {
  const withoutBeginning = contractCode.slice(contractCode.indexOf('pub contract ') + 13)
  const withoutEnd = withoutBeginning.substring(0, Math.min(withoutBeginning.indexOf(':'), withoutBeginning.indexOf('{')));
  return removeWhitespace(withoutEnd);
}

export const switchNetwork = async (network: 'testnet' | 'mainnet') => {
  await fcl.config().put('accessNode.api', `https://rest-${network}.onflow.org`)
}