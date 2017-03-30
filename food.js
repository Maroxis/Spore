var growFood = function(){
  for(var i = 0; i < tiles.length; i++){
    if(tiles[i].land && tiles[i].food < maxFood && tiles[i].fertility > Math.random()){
      tiles[i].food += 0.1 + tiles[i].bFert
      if(tiles[i].bFert > 0){
        tiles[i].bFert -= 0.01
      if(tiles[i].bFert < 0)
        tiles[i].bFert = 0
      }
    }
  }
  //console.log(tiles[0])
  setTimeout(growFood,(1000/foodGrowRate))
}