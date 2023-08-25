import type { LevelState } from '$lib/types/flownaut/level-state.interface';
import { user } from '$stores/flow/FlowStore';
import { get } from 'svelte/store';

export async function getUserLevelInfo(levelId: string): Promise<{ contract_address: string, status: LevelState }> {
	if (!get(user).loggedIn) {
		return { status: 'NOT LOGGED IN', contract_address: '' };
	}
	const response = await fetch(`/api/flownaut/get-level-info/${levelId}/${get(user).addr}`);
	return (await response.json());
}
