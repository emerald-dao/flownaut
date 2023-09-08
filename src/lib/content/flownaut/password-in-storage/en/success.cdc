import Password from "./contract.cdc"

pub fun main(user: Address): Bool {
    let cap = Password.getPublicPasswordCap()
    let password = cap.borrow()!
    return !password.locked
}