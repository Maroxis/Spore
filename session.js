loadSession = function(){
  spor = JSON.parse(localStorage.getItem("spores"))
 	for ( var i = 0; i < spor.length; i++){
 	  spor[i].__proto__= Spore.prototype; 
 	  spor[i].brain.__proto__ = Brain.prototype
 	}
 	spores = spor
 	
 	corp = JSON.parse(localStorage.getItem("corpses"))
 	for ( var i = 0; i < corp.length; i++){
 	  corp[i].__proto__= Corpse.prototype; 
 	}
 	corpses = corp
 	
 	til = JSON.parse(localStorage.getItem("tiles"))
 	for ( var i = 0; i < til.length; i++){
 	  til[i].__proto__= Tile.prototype; 
 	}
 	tiles = til
}
saveSession = function(){
  localStorage.setItem('spores', JSON.stringify(spores))
  localStorage.setItem('corpses', JSON.stringify(corpses))
  localStorage.setItem('tiles', JSON.stringify(tiles))
}