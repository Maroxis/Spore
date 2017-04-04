Brain = function(dna){
  if(dna){
    this.inWeights = dna.inp;
    this.outWeights = dna.out;
  }else
  this.genDna()
  
  this.inputs = [];
  this.layer = [];
  this.outputs = [0,0,0,0,0,0];
}
Brain.prototype.genDna = function(){
  this.inWeights = []
  this.outWeights = []
  
  for(var i = 0; i < 6; i++){//input number
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
  var newDna = {inWeights:[],outWeights:[]}
  var rSplit = floor(brainNodeNum*random())
  for(var i = 0; i < this.inputs.length; i++){//input number
    newDna.inWeights.push([])
    for(var j = 0; j < brainNodeNum; j++){ //layer number
    if(j < rSplit)
      newDna.inWeights[i].push(this.inWeights)
    else
      newDna.inWeights[i].push(dna.inWeights)
    }
  }
  
  var rSplit = floor(6*random())
  for(var i = 0; i < brainNodeNum; i++){ //layer number
    newDna.outWeights.push([])
    for(var j = 0; j < 6; j++){//output number
    if(random() < mutChan)
      newDna.outWeights[i].push(random())
    else if(j < rSplit)
      newDna.outWeights[i].push(this.outWeights)
    else
      newDna.outWeights[i].push(dna.outWeights)
    }
  }
  
  return newDna
}
Brain.prototype.getData = function(spore){
  this.inputs = []
  this.inputs.push(spore.x/mapSize)
  this.inputs.push(spore.y/mapSize)
  this.inputs.push(spore.life/100)
  this.inputs.push(spore.food/100)
  this.inputs.push(spore.bleeding)
  this.inputs.push(tiles[spore.tileIndx].food)
}
Brain.prototype.calculate = function(){
  this.layer = []
  for(var i = 0; i < brainNodeNum; i++){
    this.layer.push(0)
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
  var min = Math.min.apply(null, this.outputs);
  var max = Math.max.apply(null, this.outputs);
  for(var i = 0; i < 6; i++){ //num of out
    if(i < 2)
      this.outputs[i] = map(this.outputs[i],min,max,-1,1)
    else
      this.outputs[i] = map(this.outputs[i],min,max,0,1)
  }
  ////PART 3 -> return actions
  var vel = {x:this.outputs[0],y:this.outputs[1]}
  var action = []
  action.push(this.outputs[2])
  action.push(this.outputs[3])
  action.push(this.outputs[4])
  action = action.indexOf(Math.max.apply(null, action));
  var speed = this.outputs[5]
  return [vel,action,speed]
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