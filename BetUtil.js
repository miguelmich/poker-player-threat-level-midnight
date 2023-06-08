const PokerUtil = require('./PokerUtil');
const Rank  = require('./Rank');

class BetUtil {

  static getBet(gameState) {
    const { current_buy_in, minimum_raise, in_action, players, community_cards } = gameState;
    if (isNaN(in_action)) return 0;
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
          return amountToCall + minimum_raise;
        case 4:
          return amountToCall + minimum_raise*2;
        default:
          return 0;
      }
    } else {
      const cards = community_cards.concat(players[in_action].hole_cards);
      if(cards.length >= 5){
         Rank.getRank(cards);
      }

      return amountToCall;
    }
  }
}

module.exports = BetUtil;