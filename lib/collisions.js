function checkForCollision(object1, object2) {
  var xDifferential = Math.abs(object1.center.x - object2.center.x);
  var yDifferential = Math.abs(object1.center.y - object2.center.y);
  var sumWidths     = (object1.size.width + object2.size.width) / 2;
  var sumHeights    = (object1.size.height + object2.size.height) / 2;
  return xDifferential <= sumWidths && yDifferential <= sumHeights;
}

module.exports = checkForCollision;
