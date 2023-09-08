import Password from "./contract.cdc"

pub fun main(user: Address): Bool {
    let account = getAccount(user)
    let cap = account.getCapability<&Password.MyPassword{Password.PasswordPublic}>(/public/Password)
    let password = cap.borrow()!
    return !password.locked
}