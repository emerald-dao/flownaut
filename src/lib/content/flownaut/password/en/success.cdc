import Password from "./contract.cdc"

pub fun main(): Bool {
    return !Password.locked
}