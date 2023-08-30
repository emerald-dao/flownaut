In order to be granted access to a secret webpage, you need to have a minimum of 10 $EXAMPLE tokens in your wallet. The $EXAMPLE token is a custom token created by the webpage, and deployed when you start this level.

The problem is you don't want to spend any money to buy $EXAMPLE tokens. Rumors are they cost a million each!

Find a way to meet the requirement **without having to hold $EXAMPLE.**

Here is the script that the website uses to give you access:
```cadence
import ExampleToken from "./ExampleToken.cdc"
import FungibleToken from "./FungibleToken.cdc"

pub fun main(user: Address): Bool {
    let publicAccount: PublicAccount = getAccount(user)

    let vault = publicAccount.getCapability(ExampleToken.VaultPublicPath)
                    .borrow<&{FungibleToken.Balance}>()!

    return vault.balance >= 10.0
}
```