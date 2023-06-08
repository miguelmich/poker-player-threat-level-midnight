class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const { current_buy_in, in_action, players, community_cards } = gameState;
    // const bigBlind = small_blind * 2;
    // const betLimit = bigBlind * 2;
    
    // if (current_buy_in <= betLimit) {

    const cards = community_cards + players[in_action].hole_cards;

    if( cards.length >= 5){
      Rank(players[in_action].hole_cards);
    }

    bet(current_buy_in);
    // }

    // bet(0);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
