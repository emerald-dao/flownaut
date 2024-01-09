import './config';
import * as fcl from '@blocto/fcl';
import { browser } from '$app/environment';
import { user } from '$stores/flow/FlowStore';
import { executeTransaction, replaceWithProperValues } from './utils';
import { env as PublicEnv } from '$env/dynamic/public';
import type { TransactionStatusObject } from '@blocto/fcl';
import type { ActionExecutionResult } from '$lib/stores/custom/steps/step.interface';
import { Buffer } from 'buffer';
import { serverAuthorization } from '$lib/utilities/api/flownaut/serverAuthorization';

import getBalanceScript from './cadence/scripts/get_balance.cdc?raw';

if (browser) {
	// set Svelte $user store to currentUser,
	// so other components can access it
	fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();

async function createNewInstance(levelId: string, levelContracts) {
	const { allContracts, deployOrder } = levelContracts;
	let contractName = deployOrder[0];
	const replaceImports = replaceWithProperValues(allContracts[contractName], undefined);
	let hexCode = Buffer.from(replaceImports).toString('hex');

	let deployCode;
	try {
		deployCode = (await import(`../lib/content/flownaut/${levelId}/en/deploy.cdc?raw`)).default;
	} catch (e) {
		deployCode = `
		transaction(publicKey: String, contractCode: String, contractName: String) {
			prepare(admin: AuthAccount) {
				let key = PublicKey(
					publicKey: publicKey.decodeHex(),
					signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
				)

				let account = AuthAccount(payer: admin)

				account.keys.add(
					publicKey: key,
					hashAlgorithm: HashAlgorithm.SHA3_256,
					weight: 1000.0
				)

				account.contracts.add(
					name: contractName,
					code: contractCode.decodeHex()
				)
			}
		}
		`
	}

	const transactionId = await fcl.mutate({
		cadence: deployCode,
		args: (arg, t) => [
			arg(PublicEnv.PUBLIC_TESTNET_ACCOUNT_PUBLIC_KEY, t.String),
			arg(hexCode, t.String),
			arg(contractName, t.String)
		],
		// the person paying for the tx
		payer: fcl.authz,
		// the person proposing the tx (uses their public key to send the tx)
		proposer: fcl.authz,
		// the person authorizing the tx (gets put as an `AuthAccount` in prepare phase)
		authorizations: [serverAuthorization(PublicEnv.PUBLIC_TESTNET_ACCOUNT_ADDRESS)],
		limit: 999
	});

	if (deployOrder.length === 1) {
		return transactionId;
	}

	const executionResult = (await fcl.tx(transactionId).onceSealed()) as TransactionStatusObject;
	const newAccountAddress = executionResult.events.filter(event => event.type === 'flow.AccountCreated')[0].data.address;
	for (var i = 1; i < deployOrder.length; i++) {
		contractName = deployOrder[i];
		hexCode = (Buffer.from(replaceWithProperValues(allContracts[contractName], newAccountAddress)).toString('hex'));
		await fcl.mutate({
			cadence: `
			transaction(contractCode: String, contractName: String) {
				prepare(signer: AuthAccount) {
					signer.contracts.add(
						name: contractName,
						code: contractCode.decodeHex()
					)	
				}
			}
			`,
			args: (arg, t) => [
				arg(hexCode, t.String),
				arg(contractName, t.String)
			],
			// the person paying for the tx
			payer: fcl.authz,
			// the person proposing the tx (uses their public key to send the tx)
			proposer: fcl.authz,
			// the person authorizing the tx (gets put as an `AuthAccount` in prepare phase)
			authorizations: [serverAuthorization(newAccountAddress)],
			limit: 999
		});
	}
	return transactionId;
}

export const createNewInstanceExecution = (levelId: string, levelContracts, actionAfterSucceed: (res: TransactionStatusObject) => Promise<ActionExecutionResult>) =>
	executeTransaction(() => createNewInstance(levelId, levelContracts), actionAfterSucceed);

export const getBalance = async (address: string) => {
	try {
		return await fcl.query({
			cadence: replaceWithProperValues(getBalanceScript, undefined),
			args: (arg, t) => [arg(address, t.Address)]
		});
	} catch (e) {
		console.error(e)
		return null;
	}
};
