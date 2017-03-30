Corpse = function(x,y,size,food){
  this.x = x;
  this.y = y
  this.size = size
  this.food = food + 10;
}
Corpse.prototype.draw =function(){
  fill(128,0,0,140 + this.food)
  ellipse(this.x,this.y,this.size)
}