pub contract Random {
    // In my environment, for some reason, unsafeRandom always returns 0,
    //  so I created a simple random number generation function
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
            words.append(UInt8(Random.generateNumber() % 26) + 65)
            count = count + 1
        }
        return String.fromUTF8(words)!
    }

    init() {
        let currentBlockId: [UInt8; 32] = getCurrentBlock().id
        var seed: UInt64 = 0
        for byte in currentBlockId {
            seed = seed + UInt64(byte)
        }
        self.state = seed
    }
}