class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const { current_buy_in, small_blind } = gameState;
    const bigBlind = small_blind * 2;
    const betLimit = bigBlind * 2;
    
    if (current_buy_in <= betLimit) {
      bet(current_buy_in);
    }
    
    bet(0);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
