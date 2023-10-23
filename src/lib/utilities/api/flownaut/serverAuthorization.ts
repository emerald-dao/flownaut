import { sansPrefix, withPrefix } from "@onflow/fcl";

const getSignature = async (signable) => {
  const response = await fetch('/api/flownaut/deploy-contract', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signable })
  });

  const signed = await response.json();
  return signed.signature;
}

export const serverAuthorization = (accountAddress: string) => async (account) => {

  const addr = accountAddress;
  const keyId = 0;

  return {
    ...account,
    tempId: `${addr}-${keyId}`,
    addr: sansPrefix(addr),
    keyId: Number(keyId),
    signingFunction: async (signable) => {

      const signature = await getSignature(signable);

      return {
        addr: withPrefix(addr),
        keyId: Number(keyId),
        signature
      }
    }
  }
}