Spore = function(x,y,size,dna){
  if(arguments.length < 2)
    var coords = this.spawnCords()
  this.x = x ||coords[0]
	this.y = y ||coords[1]
	this.speed = cellSpeed
	this.action = 0; // 0 Eat / 1 Bite / 2 Run
	this.vel = {x:random(-1,1),y:random(-1,1)}
	this.food = 100; //saturation
	this.size = size || sporeSize
	this.life = 100;
	this.tileArea = 0;
	this.facing = PI/2+Math.atan2(this.vel.y, this.vel.x);
	this.tFacing = PI/2+Math.atan2(this.vel.y, this.vel.x);
	this.alive = true;
	this.bleedAmm = 0;
	this.bleeding = false;
	this.tileIndx = floor(this.y/cellSize)*(mapSize/cellSize)+floor(this.x/cellSize);
	this.dna = dna || this.genDna()
	this.brain = new Brain(this.dna)
	this.brain.getData(this)
}
Spore.prototype.genDna = function(){
  var dna = {inp:[],out:[]}
  for(var i = 0; i < 6; i++){//input number
    dna.inp.push([])
    for(var j = 0; j < 10; j++){ //layer number
     dna.inp[i].push(random())
    }
  }
  for(var i = 0; i < 10; i++){ //layer number
    dna.out.push([])
    for(var j = 0; j < 6; j++){//output number
     dna.out[i].push(random())
    }
  }
  return dna
}
Spore.prototype.spawnCords = function(){
  do{
  var x = random(mapSize)
  var y = random(mapSize)
  var indx = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize)
  } while(!tiles[indx].land)
  return [x,y]
}
Spore.prototype.draw = function(){
  push()
  translate(this.x,this.y)
  rotate(this.facing)
	fill(255,55+this.life*2,55+this.life*2,155+this.food)
	ellipse(0,0,this.size*0.9,this.size)
	fill(0,0,255,155+this.food)
	ellipse(0,-this.size/5,this.size/2,this.size/3)
	pop()
}
Spore.prototype.bleed = function(){
  if(this.life <= 0)
    return
  if(this.bleedAmm > 0){
    this.life -= ceil(this.bleedAmm);
    this.bleedAmm-= 0.2
	if(random() < 0.3 && tiles[this.tileIndx].land){
      bloodT.push(new Blood(this.x,this.y,this.size))
	  //console.log(tiles[this.tileIndx].land,this.tileIndx)
	}
  }
  if(this.bleedAmm <= 0){
    this.bleedAmm = 0;
    this.bleeding = false;
  }else
    setTimeout(this.bleed.bind(this),1000-floor(this.bleedAmm*20))
}
Spore.prototype.checkMove = function(){
  if(this.x < this.size/2)
    this.x = this.size/2
  else if(this.x > mapSize - this.size/2)
    this.x = mapSize - this.size/2
  if(this.y < this.size/2)
    this.y = this.size/2
  else if(this.y > mapSize - this.size/2)
    this.y = mapSize - this.size/2
}
Spore.prototype.checkCollision = function(){
  for(var i = 0; i < spores.length; i++){
    if(i != spores.indexOf(this) && this.tileArea == spores[i].tileArea && this.chckCol(spores[i])){
					return spores[i];
    }
  }
  for(i = 0; i < corpses.length; i++){
    if(this.tileArea == corpses[i].tileArea && this.chckCol(corpses[i])){
      return corpses[i]
    }
  }
  return false;
}
Spore.prototype.update = function(){
  this.tileArea = this.chckArea();
  this.tileIndx = floor(this.y/cellSize)*(mapSize/cellSize)+floor(this.x/cellSize)
  var index = this.tileIndx
  //////Food
  this.food-= 0.25;
  if(tiles[index].food < 0){
      this.food+= tiles[index].food
      if(this.food < 0)
       this.food = 0;
  }
  else if(tiles[index].food > 1 && this.food < 100 && this.action == 0)
    this.eatGrass(tiles[index])
      
  var sp = this.checkCollision()
  if( sp && this.isFacing(sp) && random() < 0.4 && this.action == 1 ){
    this.bite(sp)
  } 
  //bleed
  if(this.bleedAmm > 0 && !this.bleeding){
    this.bleeding = true;
    this.bleed()
  }
  /////life
    this.checkLife()
  //////move
  if(this.rotate()){ //finished rotation
    if(random() < 0.03){
      this.makeDecision()
    }else
      this.move(index);
  }
  return(this.life > 0) //alive
}
Spore.prototype.isFacing = function(spore){
  var angle = PI/2 + Math.atan2(spore.y - this.y, spore.x - this.x);
  if(0.4 > abs(this.facing - angle)){
    return true;
  }else 
    return false;
}
Spore.prototype.bite = function(target){
  if(target.alive){
    target.life-=5;
    target.bleedAmm+=1
    this.food+=5;
    bloodT.push(new Blood(target.x,target.y,target.size))
  } else{
    target.life-=2;
    this.food+=2;
  }
}
Spore.prototype.eatGrass = function(tile){
  this.food+= 1;
  tile.food-= 1;
}
Spore.prototype.checkLife = function(){
  if(!this.bleeding && this.food > 60 && this.life < 100 && random() < 0+this.food/500){
    this.life+=1;
    this.food-=1
  }
  else if(this.food === 0){
    this.life--;
  }
}
Spore.prototype.move = function(index){
  var dx = this.vel.x;
  var dy = this.vel.y;
  
  dx *= this.speed;
  dy *= this.speed;
  
  if(this.action == 2){//run
    dx *= 1.4;
    dy *= 1.4;
  }
  if(this.bleeding){
    dx *= 0.8;
    dy *= 0.8;
  }
  if(!tiles[index].land){
    dx *= 0.6;
    dy *= 0.6;
  }
  if(this.food < 30){
    dx *= 0.9;
    dy *= 0.9;
  }
  this.x += dx;
  this.y += dy;
  this.checkMove();
}
Spore.prototype.rotate = function(){
  if(this.facing == this.tFacing)
    return true
  if(0.4 > abs(this.facing - this.tFacing)){
    this.facing = this.tFacing;
  }else if(this.facing < this.tFacing)
    this.facing += 0.3
  else
    this.facing -= 0.3
  return false;
}
Spore.prototype.chckArea = function(){
	this.tileArea = 0;
	var indx = floor(this.y/cellSize)*(mapSize/cellSize)+floor(this.x/cellSize)
	if(indx%cellNum > floor(cellNum/2)) // 0 1 // 0 0 // areas
		this.tileArea++;			   // 0 1 // 2 2 // 0-3
	if(indx > floor(cellNum*(cellNum/2)))
		this.tileArea+=2;
}
Spore.prototype.chckCol = function(spore){
	if(Math.pow((spore.x-this.x),2) + Math.pow((this.y-spore.y),2) <= Math.pow((this.size/2+spore.size/2),2)){
		return true;
	}
}
Spore.prototype.makeDecision = function(){
    this.brain.getData(this)
  	var actions = this.brain.calculate()
  	this.vel.x = actions[0].x
  	this.vel.y = actions[0].y
  	this.tFacing = PI/2+Math.atan2(this.vel.y, this.vel.x)
  	this.action = actions[1]
  	this.speed = cellSpeed*actions[2]
}
Spore.prototype.changeDirection = function(){	
  this.vel.x = random(-1,1)
  this.vel.y = random(-1,1)
  this.tFacing = PI/2+Math.atan2(this.vel.y, this.vel.x)
}