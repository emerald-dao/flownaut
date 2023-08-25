import type { ChallengeState } from '$lib/types/flownaut/challenge-state.interface';
import { user } from '$stores/flow/FlowStore';
import { get } from 'svelte/store';

export async function getUserChallengeInfo(challengeId: string): Promise<{ contract_address: string, status: ChallengeState }> {
	if (!get(user).loggedIn) {
		return { status: 'NOT LOGGED IN', contract_address: '' };
	}
	const response = await fetch(`/api/flownaut/get-challenge-info/${challengeId}/${get(user).addr}`);
	return (await response.json());
}
