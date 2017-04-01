function setup() {
  mapSize-=mapSize%cellSize;
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  
  tiles = []
  spores = []
  corpses = []
  bloodT = []
  
  var engine = new Engine();
  engine.startup();
  engine.run();
  
  debugTool = new DebugTool()
}

function draw() {
  drawTiles()
  drawBlood()
  drawCorpses()
  drawSpores();
  drawDebug();
}