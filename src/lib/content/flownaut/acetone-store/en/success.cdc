import AcetoneStore from "./contracts/AcetoneStore.cdc"

pub fun main(): Bool {
    return AcetoneStore.totalBalance == 0.0
}