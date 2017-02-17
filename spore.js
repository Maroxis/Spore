Spore = function(x,y,size){
	this.x = x || random(mapSize)
	this.y = y || random(mapSize)
	this.size = size || cellSize
	this.life = 255;
}
Spore.prototype.draw = function(){
	fill(255,this.life)
	ellipse(this.x,this.y,this.size)
}
Spore.prototype.update = function(){
	this.life--;
}
Spore.prototype.move = function(){
}