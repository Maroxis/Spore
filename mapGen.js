var loadNoise = () => {
  var yoff = 0;
  for (var y = 0; y < height; y+=cellSize) {
    var xoff = 0;
    for (var x = 0; x < width; x+=cellSize) {  
      var r = 60 + noise(xoff, yoff) * 80;
	  fill(r)
	  rect(x,y,cellSize,cellSize)
      xoff += inc;
     }
     yoff += inc;
   }
  loadTerrain(3)
  return exportTerrain()
}
var loadTerrain = (count) => {
  if(count === 0)
    return
  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y+=cellSize) {
    var xoff = 0;
    for (var x = 0; x < width; x+=cellSize) {
      var r = noise(xoff, yoff);
      var col1 = pixels[(x+y*height)*4] 
	  var col2 = pixels[(x+y*height)*4 +1]
	  var col3 = pixels[(x+y*height)*4 +2]
      if(r > 0.5)//205,185,156
       fill(col1+2,col2+4,col3+1)
      else
       fill(col1,col2,col3+8) 
	
	   rect(x,y,cellSize,cellSize)
      xoff += inc;
     }
     yoff += inc;
  }
  loadTerrain(count-1)
}
var exportTerrain = () => {
  loadPixels();
  var map = []
  for (var y = 0; y < height; y+=cellSize) {
    for (var x = 0; x < width; x+=cellSize) {
		var index = (x + y * width) * 4;
		map.push(pixels[index])
		map.push(pixels[index+1])
		map.push(pixels[index+2])
	}
  }
	return map
}
