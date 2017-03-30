Tile = function(x,y,land,fert,col){
	this.x = x
	this.y = y
	this.land = land // true/false
	this.col = col
	if(land)
	  this.food = floor((maxFood/fert)/4);
	else
	  this.food = -(5/ceil(fert*10))
	this.fertility = fert
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
      else{
        pixels[index] = this.col[0]
        pixels[index +1 ] = this.col[1]
        pixels[index +2 ] = this.col[2]
        pixels[index +3 ] = 255
      }
    }
  }
}