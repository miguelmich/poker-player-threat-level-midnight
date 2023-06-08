class PlayerAnalysisUtil {

  static playersRaising(gameStates) {
    if (gameStates.length > 0) {
      const currentGameState = gameStates[gameStates.length-1];
      const hasLastGameState = gameStates.length > 1;
      console.log(`round: ${currentGameState.round}`);
      currentGameState.players
        .filter(player => player.status == 'active')
        .forEach((player, index) => {
          console.log(` player ${player.name}(${player.id}) raised ${player.bet >  hasLastGameState ? gameStates[gameStates.length-2].players[index].bet : 0}`);
        });
    }
  }
};

module.exports = PlayerAnalysisUtil;