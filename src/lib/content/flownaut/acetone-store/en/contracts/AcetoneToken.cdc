import FungibleToken from "./FungibleToken.cdc"

pub contract AcetoneToken: FungibleToken {
   pub var totalSupply: UFix64
   pub event TokensInitialized(initialSupply: UFix64)
   pub event TokensWithdrawn(amount: UFix64, from: Address?)
   pub event TokensDeposited(amount: UFix64, to: Address?)
   pub event TokensMinted(amount: UFix64)
   pub event TokensBurned(amount: UFix64)
   pub event MinterCreated(allowedAmount: UFix64)
   pub event BurnerCreated()

   pub resource Vault: FungibleToken.Provider, FungibleToken.Receiver, FungibleToken.Balance {
      pub var balance: UFix64
      pub fun withdraw(amount: UFix64): @Vault {
         self.balance = self.balance - amount
         emit TokensWithdrawn(amount: amount, from: self.owner?.address)
         return <-create Vault(balance: amount)
      }

      pub fun deposit(from: @FungibleToken.Vault) {
            let vault <- from as! @AcetoneToken.Vault
            self.balance = self.balance + vault.balance
            emit TokensDeposited(amount: vault.balance, to: self.owner?.address)
            vault.balance = 0.0
            destroy vault
      }

      destroy() {
         if self.balance > 0.0 {
            AcetoneToken.totalSupply = AcetoneToken.totalSupply - self.balance
         }
      }

      init(balance: UFix64) {
         self.balance = balance
      }
   }

   pub fun createEmptyVault(): @Vault {
      return <-create Vault(balance: 0.0)
   }

   pub fun createVault(balance: UFix64): @Vault {
      self.totalSupply = self.totalSupply + balance
      return <-create Vault(balance: balance)
   }

   init() {
      self.totalSupply = 0.0
   }
}