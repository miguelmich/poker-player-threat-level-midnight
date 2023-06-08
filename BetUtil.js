const PokerUtil = require('./PokerUtil');

class BetUtil {

  static getBet(gameState) {
    const { current_buy_in, in_action, players, community_cards } = gameState;
    const score = PokerUtil.evaluateInitialHand(players[in_action].hole_cards);
    if (!community_cards || (community_cards.length == 0)) {
      /* no community cards */
      if (score == 1 || score == 0) {
        return 0;
      } else {
        if (score == 2) {
          return 0;
        } else {
          return current_buy_in;
        }
      }
    } else {
      return current_buy_in; // need more work
    }
  }
}

module.exports = BetUtil;