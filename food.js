var growFood = function(){
  for(var i = 0; i < tiles.length; i++){
    if(tiles[i].land && tiles[i].food < maxFood && tiles[i].fertility > Math.random())
      tiles[i].food += 0.2
  }
  //console.log(tiles[0])
  setTimeout(growFood,(1000/foodGrowRate))
}