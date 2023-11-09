You must guess the password of this contract to unlock superpowers.

```cadence
pub contract Password {
    access(contract) let password: String
    pub var locked: Bool
    pub let identityStoragePath: StoragePath

   pub fun unlock(guess: String) {
      if guess == self.password {
         self.locked = false
      }
   }

   pub resource Identity {
      pub fun getPassword(): String {
         pre {
            self.owner!.address == Password.account.address: "You are not authorized to access this password."
         }
         return Password.password
      }
   }

   pub fun createIdentity(): @Identity {
      return <-create Identity()
   }

   pub fun generatePassword(): String {
      let passwordLength = 7
      var words: [UInt8] = []
      var count = 0
      while count < passwordLength {
         words.append(UInt8(unsafeRandom() % 26) + 65)
         count = count + 1
      }
      return String.fromUTF8(words)!
   }

   init() {
      self.identityStoragePath = /storage/IdentityStorage
      self.account.save(<-Password.createIdentity(), to: self.identityStoragePath)
      self.password = Password.generatePassword()
      self.locked = true
   }
}
```
