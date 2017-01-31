var growFood = () => {
  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++) {
      var a = noise(xoff, yoff);
      var index = (x + y * width)*4;
      if(a > 0.5  && pixels[index + 1] - pixels[index + 0]  < maxFood){
        var r = random()
        if (r > a)
          pixels[index + 1] += 1 
      }
      xoff += inc;
     }
     yoff += inc;
  }
  updatePixels();
  console.log(pixels[1]-pixels[0])
  setTimeout(growFood,(1000/foodGrowRate))
}