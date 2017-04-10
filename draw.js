function drawTiles(){
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < tiles.length; i++){
    tiles[i].draw()
  }
  updatePixels()
}
function drawWater(){
  for(var i = 0; i < tiles.length; i++){
    tiles[i].genWater()
  }
}
function drawBlood(){
	for(var i =0; i< bloodT.length; i++){
		bloodT[i].draw()
	}
}
function drawCorpses(){
	for(var i =0; i< corpses.length; i++){
		corpses[i].draw()
	}
}
function drawSpores(){
	for(var i =0; i< spores.length; i++){
		spores[i].draw()
	}
}
function drawDebug(){
	debugTool.draw()
}