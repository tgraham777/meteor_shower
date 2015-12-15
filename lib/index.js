const Runner = require('./runner');

var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');
var gameSize = { x: canvas.width, y: canvas.height };

var runner = new Runner(canvas, context, gameSize);
runner.addMeteors(1000);
