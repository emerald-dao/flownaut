import { logIn } from "$flow/actions";
import { user } from "$stores/flow/FlowStore";
import { get } from "svelte/store";

export async function submitLevel(levelId: string) {
    if (!get(user).loggedIn) {
        await logIn();
    }
    const response = await fetch('/api/flownaut/submit', {
        method: 'POST',
        body: JSON.stringify({
            user: get(user),
            level_id: levelId
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}