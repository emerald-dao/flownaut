import RockPaperScissors from "./contracts/RockPaperScissors.cdc"

pub fun main(user: Address): Bool {
    return RockPaperScissors.yourScore >= 2
}