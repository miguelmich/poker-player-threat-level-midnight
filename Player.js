const BetUtil = require('./BetUtil');
class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    bet(BetUtil.getBet(gameState));
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
