p5.disableFriendlyErrors = true;
function setup() {
  
  mapSize-=mapSize%cellSize;
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  pg = document.getElementById('waterCanv')
  pg.width = mapSize;
  pg.height = mapSize;
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  frameRate(30)
  bloodT = []
  spores = []
 	corpses = []
 	tiles = []
 	
  cellNum = mapSize/cellSize
  
  if(localStorage.getItem("spores") !== null && confirm('Do you want to load last session?')){ 
	  loadSession()
 	}
  
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