Alice wanted to create a contract to distribute points evenly and made a prototype.

This prototype is a contract that bisects the points between Alice and Bob, but there is a hidden bug.

To complete this level, find a way to make `alicePoint` remain at 0 and `bobPoint` be greater than 0.

```cadence
pub contract FiftyFifty {
   pub var alicePoint: UFix64
   pub var bobPoint: UFix64

   pub fun share(point: UFix64) {
      self.alicePoint = point / 2.0
      self.bobPoint = point - self.alicePoint
   }

   init() {
      self.alicePoint = 0.0
      self.bobPoint = 0.0
   }
}
```
