function Bullet(board) {
  this.board = board;
  this.center = {
                  x: this.board.players[0].center.x,
                  y: this.board.players[0].center.y - (this.board.players[0].size.height / 2) - 1
                };
  this.size = { width: 10, height: 10 };
  this.velocity = { y: -6 };
  this.active = true;
  this.board.bullets.push(this);
}

Bullet.prototype.update = function() {
  this.center.y += this.velocity.y;
}

module.exports = Bullet;
