var _ = require('lodash');
const Player = require('./player');
const Meteor = require('./meteor');
const Bullet = require('./bullet');

function Board(width, height) {
  this.width = width || 1250;
  this.height = height || 600;
  this.meteors = [];
  this.impactedMeteors = [];
  this.players = [];
  this.bullets = [];
}

Board.prototype.addPlayer = function() {
  return new Player(this);
}

Board.prototype.addMeteor = function() {
  return new Meteor(this);
}

Board.prototype.addBullet = function() {
  return new Bullet(this);
}

Board.prototype.calculateScore = function() {
  if (this.impactedMeteors.length > 0) {
    var points = this.impactedMeteors.map(function(meteor) {
      return meteor.pointValue;
    });
    return points.reduce(function(total, value) {
      return total + value;
    });
  } else {
    return 0;
  }
}

Board.prototype.results = function() {
  return {
    score: this.calculateScore(),
    meteorsDestroyed: this.impactedMeteors.length
  }
}

Board.prototype.joinObjects = function() {
  return this.meteors.concat(this.players, this.bullets);
}

Board.prototype.checkForCollision = function(object, meteor) {
  var xDifferential = Math.abs(object.center.x - meteor.center.x);
  var yDifferential = Math.abs(object.center.y - meteor.center.y);
  var sumWidths     = (object.size.width + meteor.size.width) / 2;
  var sumHeights    = (object.size.height + meteor.size.height) / 2;
  return xDifferential <= sumWidths && yDifferential <= sumHeights;
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
};

Board.prototype.returnImpactedBullet = function(meteor) {
  return _.find(this.bullets, function(bullet){
    if (this.checkForCollision(bullet, meteor)) {
      this.impactedMeteors.push(meteor);
      return this.checkForCollision(bullet, meteor);
    }
    return this.checkForCollision(bullet, meteor);
  }.bind(this));
}

Board.prototype.changeObjectStatuses = function(meteor) {
  var bullet = this.returnImpactedBullet(meteor)
  var player = this.players[0];
  if( bullet !== undefined ) {
    this.changeActiveStatus(bullet);
    this.changeActiveStatus(meteor);
  } else if(player !== undefined && this.checkForCollision(player, meteor)) {
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
