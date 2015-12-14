function Player(board) {
  this.board = board;
  this.center = { x: this.board.width / 2, y: this.board.height - 10 };
  this.size = { width: 16, height: 16 };
  this.velocity = { left: -7, right: 7 };
  this.active = true;
  this.board.players.push(this);
}

Player.prototype.update = function() {
  var keyboarder = new Keyboarder();
  if (keyboarder.isDown(keyboarder.KEYS.LEFT)) {
    this.center.x += this.velocity.left;
  } else if (keyboarder.isDown(keyboarder.KEYS.RIGHT)) {
    this.center.x += this.velocity.right;
  }

  if (keyboarder.isDown(keyboarder.KEYS.SPACE)) {
    var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.height / 2}, { x: 0, y: -6 });
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

// Player.prototype.moveLeft = function() {
//   this.center.x += this.velocity.left;
// }
//
// Player.prototype.moveRight = function() {
//   this.center.x += this.velocity.right;
// }

module.exports = Player;
