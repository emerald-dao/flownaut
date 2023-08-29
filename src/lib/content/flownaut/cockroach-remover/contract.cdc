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