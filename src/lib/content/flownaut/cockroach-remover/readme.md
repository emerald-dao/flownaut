Your lover loves bugs but hates cockroaches.

You want to see the surprised look on your lover's face, so you decide to send him cockroaches mixed in with the bugs.
However, your lover already knows what you are thinking and is waiting for you to make a contract to remove a cockroach from the insects.

Find a way to send your lover cockroaches.
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