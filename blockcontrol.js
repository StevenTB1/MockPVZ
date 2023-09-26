class Blockcontrol {
  // Each blocks' height and width
  #height = 125;
  #width = 116.67;

  // An 2D array that saves all the block inside
  static blocks = [];

  constructor() {
    // Set up the blocks with their x and y values
    for (let i = 0; i < 5; i++) {
      // Creating and initializing the 2d array
      Blockcontrol.blocks[i] = [];
      
      for (let j = 0; j < 9; j++) {
        // Actually pushing in individual blocks inside the array
        Blockcontrol.blocks[i].push(new Block(180 + this.#width * j, 80 + this.#height * i, i));
      }
    }
    
  }

  // @desc: drawing method of all the blocks, if necessary
  draw(){
    for (let i = 0; i < Blockcontrol.blocks.length; i++) {
      for (let j = 0; j < Blockcontrol.blocks[i].length; j++) {
        Blockcontrol.blocks[i][j].draw();
      }
    }
  }

  // @desc: Update the status of all blocks (for hovering)
  update() {
    for (let i = 0; i < Blockcontrol.blocks.length; i++) {
      for (let j = 0; j < Blockcontrol.blocks[i].length; j++) {
        Blockcontrol.blocks[i][j].hoverOver();
      }
    }
  }
}