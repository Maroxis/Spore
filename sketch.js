function setup() {
  mapSize-=mapSize%cellSize;
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  pg = createGraphics(mapSize, mapSize);
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  
  tiles = []
  spores = []
  corpses = []
  bloodT = []
  
  debugTool = new DebugTool()
  
  engine = new Engine();
  engine.startup();
  engine.run();
  
  
}

function draw() {
  drawTiles()
  drawBlood()
  drawCorpses()
  drawSpores();
  drawDebug();
}