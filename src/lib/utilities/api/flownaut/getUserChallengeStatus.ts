import { user } from "$stores/flow/FlowStore";
import { get } from "svelte/store";

export async function getUserChallengeStatus(challengeId: string): Promise<'NOT LOGGED IN' | 'COMPLETED' | 'IN PROGRESS' | 'NOT STARTED'> {
    if (!get(user).loggedIn) {
        return 'NOT LOGGED IN';
    }
    const response = await fetch(`/api/flownaut/get-status/${challengeId}/${get(user).addr}`);
    return (await response.json()).status;
}