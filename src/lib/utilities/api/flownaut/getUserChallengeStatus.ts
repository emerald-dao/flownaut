import type { ChallengeState } from '$lib/types/flownaut/challenge-state.interface';
import { user } from '$stores/flow/FlowStore';
import { get } from 'svelte/store';

export async function getUserChallengeStatus(challengeId: string): Promise<ChallengeState> {
	if (!get(user).loggedIn) {
		return 'NOT LOGGED IN';
	}
	const response = await fetch(`/api/flownaut/get-status/${challengeId}/${get(user).addr}`);
	return (await response.json()).status;
}
