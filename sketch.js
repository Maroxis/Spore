// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ikwNrFvnL3g
var terrain
function setup() {
  createCanvas(mapSize, mapSize);
  noStroke()
  noiseDetail(det)
  pixelDensity(1);
  terrain = loadTerrain()
  console.log(terrain)
  growFood();
  spores = []
  for(var i=0; i<10;i++)
	spores.push(new Spore())

}
var drawMap = () =>{
	for (var y = 0; y < height/cellSize; y++) {
		for (var x = 0; x < width/cellSize; x++) {
			var index = ((x + y*(width/cellSize))*3)
			fill(terrain[index],terrain[index+1],terrain[index+2])
			rect(x*cellSize,y*cellSize,cellSize,cellSize)
		}
  }
}
function draw() {
  drawMap()
	for(var i =0; i< spores.length; i++){
		spores[i].update()
		spores[i].draw()
	}
  }