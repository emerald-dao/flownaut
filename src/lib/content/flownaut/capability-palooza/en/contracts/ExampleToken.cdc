import FungibleToken from "./FungibleToken.cdc"

pub contract ExampleToken: FungibleToken {

    pub var totalSupply: UFix64

    pub let VaultStoragePath: StoragePath
    pub let VaultPublicPath: PublicPath
    pub let ReceiverPublicPath: PublicPath

    pub event TokensInitialized(initialSupply: UFix64)
    pub event TokensWithdrawn(amount: UFix64, from: Address?)
    pub event TokensDeposited(amount: UFix64, to: Address?)
    pub event TokensMinted(amount: UFix64)
    pub event TokensBurned(amount: UFix64)

    pub resource Vault: FungibleToken.Provider, FungibleToken.Receiver, FungibleToken.Balance {

        pub var balance: UFix64

        pub fun withdraw(amount: UFix64): @FungibleToken.Vault {
            self.balance = self.balance - amount
            emit TokensWithdrawn(amount: amount, from: self.owner?.address)
            return <- create Vault(balance: amount)
        }

        pub fun deposit(from: @FungibleToken.Vault) {
            let vault <- from as! @Vault
            self.balance = self.balance + vault.balance
            emit TokensDeposited(amount: vault.balance, to: self.owner?.address)
            vault.balance = 0.0
            destroy vault
        }

        init(balance: UFix64) {
            self.balance = balance
        }

        destroy() {
            emit TokensBurned(amount: self.balance)
        }
    }

    pub fun createEmptyVault(): @Vault {
        return <- create Vault(balance: 0.0)
    }

    pub fun mintTokens(amount: UFix64): @Vault {
        ExampleToken.totalSupply = ExampleToken.totalSupply + amount
        emit TokensMinted(amount: amount)
        return <- create Vault(balance: amount)
    }

    init() {
        self.totalSupply = 0.0

        self.VaultStoragePath = /storage/FlownautCapabilityPaloozaExampleTokenVault
        self.VaultPublicPath = /public/FlownautCapabilityPaloozaExampleTokenMetadata
        self.ReceiverPublicPath = /public/FlownautCapabilityPaloozaExampleTokenReceiver

        emit TokensInitialized(initialSupply: self.totalSupply)
    }
}