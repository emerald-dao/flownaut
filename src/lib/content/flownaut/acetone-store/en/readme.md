Reduce the `totalBalance` to zero!

```cadence
import AcetoneToken from "./AcetoneToken.cdc"
import FungibleToken from "./FungibleToken.cdc"

pub contract AcetoneStore {
   pub var totalBalance: UFix64
   pub let identityStoragePath: StoragePath
   pub let vaultStoragePath: StoragePath
   pub var balances: {Address: UFix64} // Balance per user

   pub fun deposit(address: Address, amount: UFix64) {
      if let vaultRef = self.account.borrow<&AcetoneToken.Vault>(from: AcetoneStore.vaultStoragePath) {
         vaultRef.deposit(from: <-AcetoneToken.createVault(balance: amount))
      } else {
         panic("Could not borrow reference to the vault")
      }
      self.totalBalance = self.totalBalance + amount
      if let balance = AcetoneStore.balances[address] {
         self.balances[address] = balance + amount
      } else {
         self.balances[address] = amount
      }
   }

   access(contract) fun withdrawAll(address: Address, callback: ((): Void)): @AcetoneToken.Vault {
      pre {
         self.balances[address] != nil: "Deposit first."
         self.balances[address]! > UFix64(0.0): "Insufficient balance"
      }
      if let vaultRef = self.account.borrow<&AcetoneToken.Vault>(from: self.vaultStoragePath) {
         let balance = self.balances[address]!
         AcetoneStore.totalBalance = AcetoneStore.totalBalance - balance
         let vault <- vaultRef.withdraw(amount: balance)
         callback()
         AcetoneStore.balances[address] = 0.0
         return <-vault
      } else {
         panic("Could not borrow reference to the vault")
      }
      return <-AcetoneToken.createEmptyVault()
   }

   pub resource Identity {
      pub fun withdrawAll(callback: ((): Void)): @AcetoneToken.Vault {
         return <-AcetoneStore.withdrawAll(address: self.owner!.address, callback: callback)
      }
   }

   pub fun createIdentity(): @Identity {
      return <-create Identity()
   }

   init() {
      self.totalBalance = 0.0
      self.balances = {}
      self.identityStoragePath = /storage/AcetoneStoreIdentityStorage
      self.vaultStoragePath = /storage/AcetoneStoreVaultStorage
      self.account.save(<-AcetoneToken.createEmptyVault(), to: self.vaultStoragePath)
      self.deposit(address: 0x00, amount: 2.0)
      self.deposit(address: 0x01, amount: 4.0)
      self.deposit(address: 0x02, amount: 1.0)
   }
}
```
