Bem-vindo ao Flownaut! Este nível irá guiá-lo pelos conceitos básicos de como jogar o jogo.

## **Configurar uma Carteira**

Você precisará fazer login no canto superior direito deste site para jogar o jogo. Você pode usar qualquer uma das carteiras disponíveis. Certifique-se de estar na rede **`testnet`**.

## **Abrir o console do navegador**

Abra o console do seu navegador: clique com o botão direito na tela > Inspecionar > Console.

Você deverá ver algumas mensagens do jogo. Enquanto estiver jogando, você verá os seguintes dados:

1. **`Endereço do Jogador`** - este é o endereço da sua carteira
2. **`Endereço do Contrato`** - o endereço do contrato que você implantou e com o qual está interagindo
3. **`Saldo do Jogador`** - o saldo de fichas Flow do jogador

Quaisquer erros ou mensagens do jogo também aparecerão aqui.

## **Obter $FLOW de teste**

Para jogar o jogo, você precisará de $FLOW de teste. A maneira mais fácil de obter alguns $FLOW de teste é através do **[faucet de testnet](https://testnet-faucet.onflow.org/fund-account)**.

## **Iniciar um nível**

Para iniciar um novo nível, clique no botão "Iniciar Nível" na parte inferior da página. Quando fizer isso, um novo contrato (aquele mostrado na parte inferior de cada nível) será implantado em uma conta de testnet aleatória. Faça isso agora e volte!

Seu aplicativo de carteira escolhido deve solicitar autorização para a transação. Note que isso implica implantar um novo contrato na blockchain e pode levar alguns segundos, então tenha paciência ao iniciar um novo nível!

*Você sempre pode reiniciar um nível clicando em "Iniciar Nível" novamente.*

## **Interagir com o contrato para concluir o nível**

Para concluir um nível, você terá que interagir com o seu contrato na testnet. Você pode fazer isso da maneira que preferir ou usar ferramentas como **[Run](https://run.ecdao.org/)** ou **[run.dnz.dev](https://run.dnz.dev/)**.

Quando souber que concluiu o nível, clique no botão "Enviar" na parte inferior da página. Isso usará um script para determinar se você o completou.

## **Conclusão deste nível**

Para este nível, você implantará um contrato muito básico. Tudo o que você precisa fazer é alterar a saudação para **`Você foi hackeado!`**.

```cadence
pub contract HelloFlownaut {
   pub var greeting: String

   pub fun changeGreeting(newGreeting: String) {
      self.greeting = newGreeting
   }

   init() {
      self.greeting = "Ola, Brasil!"
   }
}
```
