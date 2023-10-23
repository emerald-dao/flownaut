import CockroachRemover from "./contracts/CockroachRemover.cdc"

pub fun main(user: Address): Bool {
    return CockroachRemover.insects.contains("cockroach")
}