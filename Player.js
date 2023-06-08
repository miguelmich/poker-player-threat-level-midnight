const BetUtil = require('./BetUtil');
class Player {
  static get VERSION() {
    return '0.1';
  }

  static async  betRequest(gameState, bet) {
    await BetUtil.getBet(gameState).then((betResponse) => {
      bet(betResponse);
    }).catch((err) => console.error(err));
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
