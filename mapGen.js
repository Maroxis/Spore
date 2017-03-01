var loadTerrain = (count) => {
  if(count === 0)
    return
  var yoff = 0;
  for (var y = 0; y < height; y+=cellSize) {
    var xoff = 0;
    for (var x = 0; x < width; x+=cellSize) {
      var r = noise(xoff, yoff);
      if(r > 0.5)//205,185,156
       fill(170*r+18,168*r+18,95*r+11)
      else
       fill(r*62+10,r*149+10,r*213+10)
	
	   rect(x,y,cellSize,cellSize)
      xoff += inc;
     }
     yoff += inc;
  }
  return exportTerrain()
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
