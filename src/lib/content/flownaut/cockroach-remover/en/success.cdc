import CockroachRemover from "./contract.cdc"

pub fun main(user: Address): Bool {
    return CockroachRemover.insects.contains("cockroach")
}