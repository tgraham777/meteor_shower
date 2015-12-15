const chai = require('chai');
const assert = chai.assert;

var checkForCollision = require('../lib/collisions');
const Board = require('../lib/board');

describe('Collision Detection', function() {
  it('should return true when two objects have collided', function() {
    let board   = new Board();
    let player  = board.addPlayer();
    let meteor  = board.addMeteor();
    let bullet  = board.addBullet();

    meteor.center.x = 2;
    meteor.center.y = 2;
    bullet.center.x = 2;
    bullet.center.y = 2;

    assert.isTrue(checkForCollision(meteor, bullet))
  });

  it('should return false when two objects have not collided', function() {
    let board   = new Board();
    let player  = board.addPlayer();
    let meteor  = board.addMeteor();
    let bullet  = board.addBullet();

    meteor.center.x = 200;
    meteor.center.y = 200;
    bullet.center.x = 2;
    bullet.center.y = 2;

    assert.isFalse(checkForCollision(meteor, bullet))
  });
});
