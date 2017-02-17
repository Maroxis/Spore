var growFood = () => {
  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y+=cellSize) {
    var xoff = 0;
    for (var x = 0; x < width; x+=cellSize) {
      var a = noise(xoff, yoff);
      var index = (x + y * width)*4;
      if(a > 0.5  && pixels[index + 1] - pixels[index + 0]  < maxFood){
        var r = random()
        if (r > a){
          fill(pixels[index],pixels[index + 1]+2,pixels[index + 2]) 
		  rect(x,y,cellSize,cellSize)
		}
      }
      xoff += inc;
     }
     yoff += inc;
  }
  console.log(pixels[1]-pixels[0])
  setTimeout(growFood,(1000/foodGrowRate))
}