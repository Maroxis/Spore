Corpse = function(x,y,size,food,facing){
  this.x = x;
  this.y = y
  this.size = size
  this.food = food + 10;
  this.tileIndx = this.getTiles()
  this.facing = facing
  this.alive = false;
}
Corpse.prototype.getTiles = function(){
  var indx = floor(this.y/cellSize)*(cellNum)+floor(this.x/cellSize)
  var til = []
  til.push(indx)
  var y = this.y%cellSize
  if(y < this.size && tiles[indx+cellNum] && tiles[indx+cellNum].land ){
    til.push(indx+cellNum)
  }
  if(y > cellSize-this.size && tiles[indx-cellNum] && tiles[indx-cellNum].land)
    til.push(indx-cellNum)
    
  var x = this.x%cellSize
  if(x < this.size && tiles[indx-1] && tiles[indx-1].land)
    til.push(indx-1)
  if(x > cellSize-this.size && tiles[indx+1] && tiles[indx+1].land)
    til.push(indx+1)
    
  return til
}

Corpse.prototype.draw =function(){
  push()
  translate(this.x,this.y)
  rotate(this.facing)//
	fill(128,floor(100/ceil(this.food)),0,55 + this.food*2)
	ellipse(0,0,this.size*0.9,this.size)
	fill(16,16,16,55 + this.food*2)
	ellipse(0,-this.size/5,this.size/2,this.size/3)
	pop()
}
Corpse.prototype.decay = function(){
  for(var i = 0; i < this.tileIndx.length;i++){
    this.food-=0.5;
    tiles[this.tileIndx[i]].bFert += 0.5;
    if(this.food <= 0){
      corpses.splice(corpses.indexOf(this),1);
      engine.makeSpore()
      return
    }
  }
}