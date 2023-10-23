import HelloFlownaut from "./contracts/HelloFlownaut.cdc"

pub fun main(user: Address): Bool {
    return HelloFlownaut.greeting == "Você foi hackeado!"
}