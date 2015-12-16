const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Meteor = require('../lib/meteor');
const Player = require('../lib/player');

describe('Meteor', function() {
  beforeEach(function() {
    this.board = new Board();
    this.meteor = new Meteor(this.board);
  });

  describe('instantiation', function() {
    it('should instantiate a new meteor', function() {
      assert.isObject(this.meteor);
    });

    it('should reference the board object passed as the first parameter', function() {
      assert.equal(this.meteor.board, this.board);
    });

    it('should initialize center x coordinate within range of board width', function() {
      assert.isAbove(this.meteor.center.x, 0);
      assert.isBelow(this.meteor.center.x, this.board.width);
    });

    it('should initialize center y coordinate at top of the board', function() {
      assert.equal(this.meteor.center.y, 0 - (this.meteor.size.height / 2));
    });

    it('should have a height and width between 16 and 41 pixels', function() {
      assert.isAbove(this.meteor.size.width, 15);
      assert.isBelow(this.meteor.size.width, 42);
      assert.isAbove(this.meteor.size.height, 15);
      assert.isBelow(this.meteor.size.height, 42);
    });

    it('should have a height and width that can be manually set', function() {
      let meteor = new Meteor(this.board, 1, 20, 30);
      assert.equal(meteor.size.width, 20);
      assert.equal(meteor.size.height, 30);
    });

    it('should have a point value based on its width and height', function() {
      let meteor = new Meteor(this.board, 1, 20, 30);
      assert.equal(meteor.pointValue, 32);

      let meteor2 = new Meteor(this.board, 1, 20, 40);
      assert.equal(meteor2.pointValue, 27);
    });

    it('should be included in the board\'s array of this.meteor objects', function() {
      assert.include(this.board.meteors, this.meteor);
    });
  });

  describe('movement', function() {
    it('should have a random X velocity between -2 and 2', function() {
      assert.isAbove(this.meteor.velocity.x, -3);
      assert.isBelow(this.meteor.velocity.x, 3);
    });

    it('should have a random Y velocity between 1 and 4 on Level 1', function() {
      let meteor = new Meteor(this.board, 1);
      assert.isAbove(meteor.velocity.y, 0);
      assert.isBelow(meteor.velocity.y, 5);
    });

    it('should have a random Y velocity between 3 and 6 on Level 2 & 3', function() {
      let meteor = new Meteor(this.board, 3);
      assert.isAbove(meteor.velocity.y, 2);
      assert.isBelow(meteor.velocity.y, 7);
    });

    it('should have a random Y velocity between 5 and 8 on Level 4 & above', function() {
      let meteor = new Meteor(this.board, 5);
      assert.isAbove(meteor.velocity.y, 4);
      assert.isBelow(meteor.velocity.y, 9);
    });

    it('should move from its starting position', function() {
      let originalCenterX = this.meteor.center.x;
      let originalCenterY = this.meteor.center.y;
      let changeInX       = this.meteor.velocity.x;
      let changeInY       = this.meteor.velocity.y;

      this.meteor.update();

      assert.equal(this.meteor.center.x, originalCenterX + changeInX);
      assert.equal(this.meteor.center.y, originalCenterY + changeInY);
    });
  });
});
