pub contract FiftyFifty {
   pub var alicePoint: UFix64
   pub var bobPoint: UFix64

   pub fun share(point : UFix64) {
      self.alicePoint = point / 2.0
      self.bobPoint = point - self.alicePoint
   }

   init() {
      self.alicePoint = 0.0
      self.bobPoint = 0.0
   }
}