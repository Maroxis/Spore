Spore = function(x,y,size){
	this.x = x || floor(random(mapSize/cellSize))*cellSize+cellSize/2
	this.y = y || floor(random(mapSize/cellSize))*cellSize+cellSize/2
	
	this.food = 100; //saturation
	this.size = size || sporeSize
	this.life = 100;
	
	this.target = {x:this.x,y:this.y}
}
Spore.prototype.draw = function(){
	fill(255,55+this.life*2,55+this.life*2,155+this.food)
	ellipse(this.x,this.y,this.size)
}
Spore.prototype.checkMove = function(moveX,moveY){
  if(moveX > mapSize-cellSize || moveX < 0 || moveY > mapSize-cellSize || moveY < 0)
    return false;
  for(var i=0; i<spores.length;i++){
    if(moveX == spores[i].x && moveY == spores[i].y)
      return false;
  }
  return true;
}
Spore.prototype.update = function(){
  var index = floor(this.y/cellSize)*(mapSize/cellSize)+floor(this.x/cellSize)
  //console.log(floor(this.x/cellSize),floor(this.y/cellSize),(mapSize/cellSize),index)
  this.food-= 0.5;
  if(tiles[index].food < 0){
      this.food+= tiles[index].food
  }
  else if(this.food < 100){
    this.food+= 1
    tiles[index].food-= 1;
  }
  if(this.food < 0)
    this.food = 0;
  else if(this.food > 70 && this.life < 100)
    this.life++
  
  if(this.target.x > this.x)
    this.x+=cellSpeed
  else if(this.target.x < this.x)
    this.x-=cellSpeed
  if(this.target.y > this.y)
    this.y+=cellSpeed
  else if(this.target.y < this.y)
    this.y-=cellSpeed
    
  if(this.food < 1){
    this.life--;
  }
  return(this.life > 0)
}
Spore.prototype.move = function(){
  var r = floor(random()*10)
  if(r > 6 && this.checkMove(this.target.x + cellSize,this.y))
    this.target.x += cellSize
  else if(r < 4 && this.checkMove(this.target.x - cellSize,this.y))
    this.target.x -= cellSize
  r = floor(random()*10)
  if(r > 6 && this.checkMove(this.target.x,this.y - cellSize))
    this.target.y -= cellSize
  else if(r < 4 && this.checkMove(this.target.x,this.y + cellSize))
    this.target.y += cellSize
  if(!this.checkMove(this.target.x,this.target.y)){
    this.target.x = this.x
    this.target.y = this.y
  }
}