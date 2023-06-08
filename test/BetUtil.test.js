const BetUtil = require('../BetUtil');
const Rank = require('../Rank');

describe('BetUtil', () => {
  describe('getBet', () => {
    it('should return 0 if in_action is not a number', async () => {
      const gameState = {
        current_buy_in: 100,
        minimum_raise: 10,
        in_action: 'invalid',
        players: [{ stack: 100, bet: 50 }],
        community_cards: []
      };

      const result = await BetUtil.getBet(gameState);

      expect(result).toBe(0);
    });

    it('should return the correct bet amount when no community cards are available', async () => {
      const gameState = {
        current_buy_in: 100,
        minimum_raise: 10,
        in_action: 0,
        players: [{ stack: 100, bet: 50, hole_cards: [{ rank: 'K', suit: 'hearts' }, { rank: 'Q', suit: 'spades' }] }],
        community_cards: []
      };

      const result = await BetUtil.getBet(gameState);

      expect(result).toBe(60);
    });

    it('should return the correct bet amount when community cards are available', async () => {
      const gameState = {
        current_buy_in: 100,
        minimum_raise: 10,
        in_action: 0,
        players: [{ stack: 100, bet: 50, hole_cards: [{ rank: 'K', suit: 'hearts' }, { rank: 'Q', suit: 'spades' }] }],
        community_cards: [{ rank: 'A', suit: 'hearts' }, { rank: 'J', suit: 'diamonds' }, { rank: '7', suit: 'clubs' }]
      };

      Rank.getRank = jest.fn().mockResolvedValue({ rank: 3 });

      const result = await BetUtil.getBet(gameState);

      expect(result).toBe(60);
    });

    it('should return 0 when an API error occurs during rank calculation', async () => {
      const gameState = {
        current_buy_in: 100,
        minimum_raise: 10,
        in_action: 0,
        players: [{ stack: 100, bet: 50, hole_cards: [{ rank: 'K', suit: 'hearts' }, { rank: 'Q', suit: 'spades' }] }],
        community_cards: [{ rank: 'A', suit: 'hearts' }, { rank: 'J', suit: 'diamonds' }, { rank: '7', suit: 'clubs' }]
      };

      Rank.getRank = jest.fn().mockRejectedValue(new Error('API error'));

      const result = await BetUtil.getBet(gameState);

      expect(result).toBe(0);
    });
  });
});