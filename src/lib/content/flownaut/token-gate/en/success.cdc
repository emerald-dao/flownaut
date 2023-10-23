import ExampleToken from "./contracts/ExampleToken.cdc"
import FungibleToken from "./contracts/FungibleToken.cdc"

pub fun main(user: Address): Bool {
    let publicAccount: PublicAccount = getAccount(user)

    let vault = publicAccount.getCapability(ExampleToken.VaultPublicPath)
                    .borrow<&{FungibleToken.Balance}>()!

    assert(vault.getType() != Type<@ExampleToken.Vault>(), message: "You cannot use the expected secret webpage's token to pass this level.")

    return vault.balance >= 10.0
}