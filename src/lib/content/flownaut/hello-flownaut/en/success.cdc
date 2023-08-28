import HelloFlownaut from "./contract.cdc"

pub fun main(user: Address): Bool {
    return HelloFlownaut.greeting == "You have been hacked!"
}