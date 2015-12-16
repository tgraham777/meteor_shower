const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');

describe('Keyboarder', function() {
  beforeEach(function() {
    this.keyboarder = new keyboarder();
    this.board = new Board();
    this.player = new Player(this.board);
    this.originalCenterX = this.player.center.x;
  });

  xit('should move the player left if the left arrow key is pressed down', function() {
    // var e = $.Event("keydown");
    // e.keyCode = 50;
    let result = player.keyboarder.isDown();



    player.update();

    assert.equal(player.center.x, originalCenterX - 7);
  });

  xit('should know if the right arrow key is pressed down', function() {
    let player = new Player(this.board);
    let originalCenterX = player.center.x;

    player.moveRight();

    assert.equal(player.center.x, originalCenterX + 7);
  });

  xit('should know if the space bar is pressed down', function() {
    let player = new Player(this.board);
    let originalCenterX = player.center.x;

    player.moveRight();

    assert.equal(player.center.x, originalCenterX + 7);
  });
});
