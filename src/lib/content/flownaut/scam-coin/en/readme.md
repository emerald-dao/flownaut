In order to be granted access to a secret webpage, you need to have a minimum of 10 $FLOW tokens in your wallet. The problem is you don't want to spend any money. 

Find a way to meet the requirement **without having to hold FlowToken.**

Here is the script that the website uses to give you access:
```cadence
import FungibleToken from "./FungibleToken.cdc"

pub fun main(user: Address): Bool {
    let publicAccount: PublicAccount = getAccount(user)

    let vault = publicAccount.getCapability(/public/flowTokenBalance)
                    .borrow<&{FungibleToken.Balance}>()!

    return vault.balance >= 10.0
}
```