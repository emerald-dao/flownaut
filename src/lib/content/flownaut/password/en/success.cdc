import Password from "./contracts/Password.cdc"

pub fun main(user: Address): Bool {
    return !Password.locked
}