// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ikwNrFvnL3g
tiles = []
function setup() {
  ellipseMode(CENTER)
  createCanvas(mapSize, mapSize);
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  loadTerrain()
  growFood();
  spores = []
  corpses = []
  fps = 0;
  for(var i=0; i<sporeNum;i++){
	spores.push(new Spore())
  }
  setInterval(moveSpores,200)
  setInterval(update,50)
  //setInterval(debug,500)
}
var debug = function(){
	fps = floor(frameRate())
//	console.log(tiles[0].food)
}
var moveSpores = function(){
  for(var i=0; i<spores.length;i++){
	spores[i].move()
  }
}
function drawTiles(){
  loadPixels()
  for(var i = 0; i < tiles.length; i++){
    tiles[i].draw()
  }
  updatePixels()
}
function update(){
  for(var i =spores.length-1; i >= 0; i--){
		if(!spores[i].update()){
		  	
		  var index = floor(spores[i].y/cellSize)*(mapSize/cellSize)+floor(spores[i].x/cellSize)
		  if(tiles[index].land){
		    corpses.push(new Corpse(spores[i].x,spores[i].y,spores[i].size,spores[i].food))
		  }else{
		    spores.push(new Spore())
		  }
		  spores.splice(i,1)
		}
	}
}
function draw() {
  drawTiles()
	for(var i =0; i< spores.length; i++){
		spores[i].draw()
	}
	for(var i =0; i< corpses.length; i++){
		corpses[i].draw()
	}
	if(fps!==0){
	fill(255)
	textSize(32);
  text(fps, 10, 30) 
	}
}