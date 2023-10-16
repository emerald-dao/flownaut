Alice wanted to create a contract to distribute the tokens and made a prototype.

This prototype is a contract that bisects the points between Alice and Bob, but there is a hidden bug.

`alicePoint` should remain at 0 and `bobPoint` should be greater than 0.

```cadence
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
```
