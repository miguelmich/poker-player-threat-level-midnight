class PokerUtils {

  static _getRankOrder(rank) {
    const rankOrder = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    return rankOrder.indexOf(rank);
  }

  static _getSuitOrder(suit) {
    const suitOrder = ['spades', 'hearts', 'clubs', 'diamonds'];
    return suitOrder.indexOf(suit);
  }

  static _sortHand(hand) {
    return hand.slice().sort((card1, card2) => {
      const rankOrder = this._getRankOrder(card1.rank) - this._getRankOrder(card2.rank);
      if (rankOrder !== 0) {
        return rankOrder;
      }
  
      const suitOrder = this._getSuitOrder(card1.suit) - this._getSuitOrder(card2.suit);
      return suitOrder;
    });
  }

  static _rankGreaterThan(rank, target) {
    return this._getRankOrder(rank) > this._getRankOrder(target);
  }

  static _suitGreaterThan(suit, target) {
    return this._getSuitOrder(suit) > this._getSuitOrder(target);
  }

  static _isPair(card1, card2) {
    return card1.rank === card2.rank;
  }

  static _isSameSuit(card1, card2) {
    return card1.suit === card2.suit;
  }

  static _mapInitialHandsToScore(hand) {
    const sortedHand = this._sortHand(hand);
    const card1 = sortedHand[0];
    const card2 = sortedHand[1];
    const isSameSuit = this._isSameSuit(card1, card2);

    if (this._isPair(card1, card2)) {
      if (this._rankGreaterThan(card1.rank, '8')) {
        return 4
      } else if (this._rankGreaterThan(card1.rank, '4')) {
        return 3;
      } else {
        return 2;
      }
    } else if (isSameSuit) {
      if ((card1.rank === 'A' && this._rankGreaterThan(card2.rank, 2))
        || (card1.rank === 'K' && this._rankGreaterThan(card2.rank, 7))
        || (card1.rank === 'Q' && this._rankGreaterThan(card2.rank, 9))) {
        return 3;
      } else if ((card1.rank === 'A' && card2.rank === '2')
      || (card1.rank === 'K' || card1.rank ==='Q' || card1.rank ==='J')
      || (card1.rank === '10' && this._rankGreaterThan(card2.rank, 5))
      || (card1.rank === '9' && this._rankGreaterThan(card2.rank, 5))
      || (card1.rank === '8' && card2.rank === '7')) {
        return 2;
      } else if (card1.rank === '3' && card2.rank === '2') {
        return 0;
      } else {
        return 1;
      }
    } else /* off suit */ {
      if ((card1.rank === 'A' && (this._rankGreaterThan(card2.rank, 6) || card2.rank === '5'))
      || (card1.rank === 'K' && this._rankGreaterThan(card2.rank, 9))) {
        return 3;
      } else if (card1.rank === 'A' && this._rankGreaterThan(7, card2.rank)
      || (card1.rank === 'K')
      || (card1.rank === 'Q' && this._rankGreaterThan(card2.rank, 2))
      || (card1.rank === 'J' && this._rankGreaterThan(card2.rank, 5))
      || (card1.rank === '10' && this._rankGreaterThan(card2.rank, 6))
      || (card1.rank === '9' && card2.rank === '8')) {
        return 2;
      } else if (this._rankGreaterThan(card1.rank, 7) || this._rankGreaterThan(card2.rank, 3)) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  static evaluateInitialHand(hand) {
    return this._mapInitialHandsToScore(hand);
  }
}

module.exports = PokerUtils;
