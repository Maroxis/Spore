Brain = function(dna){
  if(dna){
    this.inWeights = dna.inWeights;
    this.outWeights = dna.outWeights;
  }else
  this.genDna()
  
  this.inputs = [];
  this.layer = [];
  this.outputs = [0,0,0,0];
}
Brain.prototype.genDna = function(){
  this.inWeights = []
  this.outWeights = []
  
  for(var i = 0; i < 10; i++){//input number
    this.inWeights.push([])
    for(var j = 0; j < brainNodeNum; j++){ //layer number
     this.inWeights[i].push(random(-1,1))
    }
  }
  for(var i = 0; i < brainNodeNum; i++){ //layer number
    this.outWeights.push([])
    for(var j = 0; j < 6; j++){//output number
     this.outWeights[i].push(random(-1,1))
    }
  }
}
Brain.prototype.mixDna = function(dna){
  dna = {inWeights: dna.brain.inWeights,outWeights: dna.brain.outWeights}
  var newDna = {inWeights:[],outWeights:[]}
  var rSplit = floor(brainNodeNum*random())
  for(var i = 0; i < this.inputs.length; i++){//input number
    newDna.inWeights.push([])
    for(var j = 0; j < brainNodeNum; j++){ //layer number
    if(j < rSplit)
      newDna.inWeights[i].push(this.inWeights[i][j])
    else
      newDna.inWeights[i].push(dna.inWeights[i][j])
    } 
    
  }
  
  
  var rSplit = floor(6*random())
  for(var i = 0; i < brainNodeNum; i++){ //layer number
    newDna.outWeights.push([])
    for(var j = 0; j < 6; j++){//output number
    if(random() < mutChan)
      newDna.outWeights[i].push(random())
    else if(j < rSplit)
      newDna.outWeights[i].push(this.outWeights[i][j])
    else
      newDna.outWeights[i].push(dna.outWeights[i][j])
    }
  }
  
  return newDna
}
Brain.prototype.getData = function(spore){
  this.inputs = []
  
  this.inputs.push(abs(spore.facing%(PI*2)/(PI*2)))
  this.inputs.push(spore.life/100)
  this.inputs.push(spore.food > 0 ? floor(spore.food)/100 : 0)
  this.inputs.push(spore.bleeding ? 1 : 0)
  
  var ang = 0.5
  
  var x = spore.x - Math.cos(spore.facing+PI/2 - ang) * spore.size * 1.5
  var y =	spore.y - Math.sin(spore.facing+PI/2 - ang) * spore.size * 1.5
  var indx1 = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize);
  
  var x = spore.x - Math.cos(spore.facing+PI/2 - ang) * spore.size * 5
  var y =	spore.y - Math.sin(spore.facing+PI/2 - ang) * spore.size * 5
  var indx2 = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize);

  var x = spore.x - Math.cos(spore.facing+PI/2 + ang) * spore.size * 1.5
  var y =	spore.y - Math.sin(spore.facing+PI/2 + ang) * spore.size * 1.5
  var indx3 = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize);
  
  var x = spore.x - Math.cos(spore.facing+PI/2 + ang) * spore.size * 5
  var y =	spore.y - Math.sin(spore.facing+PI/2 + ang) * spore.size * 5
  var indx4 = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize);
  
  var tile1F = tiles[indx1] ? floor(tiles[indx1].food)/maxFood : 0
  var tile2F = tiles[indx2] ? floor(tiles[indx2].food)/maxFood : 0
  var tile3F = tiles[indx3] ? floor(tiles[indx3].food)/maxFood : 0
  var tile4F = tiles[indx4] ? floor(tiles[indx4].food)/maxFood : 0
  //console.log(x,y,indx1)
  this.inputs.push(tiles[spore.tileIndx] ? floor(tiles[spore.tileIndx].food)/maxFood : 0)
  this.inputs.push(tile1F)
  this.inputs.push(tile2F)
  this.inputs.push(tile3F)
  this.inputs.push(tile4F)
  
  this.inputs.push(spore.isFacing(spore.checkCollision()) ? 1 : 0)
}
Brain.prototype.calculate = function(){
  this.layer = []
  for(var i = 0; i < brainNodeNum; i++){
    this.layer[i] = 0;
  }
  ///// PART 1 -> calculate layer
  for(var j = 0; j < brainNodeNum; j++){ //number of nodes in layer
    for(var i = 0; i < this.inputs.length; i++){ //num of inp
        this.layer[j] +=  this.inputs[i]*this.inWeights[i][j]
		this.layer[j] = Math.tanh(this.layer[j])
    }
  }
  this.outputs = [0,0,0,0];
  //// PART 2 -> calculate outputs
  for(var j = 0; j < 4; j++){ //num of outp
    for(var i = 0; i < brainNodeNum; i++){ //num of nodes in layer
        this.outputs[j] +=  this.layer[i]*this.outWeights[i][j]
		this.outputs[j] = Math.tanh(this.outputs[j])
    }
  }
  ////PART 3 -> return actions
  
  var turn
	if(Math.abs(this.outputs[0]) > 0.1)
		turn = this.outputs[0]
	else
		turn = 0;

	var speed = this.outputs[1]
	var action = this.outputs[2]
	var run
		if (this.outputs[3] > 0)
			run = true
		else
			run = false;
  

  return [turn,action,speed,run]
}
/*
                      BRAIN STRUCTURE
INPUTS:             OUTPUTS:
  X                   Turn
  Y                   Speed
  LIFE                Eat/bite
  FOOD                RUN
  BLEEDING            
  TILE.FOOD
  //TILE.SPORE
  //TILE2.FOOD
  //TILE3.FOOD
  */