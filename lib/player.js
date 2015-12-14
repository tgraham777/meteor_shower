function Player(board) {
  this.board = board;
  this.center = { x: this.board.width / 2, y: this.board.height - 10 };
  this.size = { width: 16, height: 16 };
  this.velocity = { left: -7, right: 7 };
  this.keyboarder = new Keyboarder();
  this.rateOfFireCounter = -1;
  this.rateOfFireValue = 15;
  this.active = true;
  this.board.players.push(this);
}

Player.prototype.update = function() {
  this.checkLeftRight();
  this.checkShotFired();
};

Player.prototype.checkLeftRight = function() {
  var leftEdge = this.center.x - (this.size.width / 2);
  var rightEdge = this.center.x + (this.size.width / 2);

  this.checkLeftEdge(leftEdge);
  this.checkRightEdge(rightEdge);

  if (leftEdge > 0 && rightEdge < this.board.width) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += this.velocity.right;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x += this.velocity.left;
    }
  }
};

Player.prototype.checkLeftEdge = function(leftEdge) {
  if (leftEdge <= 0) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += this.velocity.right;
    }
  }
}

Player.prototype.checkRightEdge = function(rightEdge) {
  if (rightEdge >= this.board.width) {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x += this.velocity.left;
    }
  }
}

Player.prototype.checkShotFired = function() {
  if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    this.rateOfFireCounter++;
    if (this.rateOfFireCounter % this.rateOfFireValue === 0) {
      var bullet = this.board.addBullet();
    }
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
