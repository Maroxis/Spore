// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ikwNrFvnL3g

var inc = 0.006;
var det = 6;
var foodInt =  1000 //ms
function setup() {
  createCanvas(400, 400);
  noiseDetail(det)
  pixelDensity(1);
  loadNoise()
  growFood();
}

function draw() {
  
}