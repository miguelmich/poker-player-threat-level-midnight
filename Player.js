const BetUtil = require('./BetUtil');
const Rank  = require('./Rank');
class Player {
  static get VERSION() {
    return '0.1';
  }

  static async betRequest(gameState, bet) {
    const { current_buy_in, in_action, players, community_cards } = gameState;
    // const bigBlind = small_blind * 2;
    // const betLimit = bigBlind * 2;
    
    // if (current_buy_in <= betLimit) {

    if(community_cards && in_action){
      const cards = community_cards.concat(players[in_action].hole_cards);

      if(cards.length >= 5){
        const b =  await Rank.getRank(cards);
      }
    }


    bet(BetUtil.getBet(gameState));
    // }

    // bet(0);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
