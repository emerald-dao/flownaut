import FlowToken from "./utility/FlowToken.cdc"
import FungibleToken from "./utility/FungibleToken.cdc"

pub fun main(user: Address): Bool {
    let publicAccount: PublicAccount = getAccount(user)

    let vault = publicAccount.getCapability(/public/flowTokenBalance)
                    .borrow<&{FungibleToken.Balance}>()!

    assert(vault.getType() != Type<@FlowToken.Vault>(), message: "You cannot use FlowToken to pass this level.")

    return vault.balance >= 10.0
}