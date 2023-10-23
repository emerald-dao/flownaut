import FungibleToken from "./FungibleToken.cdc"

pub contract ExampleToken: FungibleToken {

    pub var totalSupply: UFix64
    access(self) let balances: {Address: UFix64}

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
            if let owner: Address = self.owner?.address {
                emit TokensWithdrawn(amount: amount, from: owner)
                ExampleToken.balances[owner] = self.balance
            }
            return <- create Vault(balance: amount)
        }

        pub fun deposit(from: @FungibleToken.Vault) {
            let vault <- from as! @Vault
            self.balance = self.balance + vault.balance
            if let owner: Address = self.owner?.address {
                emit TokensDeposited(amount: vault.balance, to: owner)
                ExampleToken.balances[owner] = self.balance
            }
            vault.balance = 0.0
            destroy vault
        }

        init(balance: UFix64) {
            self.balance = balance
        }

        destroy() {
            pre {
                self.balance == 0.0: "Cannot destroy a Vault unless balance is 0."
            }
        }
    }

    pub fun createEmptyVault(): @Vault {
        return <- create Vault(balance: 0.0)
    }

    pub fun mintTokens(amount: UFix64): @Vault {
        pre {
            amount > 0.0: "Amount minted must be greater than zero"
        }
        ExampleToken.totalSupply = ExampleToken.totalSupply + amount
        emit TokensMinted(amount: amount)
        return <- create Vault(balance: amount)
    }

    pub fun getBalances(): {Address: UFix64} {
        return self.balances
    }

    init() {
        self.totalSupply = 0.0
        self.balances = {}

        self.VaultStoragePath = /storage/FlownautTokenBalanceExampleTokenVault
        self.VaultPublicPath = /public/FlownautTokenBalanceExampleTokenMetadata
        self.ReceiverPublicPath = /public/FlownautTokenBalanceExampleTokenReceiver

        emit TokensInitialized(initialSupply: self.totalSupply)
    }
}