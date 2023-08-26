import Coinflip from "./contract.cdc"

pub fun main(): Bool {
    return Coinflip.consecutiveWins >= 10
}