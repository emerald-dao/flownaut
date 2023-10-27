import AcetoneStore from "./contracts/AcetoneStore.cdc"

pub fun main(user: Address): Bool {
    return AcetoneStore.totalBalance == 0.0
}