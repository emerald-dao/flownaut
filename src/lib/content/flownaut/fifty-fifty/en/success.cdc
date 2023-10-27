import FiftyFifty from "./contracts/FiftyFifty.cdc"

pub fun main(user: Address): Bool {
    return FiftyFifty.alicePoint == 0.0 && FiftyFifty.bobPoint > 0.0
}