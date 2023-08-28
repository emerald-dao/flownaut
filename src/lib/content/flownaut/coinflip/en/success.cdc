import Coinflip from "./contract.cdc"

pub fun main(user: Address): Bool {
    return Coinflip.consecutiveWins >= 10
}