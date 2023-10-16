import FiftyFifty from "./contract.cdc"

pub fun main(user: Address): Bool {
    return FiftyFifty.alicePoint == 0.0 && FiftyFifty.bobPoint > 0.0
}