import { getContractNameFromContractCode, verifyAccountOwnership } from "$flow/utils";
import { user } from "$stores/flow/FlowStore";
import { authz, mutate, tx } from "@onflow/fcl";
import { json } from "@sveltejs/kit";
import { get } from "svelte/store";
import { env as PublicEnv } from '$env/dynamic/public';
import type { TransactionStatusObject } from '@onflow/fcl';
import { Buffer } from 'buffer';

export async function createNewInstance(challengeId: string) {
    try {
        console.log(`Deploying new ${challengeId} contract for ${get(user).addr}...`)
        const contractCode = (await import(`../../../content/flownaut/${challengeId}/en/contract.cdc?raw`)).default;
        const hexCode = Buffer.from(contractCode).toString('hex');
        const contractName = getContractNameFromContractCode(contractCode);

        const txId = await mutate({
            cadence: `
            transaction(publicKey: String, contractCode: String, contractName: String) {
                prepare(signer: AuthAccount) {
                    let key = PublicKey(
                        publicKey: publicKey.decodeHex(),
                        signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
                    )
    
                    let account = AuthAccount(payer: signer)
    
                    account.keys.add(
                        publicKey: key,
                        hashAlgorithm: HashAlgorithm.SHA3_256,
                        weight: 1000.0
                    )

                    account.contracts.add(
                        name: contractName,
                        code: contractCode.decodeHex()
                    )
                }
            }
            `,
            args: (arg, t) => [
                arg(PublicEnv.PUBLIC_TESTNET_ACCOUNT_PUBLIC_KEY, t.String),
                arg(hexCode, t.String),
                arg(contractName, t.String)
            ],
            // the person paying for the tx
            payer: authz,
            // the person proposing the tx (uses their public key to send the tx)
            proposer: authz,
            // the person authorizing the tx (gets put as an `AuthAccount` in prepare phase)
            authorizations: [authz],
            limit: 999
        });

        const executionResult = (await tx(txId).onceSealed()) as TransactionStatusObject;
        const [accountCreatedEvent] = executionResult.events.filter((event) =>
            event.type === 'flow.AccountCreated'
        );
        const contract_address = accountCreatedEvent.data.address;

        const response = await fetch('/api/flownaut/new-instance', {
            method: 'POST',
            body: JSON.stringify({
                user: get(user),
                challenge_id: challengeId,
                contract_address
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        const result = await response.json();
        return json({ result })
    } catch (e) {
        console.log(e)
        return json({ error: e });
    }
}