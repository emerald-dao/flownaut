Your friend adores bugs but hates cockroaches. You decide to send your friend bugs but want to surprise them with a few cockroaches in the mix.

However, they are suspicious of you and have prepared a function to remove the cockroaches from the insects.

Find a way to get a cockroach into the `insects` array.

```cadence
pub contract CockroachRemover {
   pub var insects: [String]

   pub fun removeCockroach(insects: [String]) {
      pre {
         insects.contains("cockroach"): "No cockroach to remove"
      }

      self.insects = []
      let index = insects.firstIndex(of: "cockroach") ?? panic("No cockroach to remove")
      for i, insect in insects {
         if i != index {
            self.insects.append(insect)
         }
      }
   }

   init() {
      self.insects = []
   }
}
```
