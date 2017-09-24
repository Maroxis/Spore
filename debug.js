DebugTool = function(){
  this.on = true;
  this.showFps = true;
  this.tileDeb = false;
  this.tileHov = true;
  this.sporeDeb = true;
  this.showStats = true;
  this.fps = 0;
  this.selectedTile = -1;
  this.selectedSpore = -1;
  this.exeTime = 0;
  if(this.on)
    this.gatherInfo();
}
function mouseClicked(){
  if(debugTool.on){
    if(debugTool.tileDeb){
    var indx = floor(mouseY/cellSize)*(mapSize/cellSize)+floor(mouseX/cellSize)
    if(mouseX > mapSize || mouseY > mapSize || indx == debugTool.selectedTile )
    indx = -1;
    debugTool.selectedTile = indx;
    }
    if(debugTool.sporeDeb){
      for(var i = 0; i < spores.length; i++){
        var sp = spores[i]
        var sz = sp.size/2
        if(mouseX > sp.x - sz && mouseX < sp.x + sz &&
           mouseY > sp.y - sz && mouseY < sp.y + sz){
          if(mouseX > mapSize || mouseY > mapSize || (sp.x == debugTool.selectedSpore.x && sp.y == debugTool.selectedSpore.y))
            debugTool.selectedSpore = -1
          else
            debugTool.selectedSpore = sp
        }
      }
      for(var i = 0; i < corpses.length; i++){
        var sp = corpses[i]
        var sz = sp.size/2
        if(mouseX > sp.x - sz && mouseX < sp.x + sz &&
           mouseY > sp.y - sz && mouseY < sp.y + sz){
          if(mouseX > mapSize || mouseY > mapSize || (sp.x == debugTool.selectedSpore.x && sp.y == debugTool.selectedSpore.y))
            debugTool.selectedSpore = -1
          else
            debugTool.selectedSpore = sp
        }
      }
    }
  }
}
DebugTool.prototype.benchmark = function(sec){
	var count = 0
	time = new Date().getTime()
	do{
		if(engine.fastF == 0){
			engine.fastForward(20)
			count ++
		}
		engine.update()
	}
	while(new Date().getTime() < time + (1000*sec))
	return (Math.floor(count/sec) + ' decision/sec')
}
DebugTool.prototype.gatherInfo = function(){
    if(this.showFps){
    this.fps =floor(frameRate())
    }
    if(this.tileDeb && this.selectedTile != -1){
      console.log(tiles[this.selectedTile])
    }
    if(this.sporeDeb && this.selectedSpore != -1){
      console.log(this.selectedSpore)
    }
  setTimeout(this.gatherInfo.bind(this),1000)
}
DebugTool.prototype.draw = function(){
  if(this.on){
    if(this.showFps){
    	fill(255,128)
    	textSize(32);
      text(this.fps, 10, 30) 
    }
    if(this.tileDeb && this.selectedTile >= 0){
      push()
      noFill()
      stroke(255,255,0)
      var tile = tiles[this.selectedTile]
      rect(tile.x,tile.y,cellSize,cellSize)
      pop()
    }
	if(this.tileHov){
		var ind = floor(mouseY/cellSize)*(mapSize/cellSize)+floor(mouseX/cellSize)
		if(tiles[ind]){
			var tile = tiles[ind]
			push()
			noFill()
			stroke(255,255,255)
			rect(tile.x,tile.y,cellSize,cellSize)
			textSize(cellSize*2)
			text(Math.floor(tile.food),tile.x-(cellSize/2),tile.y)
			pop()
		}
		
	}
    if(this.sporeDeb && this.selectedSpore !== -1){
      var sp = this.selectedSpore
      push()
      noFill()
      stroke(255,128,0)
      strokeWeight(2)
      translate(sp.x,sp.y)
      rotate(sp.facing)
      ellipse(0,0,sp.size*0.9,sp.size)
      // eyes
    rotate(-0.5)
			ellipse(0,-sp.size*1,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*1.5,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*2,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*3,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*5,sp.size*0.2,sp.size*0.2)
		rotate(0.5)
			ellipse(0,-sp.size*1,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*1.5,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*2,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*3,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*5,sp.size*0.2,sp.size*0.2)
			rotate(0.5)
    	ellipse(0,-sp.size*1,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*1.5,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*2,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*3,sp.size*0.2,sp.size*0.2)
    	ellipse(0,-sp.size*5,sp.size*0.2,sp.size*0.2)
    pop()
    }
    if(this.showStats){
      fill(255,128)
    	textSize(28);
    	var highGen = spores[0].generation
    	var lowGen = spores[0].generation
    	spores.forEach(function(sp){
    	  if(sp.generation > highGen)
    	    highGen = sp.generation
    	 else if(sp.generation < lowGen)
    	    lowGen = sp.generation
    	})
      text(`Top Gen: ${highGen}   Low Gen: ${lowGen}`, 60, 30) 
    }
  }
}