Engine = function(){
  this.updSprCounter = 0;
  this.bldCounter = 0;
  this.crpDecCounter = 0;
  this.grwFoodCounter = 0;
  
}

Engine.prototype.startup = function(){
  loadTerrain()
  cellNum = mapSize/cellSize
  for(var i=0; i < sporeNum; i++){
	spores.push(new Spore())
  }
}

Engine.prototype.run = function(){
  this.update()
}

Engine.prototype.update = function(){
  
 var t = new Date().getTime();
 if(this.updSprCounter == 3){
    this.updateSpores()
    this.updSprCounter = 0;
 }
  if(this.crpDecCounter == 60){
    this.cDecay()
    this.crpDecCounter = 0;
 }
  if(this.grwFoodCounter == foodGrowRate){
    this.growFood();
    this.grwFoodCounter = 0;
 }
  if(this.bldCounter == 100){
    this.bloodFade();
    this.bldCounter = 0;
  }
 
  this.updSprCounter++;
  this.bldCounter++;
  this.crpDecCounter++;
  this.grwFoodCounter++;
  setTimeout(this.update.bind(this),10)
  if(new Date().getTime() - t > 8)
	console.log("WARNING High execute time " + (new Date().getTime() - t) + "ms")
}
Engine.prototype.bloodFade = function(){
  for(var i =0; i< bloodT.length; i++){
		bloodT[i].shrink()
	}
}
Engine.prototype.updateSpores = function(){
   for(var i =spores.length-1; i >= 0; i--){
		if(!spores[i].update()){
		  	
		  var index = floor(spores[i].y/cellSize)*(mapSize/cellSize)+floor(spores[i].x/cellSize)
		  if(tiles[index].land){
		    corpses.push(new Corpse(spores[i].x,spores[i].y,spores[i].size,spores[i].food,spores[i].facing))
		  }else{
		    spores.push(new Spore())
		  }
		  spores.splice(i,1)
		}
	}
}
Engine.prototype.cDecay = function(){ //corpses decay
  for(var i = 0; i < corpses.length; i++){
    corpses[i].decay();
  }
}
Engine.prototype.growFood = function(){
  for(var i = 0; i < tiles.length; i++){
    if(tiles[i].bFert >= 0.05){
        tiles[i].bFert -= 0.05
        tiles[i].food += 0.05
        if(tiles[i].bFert < 0)
          tiles[i].bFert = 0
    }
    if(tiles[i].land && tiles[i].food < maxFood && tiles[i].fertility > Math.random()){
      tiles[i].food += 0.1 
    }
  }
}