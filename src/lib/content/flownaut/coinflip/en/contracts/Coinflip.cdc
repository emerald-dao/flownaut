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