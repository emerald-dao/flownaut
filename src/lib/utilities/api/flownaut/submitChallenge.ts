import { logIn } from "$flow/actions";
import { user } from "$stores/flow/FlowStore";
import { get } from "svelte/store";

export async function submitChallenge(challengeId: string) {
    if (!get(user).loggedIn) {
        await logIn();
    }
    const response = await fetch('/api/flownaut/submit', {
        method: 'POST',
        body: JSON.stringify({
            user: get(user),
            challenge_id: challengeId
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    console.log({ result });
}