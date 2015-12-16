var _ = require('lodash');
var checkForCollision = require('./collisions')
const Player    = require('./player');
const Meteor    = require('./meteor');
const Bullet    = require('./bullet');

function Board(width, height) {
  this.width = width || 1250;
  this.height = height || 600;
  this.meteors = [];
  this.meteorsDestroyed = [];
  this.players = [];
  this.bullets = [];
}

Board.prototype.addPlayer = function() {
  return new Player(this);
}

Board.prototype.addMeteor = function(level) {
  return new Meteor(this, level);
}

Board.prototype.addBullet = function() {
  return new Bullet(this);
}

Board.prototype.joinObjects = function() {
  return this.meteors.concat(this.players, this.bullets);
}

Board.prototype.changeImpactedMeteorAndObjectStatuses = function() {
  this.meteors.forEach(function(meteor) {
    this.changeObjectStatuses(meteor);
    if (meteor.center.y + meteor.size.height / 2 >= this.height){
      this.changeActiveStatus(meteor);
      this.changeActiveStatus(this.players[0]);
    }else if (meteor.center.x <= -meteor.size.width / 2 ||
              meteor.center.x >= this.width + meteor.size.width / 2
             ) {
      this.changeActiveStatus(meteor);
    }
  }.bind(this));
}

Board.prototype.returnImpactedBullet = function(meteor) {
  return _.find(this.bullets, function(bullet){
    if (checkForCollision(bullet, meteor)) {
      this.meteorsDestroyed.push(meteor);
      return checkForCollision(bullet, meteor);
    }
    return checkForCollision(bullet, meteor);
  }.bind(this));
}

Board.prototype.changeObjectStatuses = function(meteor) {
  var bullet = this.returnImpactedBullet(meteor)
  var player = this.players[0];
  if( bullet !== undefined ) {
    this.changeActiveStatus(bullet);
    this.changeActiveStatus(meteor);
  } else if(player !== undefined && checkForCollision(player, meteor)) {
    this.changeActiveStatus(player);
    this.changeActiveStatus(meteor);
  }
}

Board.prototype.changeActiveStatus = function(object) {
  object.active = false;
}

Board.prototype.getActiveObjects = function(objects) {
  return _.filter(objects, function(object) {
    return object.active === true;
  });
}

Board.prototype.removeOffCanvasBullets = function() {
  this.bullets.forEach(function(bullet) {
    if(bullet.center.y === -(bullet.size.height / 2)){
      this.changeActiveStatus(bullet);
    }
  }.bind(this));
}

Board.prototype.removeInActiveObjects = function() {
  this.changeImpactedMeteorAndObjectStatuses();
  this.removeOffCanvasBullets();
  this.meteors = this.getActiveObjects(this.meteors);
  this.bullets = this.getActiveObjects(this.bullets);
  this.players = this.getActiveObjects(this.players);
}

module.exports = Board;
