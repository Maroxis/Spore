var loadNoise = () => {
  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 192;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
      xoff += inc;
     }
     yoff += inc;
   }
  updatePixels();
  loadTerrain(4)
}
var loadTerrain = (count) => {
  if(count === 0)
    return
  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++) {
      var r = noise(xoff, yoff);
      var index = (x + y * width)*4;
      
      if(r > 0.5){//205,185,156
        pixels[index + 0] += r*185*0.01;
        pixels[index + 1] += r*185*0.01;
        pixels[index + 2] += r*156*0.01;
      }
      else
        pixels[index + 2] += 32-r*28;
      xoff += inc;
     }
     yoff += inc;
  }
  updatePixels();

  loadTerrain(count-1)
}
