import Password from "./contract.cdc"

pub fun main(user: Address): Bool {
    return !Password.locked
}