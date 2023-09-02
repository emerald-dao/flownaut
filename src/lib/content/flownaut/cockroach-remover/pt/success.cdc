import SurpriseRemover from "./contract.cdc"

pub fun main(user: Address): Bool {
    return SurpriseRemover.gifts.contains("Surpresa!")
}