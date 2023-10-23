import { user } from "$stores/flow/FlowStore";
import { get } from "svelte/store";
import type { TransactionStatusObject } from '@onflow/fcl';
import { createNewInstanceExecution } from "$flow/actions";
import type { ActionExecutionResult } from "$stores/custom/steps/step.interface";
import { fetchLevelContracts } from "./fetchLevelContracts";
// import flowJSON from '../../../../../flow.json';

export async function createNewInstance(levelId: string) {
    try {
        const saveLevelStatus: (
            res: TransactionStatusObject
        ) => Promise<ActionExecutionResult> = async (executionResult: TransactionStatusObject) => {
            const [accountCreatedEvent] = executionResult.events.filter((event) =>
                event.type === 'flow.AccountCreated'
            );
            const contract_address = accountCreatedEvent.data.address;

            const response = await fetch('/api/flownaut/new-instance', {
                method: 'POST',
                body: JSON.stringify({
                    user: get(user),
                    level_id: levelId,
                    contract_address
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const result = await response.json();
            return result;
        }

        const levelContracts = await fetchLevelContracts(levelId);
        return await createNewInstanceExecution(levelId, levelContracts, saveLevelStatus);
    } catch (e) {
        console.error(e)
        return { error: e };
    }
}