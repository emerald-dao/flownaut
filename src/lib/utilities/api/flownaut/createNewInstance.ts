import { user } from "$stores/flow/FlowStore";
import { get } from "svelte/store";
import type { TransactionStatusObject } from '@onflow/fcl';
import { createNewInstanceExecution } from "$flow/actions";
import type { ActionExecutionResult } from "$stores/custom/steps/step.interface";
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

        try {
            // get all contract codes
            const overviews = import.meta.glob('/src/lib/content/flownaut/**/**/contracts/*.cdc');
            const iterableFiles = Object.entries(overviews);

            const thisLevelNotStandardFiles = iterableFiles.filter(([path]) => {
                return path.split('/')[5] == levelId
            })

            const allContracts = await Promise.all(
                thisLevelNotStandardFiles.map(async ([path, resolver], index) => {
                    const contractName = path.split('/')[8].split('.')[0];
                    console.log(contractName)
                    const contractCode = (await import(`../../../content/flownaut/${levelId}/en/contracts/${contractName}.cdc?raw`)).default;
                    return contractCode;
                })
            );
            return await createNewInstanceExecution(levelId, allContracts, saveLevelStatus);
        } catch (e) {
            console.log(e);
            return
            // there is no contract to deploy
            const response = await fetch('/api/flownaut/new-instance', {
                method: 'POST',
                body: JSON.stringify({
                    user: get(user),
                    level_id: levelId,
                    contract_address: null
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const result = await response.json();
            return result;
        }
    } catch (e) {
        console.error(e)
        return { error: e };
    }
}