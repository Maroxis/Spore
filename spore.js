Spore = function(x,y,size){
	this.x = x || floor(random(mapSize/cellSize))*cellSize+cellSize/2
	this.y = y || floor(random(mapSize/cellSize))*cellSize+cellSize/2
	this.speed = cellSpeed
	this.food = 100; //saturation
	this.size = size || sporeSize
	this.life = 100;
	this.tileArea = 0;

	this.target = {x:this.x,y:this.y}
}
Spore.prototype.draw = function(){
  push()
  translate(this.x,this.y)
  rotate(PI/2+Math.atan2(this.target.y - this.y, this.target.x - this.x))//
	fill(255,55+this.life*2,55+this.life*2,155+this.food)
	ellipse(0,0,this.size)
	fill(0,0,255,155+this.food)
	//if(round(this.x) == (this.target.x) && round(this.y) == (this.target.y))
	  //ellipse(0,0,this.size/2,this.size/3)
	 //else
	  ellipse(0,-this.size/5,this.size/2,this.size/3)
	pop()
}
Spore.prototype.checkMove = function(moveX,moveY){
  if(moveX > mapSize-cellSize/2 || moveX < cellSize/2 || moveY > mapSize-cellSize/2 || moveY < cellSize/2)
    return false;
  return true;
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
  if(!tiles[index].land){
    this.speed -= this.speed/3
  }
  if(this.food < 30)
    this.speed -= this.speed/5
  
  if(this.target.x-1 > this.x)
    this.x+=this.speed
  else if(this.target.x+1 < this.x)
    this.x-=this.speed
  if(this.target.y-1 > this.y)
    this.y+=this.speed
  else if(this.target.y+1 < this.y)
    this.y-=this.speed
  
  this.speed = cellSpeed
  
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
  var r = floor(random()*10)
  if(r > 5 && this.checkMove(this.target.x + cellSize,this.y))
    this.target.x = floor(this.target.x+cellSize)
  else if(r < 4 && this.checkMove(this.target.x - cellSize,this.y))
    this.target.x = floor(this.target.x-cellSize)
  r = floor(random()*10)
  if(r > 5 && this.checkMove(this.target.x,this.y - cellSize))
    this.target.y = floor(this.target.y - cellSize)
  else if(r < 4 && this.checkMove(this.target.x,this.y + cellSize))
    this.target.y = floor(this.target.y + cellSize)
  if(!this.checkMove(this.target.x,this.target.y)){
    this.target.x = this.x
    this.target.y = this.y
  }
}