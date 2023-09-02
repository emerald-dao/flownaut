Seu amor adora surpresas, mas fica chateada quando não recebe presentes. Você decide surpreendê-la, mas deseja começar com uma presente vazio como uma brincadeira antes de dar o verdadeiro presente.

No entanto, ela já desconfia de você e preparou uma maneira de remover o presente vazio e arruinar com a sua brincadeira.

Descubra uma maneira de adicionar o `presente vazio` antes de revelar o verdadeiro presente.

```cadence 
pub contract SurpriseRemover {
   pub var gifts: [String]

   pub fun removeEmptyGift(gifts: [String]) {
      pre {
         gifts.contains("presente vazio"): "Nao ha presente vazio para remover"
      }

      self.gifts = []
      let index = gifts.firstIndex(of: "presente vazio") ?? panic("Nao ha presente vazio para remover")
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
```
