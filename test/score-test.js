const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Meteor = require('../lib/meteor');
const Score = require('../lib/score');

describe('Score', function() {
  beforeEach(function() {
    this.board = new Board();
  });

  describe('Total score and meteors destroyed', function() {
    it('should return a totalScore and meteorsDestroyed count of zero', function() {
      let score = new Score(this.board);
      assert.equal(score.results().totalScore, 0);
      assert.equal(score.results().meteorsDestroyed, 0);
    });

    it('should return a totalScore of the meteor\'s pointValue and meteorsDestroyed count of one', function() {
      let score  = new Score(this.board);
      let meteor = this.board.addMeteor();
      this.board.meteorsDestroyed.push(meteor);
      assert.equal(score.results().totalScore, meteor.pointValue);
      assert.equal(score.results().meteorsDestroyed, 1);
    });

    it('should return a totalScore summing two meteor\'s pointValues and meteorsDestroyed count of two', function() {
      let score  = new Score(this.board);
      let meteor1 = this.board.addMeteor();
      let meteor2 = this.board.addMeteor();
      this.board.meteorsDestroyed.push(meteor1);
      this.board.meteorsDestroyed.push(meteor2);
      assert.equal(score.results().totalScore, meteor1.pointValue + meteor2.pointValue);
      assert.equal(score.results().meteorsDestroyed, 2);
    });
  });
});
