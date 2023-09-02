pub contract RockPaperScissors {
   pub var yourScore: Int
   pub enum Action: UInt8 {
      pub case rock
      pub case paper
      pub case scissors
   }

   pub fun rockPaperScissors(actions: [String]) {
      pre {
         actions.length == 3: "You must play exactly 3 actions"
      }

      var myActions: [Action] = []
      var yourActions: [Action] = []
      var myAction = Action.rock
      var yourAction = Action.rock
      for action in actions {
         myAction = Action.rock
         switch action {
            case "rock":
               myAction = Action.paper
               yourAction = Action.rock
            case "paper":
               myAction = Action.scissors
               yourAction = Action.paper
            case "scissors":
               myAction = Action.rock
               yourAction = Action.scissors
         }
         myActions.append(myAction)
         yourActions.append(yourAction)
      }
      self.yourScore = self.judge(myActions: myActions, yourActions: yourActions)
   }

   pub fun judge(myActions: [Action], yourActions: [Action]): Int {
      var yourScore = 0
      for i, myAction in myActions {
         if myAction == Action.rock && yourActions[i] == Action.paper {
            yourScore = yourScore + 1
         } else if myAction == Action.paper && yourActions[i] == Action.scissors {
            yourScore = yourScore + 1
         } else if myAction == Action.scissors && yourActions[i] == Action.rock {
            yourScore = yourScore + 1
         }
      }
      return yourScore
   }

   init() {
      self.yourScore = 0
   }
}