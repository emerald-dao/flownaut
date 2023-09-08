You must guess the password of this resource to unlock superpowers.

```cadence
import Random from "./utility/Random.cdc"

pub contract Password {
    pub resource interface PasswordPublic {
        pub var locked: Bool
        pub fun unlock(guess: String)
    }

    pub resource MyPassword: PasswordPublic {
        pub var locked: Bool
        pub let password: String

        pub fun unlock(guess: String) {
            if guess == self.password {
                self.locked = false
            }
        }

        init(password: String) {
            self.password = password
            self.locked = true
        }
    }

    init() {
        let password = Random.generatePassword()
        let myPassword <- create MyPassword(password: password)

        self.account.save(<-myPassword, to: /storage/Password)

        self.account.link<&Password.MyPassword{Password.PasswordPublic}>(
            /public/Password,
            target: /storage/Password
        )
    }
}
```