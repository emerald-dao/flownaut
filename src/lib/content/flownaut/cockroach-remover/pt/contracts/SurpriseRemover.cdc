pub contract SurpriseRemover {
   pub var gifts: [String]

   pub fun removeEmptyGift(gifts: [String]) {
      pre {
         gifts.contains("presente vazio"): "Não há presente vazio para remover"
      }

      self.gifts = []
      let index = gifts.firstIndex(of: "presente vazio") ?? panic("Não há presente vazio para remover")
      for i, gift in gifts {
         if i != index {
            self.gifts.append(gift)
         }
      }
   }

   init() {
      self.gifts = []
   }
}