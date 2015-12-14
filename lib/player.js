function Player(board) {
  this.board = board;
  this.center = { x: this.board.width / 2, y: this.board.height - 10 };
  this.size = { width: 16, height: 16 };
  this.velocity = { left: -7, right: 7 };
  this.keyboarder = new Keyboarder();
  this.active = true;
  this.board.players.push(this);
}

Player.prototype.update = function() {
  this.checkLeftRight();
  this.checkShotFired();
};

Player.prototype.checkLeftRight = function() {
  if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
    this.center.x += this.velocity.left;
  } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
    this.center.x += this.velocity.right;
  }
};

Player.prototype.checkShotFired = function() {
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    var bullet = this.board.addBullet();
  }
};

var Keyboarder = function() {
  var keyState = {};

  window.onkeydown = function(e) {
    keyState[e.keyCode] = true;
  };

  window.onkeyup = function(e) {
    keyState[e.keyCode] = false;
  };

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
};

module.exports = Player;
