This is a coin flipping game where you need to build up your winning streak by guessing the outcome of a coin flip. To complete this level you'll need to use your psychic abilities to guess the correct outcome 10 times in a row.

Things that may help:
- Post conditions

```cadence
pub contract Coinflip {

    pub var consecutiveWins: UInt64

    pub fun flip(guess: Bool) {
        let currentBlockId: [UInt8; 32] = getCurrentBlock().id
        var seed: UInt256 = 0
        for byte in currentBlockId {
            seed = seed + UInt256(byte)
        }
        let flip: UInt256 = seed % 2
        let side: Bool = flip == 1 ? true : false
        
        if side == guess {
            self.consecutiveWins = self.consecutiveWins + 1
        } else {
            self.consecutiveWins = 0
        }
    }

    init() {
        self.consecutiveWins = 0
    }
}
```