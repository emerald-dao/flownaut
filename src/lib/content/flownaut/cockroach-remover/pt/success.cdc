import SurpriseRemover from "./contracts/SurpriseRemover.cdc"

pub fun main(user: Address): Bool {
    return SurpriseRemover.gifts.contains("Surpresa!")
}