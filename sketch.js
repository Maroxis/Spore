p5.disableFriendlyErrors = true;
function setup() {
  
  if(localStorage.getItem("spores") !== null && confirm('Do you want to load last session?')){ 
	  loadSession()
 	}else{
 	  spores = []
 	  corpses = []
 	  tiles = []
 	}
  
  mapSize-=mapSize%cellSize;
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  pg = document.getElementById('waterCanv')
  pg.width = mapSize;
  pg.height = mapSize;
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  frameRate(60)
  bloodT = []
  
  debugTool = new DebugTool()
  
  engine = new Engine();
  engine.startup();
  engine.run();
  
  testFps(0,0)
}
function testFps(count,lFPSCt){ // detecting low performance
	if(count >= 50){
	  if(lFPSCt > 10)
	    frameRate(30)
	  return
	}
	
	var fpsC = lFPSCt
	if(frameRate() < 45)
	  fpsC++
  
	count++
	setTimeout(function(){testFps(count,fpsC)},20)
}

function draw() {
  drawTiles()
  drawBlood()
  drawCorpses()
  drawSpores();
  drawDebug();
}