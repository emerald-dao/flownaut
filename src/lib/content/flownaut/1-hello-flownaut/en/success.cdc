import HelloFlownaut from "./contract.cdc"

pub fun main(): Bool {
    return HelloFlownaut.greeting == "You have been hacked."
}