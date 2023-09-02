import RockPaperScissors from "./contract.cdc"

pub fun main(user: Address): Bool {
    return RockPaperScissors.yourScore >= 2
}