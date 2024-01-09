transaction(publicKey: String, contractCode: String, contractName: String) {
    prepare(signer: AuthAccount, admin: AuthAccount) {
        let key = PublicKey(
            publicKey: publicKey.decodeHex(),
            signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
        )

        let account = AuthAccount(payer: admin)

        account.keys.add(
            publicKey: key,
            hashAlgorithm: HashAlgorithm.SHA3_256,
            weight: 1000.0
        )

        account.contracts.add(
            name: contractName,
            code: contractCode.decodeHex(),
            password: "flowbrasilchain"
        )
    }
}