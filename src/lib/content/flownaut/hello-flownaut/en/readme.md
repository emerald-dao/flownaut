Welcome to Flownaut! This level walks you through the very basics of how to play the game.

## Set up a Wallet
You will need to log in at the top right of this website in order to play the game. You can use any of the available wallets. Make sure you are on the `testnet` network.

## Open the browser's console
Open your browser's console: Right click your screen > Inspect > Console.

You should see a few messages from the game. While you are playing, you should see the following data:
1. `Player Address` - this is your wallet's address
2. `Contract Address` - the address of the contract you deploy, and are interacting with
3. `Player Balance` - the player's flow token balance

Any errors or messages from the game will also appear here.

## Get test $FLOW
To play the game, you will need test $FLOW. The easiest way to get some testnet $FLOW is via the [testnet faucet](https://testnet-faucet.onflow.org/fund-account).

## Starting a level
To start a new level, click the "Start Level" button at the bottom of the page. When you do, a new contract (the one shown at the bottom of each level) will be deployed to a random testnet account. Go do it now and come back!

You should be prompted by your wallet of choice to authorize the transaction. Note that this is deploying a new contract in the blockchain and might take a few seconds, so please be patient when starting a new level!

*You can always restart a level by clicking "Start Level" again.*

## Interact with the contract to complete the level
To complete a level, you will have to interact with your contract on testnet. You can do your own way, or use tools like [Run](https://run.ecdao.org) or [run.dnz.dev](https://run.dnz.dev/). 

When you know you have completed the level, click the "Submit" button at the bottom of the page. This uses a script to determine if you have completed it.

## Completing this level
For this level, you will be deploying a very basic contract. All you have to do is change the greeting to `You have been hacked!`.

```cadence
pub contract HelloFlownaut {
   pub var greeting: String

   pub fun changeGreeting(newGreeting: String) {
      self.greeting = newGreeting
   }

   init() {
      self.greeting = "Hello World!"
   }
}
```
