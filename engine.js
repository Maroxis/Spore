Engine = function(){
  this.updSprCounter = 0;
  this.bldCounter = 0;
  this.crpDecCounter = 0;
  this.grwFoodCounter = 0;
  this.sprDecCounter = 0;
  this.speed = 10;
  this.clock;
  this.fastF = 0;
}
Engine.prototype.fastForward = function(amm){
  if(amm){
    noLoop()
    this.fastF = amm
  }
  else
    return this.fastF
}
Engine.prototype.startup = function(){
  if(!tiles[0])
   loadTerrain()
   
  drawWater()
  loadPixels()
  
  if(!spores[0]){
    for(var i=0; i < sporeNum; i++){
  	spores.push(new Spore())
    }
  }
}
Engine.prototype.changeSpeed = function(speed){
  if(speed)
	this.speed = speed;
  clearInterval(this.clock)
  this.clock = setInterval(function(){this.update()}.bind(this),this.speed)
}
Engine.prototype.makeSpore = function(){
  var maxAge = -1;
  for(var i = 0; i < spores.length; i++){
    if(spores[i].age > max){
      maxAge = spores[i].age*spores[i].age
    }
  }
  do{
    var sp1 = spores[floor(random(spores.length))]
    var sp2 = spores[floor(random(spores.length))]
  }while(sp1.age*sp1.age < random()*maxAge && sp2.age*sp2.age < random()*maxAge)
  var dna = sp1.brain.mixDna(sp2)
  var generation = sp1.generation > sp2.generation ? sp1.generation : sp2.generation;
  generation++;
  spores.push(new Spore(dna,generation))
}

Engine.prototype.run = function(){
  this.clock = setInterval(function(){this.update()}.bind(this),this.speed)
}

Engine.prototype.update = function(){
  if(this.fastF > 0)
   clearInterval(this.clock)
  var done = false
	while(this.fastF > 0 || !done){
  t = new Date().getTime();
	
  this.updSprCounter++;
  this.bldCounter++;
  this.crpDecCounter++;
  this.grwFoodCounter++;
  this.sprDecCounter++;

 if(this.updSprCounter == 3){
    this.updateSpores()
    this.updSprCounter = 0;
 }
  if(this.crpDecCounter == 50){
    this.cDecay()
    this.crpDecCounter = 0;
 }
 if(this.sprDecCounter == 20){ //cycles for spore decision
    this.sporesMkDec()
    this.sprDecCounter = 0;
 }
  if(this.grwFoodCounter == foodGrowRate){
    this.growFood();
    this.grwFoodCounter = 0;
 }
  if(this.bldCounter == 20){
    this.bloodFade();
    this.bldCounter = 0;
  }

  if(debugTool.on){
  	debugTool.exeTime = new Date().getTime() - t
  	if(debugTool.exeTime > 20)
  		console.log("WARNING High execute time " + (new Date().getTime() - t) + "ms")
  }
  if(this.fastF === 0){
    done = true
  } else{
    this.fastF--
    if(this.fastF % 10000 === 0 && this.fastF != 0)
      console.log(this.fastF/10000)
    if(this.fastF === 0){
      loop()
      this.clock = setInterval(function(){this.update()}.bind(this),this.speed)
    }
    }
    
	}
}
Engine.prototype.sporesMkDec = function(){
    
  for(var i = spores.length-1; i >= 0; i--){
    spores[i].makeDecision()
  }
}
Engine.prototype.bloodFade = function(){
  for(var i = bloodT.length-1 ; i >= 0 ; i--){
		if(bloodT[i].shrink())
		  bloodT.splice(i,1)
	}
}
Engine.prototype.updateSpores = function(){
   for(var i =spores.length-1; i >= 0; i--){
		if(!spores[i].update()){
		  	
		  var index = floor(spores[i].y/cellSize)*(mapSize/cellSize)+floor(spores[i].x/cellSize)
		  if(tiles[index].land){
		    corpses.push(new Corpse(spores[i].x,spores[i].y,spores[i].size,spores[i].food,spores[i].facing))
		  }else{
		    this.makeSpore()
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
    if(tiles[i].land)
      tiles[i].growFood()
  }
}