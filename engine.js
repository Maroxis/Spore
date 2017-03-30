Engine = function(){
  this.updSprCounter = 0;
  this.mveSprCounter = 0;
  this.crpDecCounter = 0;
  this.grwFoodCounter = 0;
  
}

Engine.prototype.startup = function(){
  loadTerrain()
  for(var i=0; i < sporeNum; i++){
	spores.push(new Spore())
  }
  
}

Engine.prototype.run = function(){
  this.update()
}

Engine.prototype.update = function(){
  
 //var t = new Date().getTime();
 if(this.updSprCounter == 3){
    this.updateSpores()
    this.updSprCounter = 0;
 }
 if(this.mveSprCounter == 10){
    this.moveSpores()
    this.mveSprCounter = 0;
 }
    this.cDecay()
    this.crpDecCounter = 0;
 }
  if(this.grwFoodCounter == foodGrowRate){
    this.growFood();
    this.grwFoodCounter = 0;
 }
 
  this.updSprCounter++;
  this.mveSprCounter++;
  this.crpDecCounter++;
  this.grwFoodCounter++;
  setTimeout(this.update.bind(this),10)
  //console.log(new Date().getTime() - t)
}
Engine.prototype.updateSpores = function(){
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
Engine.prototype.cDecay = function(){ //corpses decay
  for(var i = 0; i < corpses.length; i++){
    corpses[i].decay();
  }
}
Engine.prototype.growFood = function(){
  for(var i = 0; i < tiles.length; i++){
    if(tiles[i].land && tiles[i].food < maxFood && tiles[i].fertility > Math.random()){
      tiles[i].food += 0.05 + tiles[i].bFert
      if(tiles[i].bFert > 0){
        tiles[i].bFert -= 0.01
      if(tiles[i].bFert < 0)
        tiles[i].bFert = 0
      }
    }
  }
}
Engine.prototype.moveSpores = function(){
  for(var i=0; i<spores.length;i++){
	spores[i].move()
  }
}