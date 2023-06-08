const BetUtil = require('./BetUtil');

class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    // const { current_buy_in } = gameState;
    // const bigBlind = small_blind * 2;
    // const betLimit = bigBlind * 2;
    
    // if (current_buy_in <= betLimit) {
    bet(BetUtil.getBet(gameState));
    // }

    // bet(0);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
