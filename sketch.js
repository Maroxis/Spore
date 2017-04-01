tiles = []
function setup() {
  mapSize-=mapSize%cellSize;
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  spores = []
  corpses = []
  bloodT = []
  
  fps = 0;
  setInterval(debug,500)
  
  var engine = new Engine();
  engine.startup();
  engine.run();
}
var debug = function(){
	fps = floor(frameRate())
}
function draw() {
  drawTiles()
  drawBlood()
  drawCorpses()
  drawSpores();
	
	if(fps!==0){
  	fill(255)
  	textSize(32);
    text(fps, 10, 30) 
	}
}