import ExampleToken from "./contract.cdc"
import FungibleToken from "./utility/FungibleToken.cdc"

pub fun main(user: Address): Bool {
    let vault = getAccount(user).getCapability(ExampleToken.VaultPublicPath)
                    .borrow<&ExampleToken.Vault{FungibleToken.Balance}>()
                    ?? panic("The Vault does not exist in the user's storage.")

    return ExampleToken.getBalances()[user]! > vault.balance
}