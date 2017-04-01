Spore = function(x,y,size){
	this.x = x || floor(random(mapSize/cellSize))*cellSize+cellSize/2
	this.y = y || floor(random(mapSize/cellSize))*cellSize+cellSize/2
	this.speed = cellSpeed
	this.vel = {x:0,y:0}
	this.food = 100; //saturation
	this.size = size || sporeSize
	this.life = 100;
	this.tileArea = 0;

	this.target = {x:this.x,y:this.y}
}
Spore.prototype.draw = function(){
  push()
  translate(this.x,this.y)
  rotate(PI/2+Math.atan2(this.vel.y, this.vel.x))//
	fill(255,55+this.life*2,55+this.life*2,155+this.food)
	ellipse(0,0,this.size)
	fill(0,0,255,155+this.food)
	//if(round(this.x) == (this.target.x) && round(this.y) == (this.target.y))
	  //ellipse(0,0,this.size/2,this.size/3)
	 //else
	  ellipse(0,-this.size/5,this.size/2,this.size/3)
	pop()
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
					return [1,spores[i]];
    }
  }
  for(i = 0; i < corpses.length; i++){
    if(this.tileArea == corpses[i].tileArea && this.chckCol(corpses[i])){
      return [2,corpses[i]]
    }
  }
  return [0];
}
Spore.prototype.update = function(){
  this.tileArea = this.chckArea();
  var index = floor(this.y/cellSize)*(mapSize/cellSize)+floor(this.x/cellSize)
  //////Food
  this.food-= 0.5;
  if(tiles[index].food < 0){
      this.food+= tiles[index].food
      if(this.food < 0)
       this.food = 0;
  }
  else if(this.food < 100){
    var sp = this.checkCollision()
    if( sp[0] == 1 && random() > 0.5){ //eat other spore
      sp[1].life-=5;
      this.food+=5;
    }else if(sp[0] == 2 && random() > 0.5){ //eat corpse
      sp[1].food-=2;
      this.food+=2;
    }
    else{ // eat grass
    this.food+= 1
    tiles[index].food-= 1;
    }
  }
  
    
  //////move
  var dx = this.vel.x
  var dy = this.vel.y
  
  dx *= this.speed
  dy *= this.speed
  
  if(!tiles[index].land){
    dx *= 0.6
    dy *= 0.6
  }
  if(this.food < 30){
    dx *= 0.8
    dy *= 0.8
  }
  
  this.x += dx
  this.y += dy
  
  this.checkMove();

  /////life
  if(this.food > 60 && this.life < 100){
    this.life+=0.1
    if(this.food > 90){
      this.life+=0.4
      this.food--;
    }
  }
  else if(this.food === 0){
    this.life--;
  }
  return(this.life > 0) //alive
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
Spore.prototype.move = function(){	
  this.vel.x = random(-1,1)
  this.vel.y = random(-1,1)
}