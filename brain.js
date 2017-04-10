Brain = function(dna){
  if(dna){
    this.inWeights = dna.inWeights;
    this.outWeights = dna.outWeights;
  }else
  this.genDna()
  
  this.inputs = [];
  this.layer = [];
  this.outputs = [0,0,0,0,0,0];
}
Brain.prototype.genDna = function(){
  this.inWeights = []
  this.outWeights = []
  
  for(var i = 0; i < 8; i++){//input number
    this.inWeights.push([])
    for(var j = 0; j < brainNodeNum; j++){ //layer number
     this.inWeights[i].push(random())
    }
  }
  for(var i = 0; i < brainNodeNum; i++){ //layer number
    this.outWeights.push([])
    for(var j = 0; j < 6; j++){//output number
     this.outWeights[i].push(random())
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
  this.inputs.push(spore.food/100)
  this.inputs.push(spore.bleeding)
  
  var ang = 0.5
  
  var x = spore.x - Math.cos(spore.facing+PI/2 - ang) * spore.size * 1.5
  var y =	spore.y - Math.sin(spore.facing+PI/2 - ang) * spore.size * 1.5
  var indx1 = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize);

  var x = spore.x - Math.cos(spore.facing+PI/2 + ang) * spore.size * 1.5
  var y =	spore.y - Math.sin(spore.facing+PI/2 + ang) * spore.size * 1.5
  var indx2 = floor(y/cellSize)*(mapSize/cellSize)+floor(x/cellSize);
  
  var tile1F = tiles[indx1] ? tiles[indx1].food/100 : 0
  var tile2F = tiles[indx2] ? tiles[indx2].food/100 : 0
  //console.log(x,y,indx1)
  this.inputs.push(tiles[spore.tileIndx].food/100)
  this.inputs.push(tile1F)
  this.inputs.push(tile2F)
  
  this.inputs.push(spore.isFacing(spore.checkCollision()))
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
    }
  }
  var min = Math.min.apply(null, this.layer);
  var max = Math.max.apply(null, this.layer);
  for(var i = 0; i < brainNodeNum; i++){
        this.layer[i] = map(this.layer[i],min,max,0,1)
  } 
  this.outputs = [0,0,0,0,0,0];
  //// PART 2 -> calculate outputs
  for(var j = 0; j < 6; j++){ //num of outp
    for(var i = 0; i < brainNodeNum; i++){ //num of nodes in layer
        this.outputs[j] +=  this.layer[i]*this.outWeights[i][j]
    }
  }
  var min = Math.min.apply(null, this.outputs)*0.9;
  var max = Math.max.apply(null, this.outputs)*1.1;
  for(var i = 0; i < 6; i++){ //num of out
      this.outputs[i] = map(this.outputs[i],min,max,0,1)
  }
  ////PART 3 -> return actions
  
  var turn
  if(this.outputs[0] > this.outputs[1] && this.outputs[0] > 0.5 )
    turn = -0.1
  else if(this.outputs[1] > 0.5)
    turn = 0.1
  else
    turn = 0;
    
  var action = []
  action.push(this.outputs[2])
  action.push(this.outputs[3])
  action.push(this.outputs[4])
  action = action.indexOf(Math.max.apply(null, action));
  
  var speed = this.outputs[5]
  
  return [turn,action,speed]
}
/*
                      BRAIN STRUCTURE
INPUTS:             OUTPUTS:
  X                   VELX VelY
  Y                   EAT
  LIFE                BITE
  FOOD                RUN
  BLEEDING            SPEED
  TILE.FOOD
  //TILE.SPORE
  //TILE2.FOOD
  //TILE3.FOOD
  */