Tile = function(x,y,land,fert,col){
	this.x = x
	this.y = y
	this.land = land // true/false
	this.col = col
	if(land)
	  this.food = floor((maxFood/fert)/10);
	else
	  this.food = -(5/ceil(fert*10))
	this.fertility = fert
	this.bFert = 0; //bonus fertility from corpses etc.
}
Tile.prototype.growFood = function(){
  if(this.food < maxFood){
    if(this.bFert >= 0.1){
        this.bFert -= 0.1
        this.food += 0.1
        if(this.bFert < 0.1)
          this.bFert = 0
      }
    if(this.fertility > Math.random()){
      this.food += 0.1 
    }
  }
}
Tile.prototype.genWater = function(){
  if(this.food < 0){
	  pg.getContext("2d").fillStyle="rgb("+this.col[0]+","+this.col[1]+","+this.col[2]+")"
	  pg.getContext("2d").fillRect(this.x,this.y,cellSize,cellSize)
  }
}
Tile.prototype.draw = function(){
  for(var y = 0; y < cellSize; y++){
    for(var x = 0; x < cellSize; x++){
      var index = ((x + this.x) + (y + this.y) * width) * 4;
      if(this.food >= 0){
      pixels[index] = this.col[0] - 4*this.food/5
      pixels[index +1 ] = this.col[1] - 1*this.food/5
      pixels[index +2 ] = this.col[2] - 3*this.food/5
      pixels[index +3 ] = 255
      }
    }
  }
}