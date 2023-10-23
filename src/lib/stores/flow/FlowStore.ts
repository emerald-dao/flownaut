import { writable } from 'svelte/store';
import type { CurrentUserObject } from '@onflow/fcl';

export const user = writable<CurrentUserObject | { loggedIn: false; addr: null }>({
	loggedIn: false,
	addr: null
});
export const profile = writable(null);
// export const transactionStatus = writable({});
// export const transactionInProgress = writable(false);
