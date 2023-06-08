const BetUtil = require('./BetUtil');
const PlayerAnalysisUtil = require('./PlayerAnalysisUtil');
class Player {
  static get VERSION() {
    return '0.1';
  }

  static gameStates = [];

  static betRequest(gameState, bet) {
    if (gameState.round == 0) this.gameStates = [];
    this.gameStates.push(gameState);
    PlayerAnalysisUtil.playersRaising(this.gameStates);
    BetUtil.getBet(gameState).then((betResponse) => {
      bet(betResponse);
    }).catch((err) => console.error(err));
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
