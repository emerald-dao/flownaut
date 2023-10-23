import AcetoneStore from "./contract.cdc"

pub fun main(): Bool {
    return AcetoneStore.totalBalance == 0.0
}