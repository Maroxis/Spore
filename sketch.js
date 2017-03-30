tiles = []
function setup() {
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  spores = []
  corpses = []
  
  fps = 0;
  setInterval(debug,500)
  
  var engine = new Engine();
  engine.startup();
  engine.run();
}
var debug = function(){
	fps = floor(frameRate())
	//console.log(corpses[0])
	//console.log(corpses.length)
}
function draw() {
  loadPixels()
  for(var i = 0; i < tiles.length; i++){
    tiles[i].draw()
  }
  updatePixels()
	
	for(var i =0; i< corpses.length; i++){
		corpses[i].draw()
	}
	
	for(var i =0; i< spores.length; i++){
		spores[i].draw()
	}
	
	if(fps!==0){
  	fill(255)
  	textSize(32);
    text(fps, 10, 30) 
	}
}