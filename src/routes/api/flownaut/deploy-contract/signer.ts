// signer.js file
import { SHA3 } from "sha3";
import elliptic from "elliptic";
import { env as PrivateEnv } from '$env/dynamic/private';
const ec = new elliptic.ec("p256");

const PRIVATE_KEY = PrivateEnv.TESTNET_ACCOUNT_PRIVATE_KEY;

export const sign = (message) => {
    const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"));
    const sig = key.sign(hash(message)); // hashMsgHex -> hash
    const n = 32;
    const r = sig.r.toArrayLike(Buffer, "be", n);
    const s = sig.s.toArrayLike(Buffer, "be", n);
    return Buffer.concat([r, s]).toString("hex");
}

const hash = (message) => {
    const sha = new SHA3(256);
    sha.update(Buffer.from(message, "hex"));
    return sha.digest();
}