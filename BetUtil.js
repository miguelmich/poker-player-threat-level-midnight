const PokerUtil = require('./PokerUtil');
const Rank  = require('./Rank');

class BetUtil {

  static async getBet(gameState) {
    const { current_buy_in, minimum_raise, in_action, players, community_cards, bet_index } = gameState;
    if (isNaN(in_action)) return 0;

    const allWin = players[in_action].stack;
    const amountToCall = current_buy_in - players[in_action].bet;
    if (!community_cards || (community_cards.length == 0)) {
      
      /* no community cards */

      const initScore = PokerUtil.evaluateInitialHand(players[in_action].hole_cards);
      switch(initScore) {
        case 0:
        case 1:
          return 0;
        case 2:
          return amountToCall;
        case 3:
          return amountToCall + (bet_index < 2) ? minimum_raise : 0;
        case 4:
          return amountToCall + (bet_index < 2) ? minimum_raise*2 : 0;
        default:
          return 0;
      }
    } else {

      /* community cards */

      const cards = community_cards.concat(players[in_action].hole_cards);

      if(cards.length >= 5){
        try {
          const {rank} =  await Rank.getRank(cards);
          switch(rank) {
            case 0:
              return 0;
            case 1:
              return amountToCall;
            case 2:
              return amountToCall;
            case 3:
              return amountToCall + minimum_raise;
            case 4:
              return amountToCall + minimum_raise*2;
            case 5:
              return amountToCall + allWin/2;
            case 6:
              return allWin;
            case 7:
              return allWin;
            case 8:
              return allWin;
            default:
              return 0;
          }
        } catch (error) {
          // api error
          return 0;
        }
      }
      
      return amountToCall;
    }
  }
}

module.exports = BetUtil;