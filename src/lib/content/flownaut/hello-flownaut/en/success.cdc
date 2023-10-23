import HelloFlownaut from "./contracts/HelloFlownaut.cdc"

pub fun main(user: Address): Bool {
    return HelloFlownaut.greeting == "You have been hacked!"
}