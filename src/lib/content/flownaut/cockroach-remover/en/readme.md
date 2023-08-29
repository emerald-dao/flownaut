Your lover adores bugs but hates cockroaches.

You want to see the surprised look on your lover's face, so you decide to send them cockroaches mixed in with the bugs.
However, your lover is suspicious and is has prepared a function to remove the cockroaches from the insects.

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
