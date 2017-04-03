Blood = function(x,y,size){
  this.x = x
  this.y = y
  this.size = size*random(0.2,0.4)
  this.age = 96
}
Blood.prototype.draw = function(){
  fill(128,0,0,this.age)
  ellipse(this.x,this.y,this.size)
}
Blood.prototype.shrink = function(){
  this.age-=4;
  return(this.age <= 24)
}