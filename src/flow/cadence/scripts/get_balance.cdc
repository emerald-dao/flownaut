import FungibleToken from "../utility/FungibleToken.cdc"

pub fun main(account: Address): UFix64 {
  return getAccount(account).getCapability(/public/flowTokenBalance).borrow<&{FungibleToken.Balance}>()!.balance
}