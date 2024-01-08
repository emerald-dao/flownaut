<script>
    import Notice from "$lib/components/atoms/Notice.svelte"
</script>

This is a coin flipping game where you need to build up your winning streak by guessing the outcome of a coin flip. To complete this level you'll need to use your psychic abilities to guess the correct outcome 10 times in a row.

<Notice type="tip">
You can use post conditions to abort transactions after they have completed execution.
</Notice>

```cadence
pub contract Coinflip {

    pub var consecutiveWins: UInt64

    pub fun flip(guess: Bool) {
        let randomNum: UInt64 = revertibleRandom()
        let flip: UInt64 = randomNum % 2
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