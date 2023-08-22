import './config';
import * as fcl from '@onflow/fcl';
import { browser } from '$app/environment';
import { user } from '$stores/flow/FlowStore';
import { executeTransaction, formatFix, replaceWithProperValues, switchToToken } from './utils';

import tipTx from './cadence/transactions/tip.cdc?raw';
import getEmeraldIDScript from './cadence/scripts/get_emerald_id.cdc?raw';
import { ECurrencies } from '$lib/types/common/enums';

if (browser) {
	// set Svelte $user store to currentUser,
	// so other components can access it
	fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();

export const getEmeraldID = async (address: string) => {
	try {
		const response = await fcl.query({
			cadence: getEmeraldIDScript,
			args: (arg, t) => [arg(address, t.Address)]
		});
		return response;
	} catch (e) {
		return null;
	}
};
