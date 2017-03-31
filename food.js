var growFood = () => {
  var yoff = 0;
  for (var y = 0; y < height/cellSize; y++) {
    var xoff = 0;
    for (var x = 0; x < width/cellSize; x++) {
      var a = noise(xoff, yoff);
      var index = ((x + y*(width/cellSize))*3)
      if(a > 0.5  && terrain[index + 1] - terrain[index + 0]  < maxFood){
        var r = random()
        if (r > a)
          terrain[index + 1] += 2
      }
      xoff += inc;
     }
     yoff += inc;
  }
  console.log(terrain[1]-terrain[0])
  setTimeout(growFood,(1000/foodGrowRate))
}