function Score(board) {
  this.board = board;
}

Score.prototype.calculateScore = function() {
  if (this.board.meteorsDestroyed.length > 0) {
    var points = this.board.meteorsDestroyed.map(function(meteor) {
      return meteor.pointValue;
    });
    return points.reduce(function(total, value) {
      return total + value;
    });
  } else {
    return 0;
  }
}

Score.prototype.determineLevel = function() {
  if (this.calculateScore() < 500) {
    return 1;
  } else if (this.calculateScore() < 1000) {
    return 2;
  } else if (this.calculateScore() < 1800) {
    return 3;
  } else if (this.calculateScore() < 3000) {
    return 4;
  } else {
    return 5;
  }
}

Score.prototype.results = function() {
  return {
    totalScore: this.calculateScore(),
    meteorsDestroyed: this.board.meteorsDestroyed.length
  }
}

module.exports = Score;
