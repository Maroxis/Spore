var loadTerrain = function(){
  var yoff = 0;
  for (var y = 0; y < height; y+=cellSize) {
    var xoff = 0;
    for (var x = 0; x < width; x+=cellSize) {
      var r = noise(xoff, yoff);
      
      if(r > 0.5){
       var colors = [floor(170*r+18),floor(168*r+18),floor(95*r+11)]
       tiles.push(new Tile(x,y,true,r,[colors[0],colors[1],colors[2]]))
      }
      else{
        var colors = [floor(r*62+10),floor(r*149+10),floor(r*213+10)]
	     tiles.push(new Tile(x,y,false,r,[colors[0],colors[1],colors[2]]))
      }
      xoff += inc;
     }
     yoff += inc;
  }
}
