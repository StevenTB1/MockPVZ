class Plantcontrol {
  // A 2D array that saves the plants in respect to their lanes
  static plants = [[], [], [], [], []];

  // @desc: draw all the plants on the blocks
  draw() {
    for(let i = 0; i < Plantcontrol.plants.length; i++){
      for(let j = Plantcontrol.plants[i].length - 1; j >= 0; j--){
        Plantcontrol.plants[i][j].draw();
      }
    }
  }

  // @desc: Update all the plants' status
  update() {
    for(let i = 0; i < Plantcontrol.plants.length; i++){
      for(let j = Plantcontrol.plants[i].length - 1; j >= 0; j--){
        // 
        if(!this.#removePlant(Plantcontrol.plants[i][j], j)){
          Plantcontrol.plants[i][j].feature();
        }
      }
    }
  }

  // @desc: remove the plant if its health is lower than 0
  // @param: {Object} plant: The plant object being evaluated
  // @param: {Number} index: The number where the plant object is at in the row array
  #removePlant(plant, index) {
    if (plant.health <= 0) {
      // Remove the "isUsed" status on the block being planted
      Plantcontrol.removeBlock(plant);
      Plantcontrol.plants[plant.lane].splice(index, 1);
      return true;
    }
    return false;
  }

  // @desc: Remove the plant on the block's position
  // @param: {Object} plant: The plant object being evaluated
  static removeBlock(plant) {
    let colNum = Math.floor((plant.x - 180) / 116.67);
    Blockcontrol.blocks[plant.lane][colNum].isUsed = false;
  }

}