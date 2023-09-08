You must guess the password of this resource to unlock superpowers.

```cadence
pub contract Password {
    
    pub var state: UInt64

    pub fun generateNumber(): UInt64 {
        self.state = (self.state * 1664525 + 1013904223) % 2147483648
        return self.state
    }

    pub fun generatePassword(): String {
        let passwordLength = 7
        var words: [UInt8] = []
        var count = 0
        while count < passwordLength {
            words.append(UInt8(self.generateNumber() % 26) + 65)
            count = count + 1
        }
        return String.fromUTF8(words)!
    }

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

    pub fun getPublicPasswordCap(): Capability<&MyPassword{PasswordPublic}> {
        return self.account.getCapability<&MyPassword{PasswordPublic}>(/public/Password)
    }

    init() {
        let currentBlockId: [UInt8; 32] = getCurrentBlock().id
        var seed: UInt64 = 0
        for byte in currentBlockId {
            seed = seed + UInt64(byte)
        }
        self.state = seed

        let password = self.generatePassword()
        let myPassword <- create MyPassword(password: password)

        self.account.save(<-myPassword, to: /storage/Password)

        self.account.link<&Password.MyPassword{Password.PasswordPublic}>(
            /public/Password,
            target: /storage/Password
        )
    }
}
```