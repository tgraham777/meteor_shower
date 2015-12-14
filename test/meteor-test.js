const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Meteor = require('../lib/meteor');
const Player = require('../lib/player');

describe('Meteor', function() {
  beforeEach(function() {
    this.board = new Board();
  });

  describe('instantiation', function() {
    it('should instantiate a new meteor', function() {
      let meteor = new Meteor(this.board);
      assert.isObject(meteor);
    });

    it('should reference the board object passed as the first parameter', function() {
      let meteor = new Meteor(this.board);
      assert.equal(meteor.board, this.board);
    });

    it('should initialize center x coordinate within range of board width', function() {
      let meteor = new Meteor(this.board);
      assert.isAbove(meteor.center.x, 0);
      assert.isBelow(meteor.center.x, this.board.width);
    });

    it('should initialize center y coordinate at top of the board', function() {
      let meteor = new Meteor(this.board);
      assert.equal(meteor.center.y, 0 - (meteor.size.height / 2));
    });

    it('should have a height and width between 16 and 41 pixels', function() {
      let meteor = new Meteor(this.board);
      assert.isAbove(meteor.size.width, 15);
      assert.isBelow(meteor.size.width, 42);
      assert.isAbove(meteor.size.height, 15);
      assert.isBelow(meteor.size.height, 42);
    });

    it('should have a point value based on its width and height', function() {
      let meteor = new Meteor(this.board);

      assert.equal(meteor.pointValue, Math.floor(-((meteor.size.width + meteor.size.height) / 2) + 42));
    });

    it('should be included in the board\'s array of meteor objects', function() {
      let meteor = new Meteor(this.board);
      assert.include(this.board.meteors, meteor);
    });
  });

  describe('movement', function() {
    it('should have a random Y velocity between 1 and 4', function() {
      let meteor = new Meteor(this.board);
      assert.isAbove(meteor.velocity.y, 0);
      assert.isBelow(meteor.velocity.y, 5);
    });

    it('should have a random X velocity between -2 and 2', function() {
      let meteor = new Meteor(this.board);
      assert.isAbove(meteor.velocity.x, -3);
      assert.isBelow(meteor.velocity.x, 3);
    });

    it('should move from its starting position', function() {
      let meteor = new Meteor(this.board);
      let originalCenterX = meteor.center.x;
      let originalCenterY = meteor.center.y;
      let changeInX       = meteor.velocity.x;
      let changeInY       = meteor.velocity.y;

      meteor.update();

      assert.equal(meteor.center.x, originalCenterX + changeInX);
      assert.equal(meteor.center.y, originalCenterY + changeInY);
    });
  });
});
