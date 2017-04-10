loadSession = function(){
  
  til = JSON.parse(localStorage.getItem("tiles"))
 	for ( var i = 0; i < til.length; i++){
 	  tiles.push(new Tile())
 	  for (val in til[i]){
 	    tiles[i][val] = til[i][val]
 	  }
 	}

  spor = JSON.parse(localStorage.getItem("spores"))
 	for ( var i = 0; i < spor.length; i++){
 	  spores.push(new Spore())
   	for (val in spor[i]){
   	  if(val == 'brain'){
   	    spores[i][val] = new Brain()
   	    	for (br in spor[i][val]){
   	    	  spores[i][val][br] = spor[i][val][br]
   	    	}
   	  }else
   	    spores[i][val] = spor[i][val]
   	}
 	}

 	corp = JSON.parse(localStorage.getItem("corpses"))
 	for ( var i = 0; i < corp.length; i++){
 	  corpses.push(new Corpse())
 	  for(val in corp[i]){
 	    corpses[i][val] = corp[i][val]
 	  }
 	}
 	
}
saveSession = function(){
  localStorage.setItem('spores', JSON.stringify(spores))
  localStorage.setItem('corpses', JSON.stringify(corpses))
  localStorage.setItem('tiles', JSON.stringify(tiles))
}