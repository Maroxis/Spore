Blood = function(x,y,size){
  this.x = x
  this.y = y
  this.size = size/5
  this.age = 128
}
Blood.prototype.draw = function(){
  fill(128,0,0,this.age)
	ellipse(this.x,this.y,this.size)
}
Blood.prototype.shrink = function(){
  this.age-=12;
  if(this.age < 12)
    splice(bloodT.indexOf(this),1)
}