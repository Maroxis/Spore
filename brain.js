Brain = function(dna){
  this.inputs = [];
  this.inWeights = dna.inp;
  this.layer = [0,0,0,0,0,0,0,0,0,0];
  this.outWeights= dna.out;
  this.output = [0,0,0,0,0,0];
}
Brain.prototype.getData = function(spore){
  this.inputs = []
  this.inputs.push(spore.x/mapSize)
  this.inputs.push(spore.y/mapSize)
  this.inputs.push(spore.life/100)
  this.inputs.push(spore.food/100)
  this.inputs.push(spore.bleeding)
  this.inputs.push(tiles[spore.tileIndx].food)
  this.inWeights = spore.dna.inp
  this.outweights = spore.dna.out
}
Brain.prototype.calculate = function(){
  this.layer = [0,0,0,0,0,0,0,0,0,0];
  ///// PART 1 -> calculate layer
  for(var j = 0; j < 10; j++){ //number of nodes in layer
    for(var i = 0; i < 6; i++){ //num of inp
        this.layer[j] +=  this.inputs[i]*this.inWeights[i][j]
    }
  }
  var min = Math.min.apply(null, this.layer);
  var max = Math.max.apply(null, this.layer);
  for(var i = 0; i < 10; i++){ //num of inp
        this.layer[i] = map(this.layer[i],min,max,0,1)
  } 
  this.output = [0,0,0,0,0,0];
  //// PART 2 -> calculate outputs
  for(var j = 0; j < 6; j++){ //num of outp
    for(var i = 0; i < 10; i++){ //num of nodes in layer
        this.output[j] +=  this.layer[i]*this.outWeights[i][j]
    }
  }
  var min = Math.min.apply(null, this.output);
  var max = Math.max.apply(null, this.output);
  for(var i = 0; i < 6; i++){ //num of out
    if(i < 2)
      this.output[i] = map(this.output[i],min,max,-1,1)
    else
      this.output[i] = map(this.output[i],min,max,0,1)
  }
  ////PART 3 -> return actions
  var vel = {x:this.output[0],y:this.output[1]}
  var action = []
  action.push(this.output[2])
  action.push(this.output[3])
  action.push(this.output[4])
  action = action.indexOf(Math.max.apply(null, action));
  var speed = this.output[5]
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