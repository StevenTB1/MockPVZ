class Block {
  // Initial height and width, and variable for different states
  #height = 105;
  #width = 96.67;
  isHovered = false;
  isUsed = false;

  constructor(x, y, i) {
    this.x = x + 10;
    this.y = y + 10;
    this.lane = i;
    
    this.plantAudio = new Audio('./music/plant.mp3');
    this.plantAudio.volume = 0.4;
  }

  // getters for height and width
  get width(){
    return this.#width;
  }

  get height(){
    return this.#height;
  }

  // @desc: Check if the block is being hovered over
  hoverOver() {
    // If a plant is being selected
    if (Seedslot.isSelected) {
      // When the block is being hovered
      if ((Controller.movex > this.x && Controller.movex <= this.x + this.#width) &&
        (Controller.movey > this.y && Controller.movey <= this.y + this.#height)) {
        this.isHovered = true;
        return;
      }
    }
    this.isHovered = false;
  }

  // @desc: Check if we needs to plant down a plant
  putPlant() {
    // If the current block is being hovered and not being used
    if (!this.isUsed) {
      this.isUsed = true;
      Seedslot.isSelected = false;

      // Going through all the possible seed
      for(let seed of Seedslot.seeds){
        // If this seed is selected, push in that new seed (plant it)
        if(seed.isSelected){
          let costArr = [Peashooter.cost, Sunflower.cost, Wallnut.cost, Potatomine.cost, Repeater.cost];
          // Remove the sun cost of the speed
          Suncount.sunValue -= costArr[seed.position];
          this.plantAudio.play();
          
          // Position 0: Peashooter
          if(seed.position === 0){
            Plantcontrol.plants[this.lane].push(new Peashooter(this.x, this.y, this.lane));
            PeashooterSeed.cooldown = true;
          }
            
          // Position 1: Sunflower
          else if(seed.position === 1){
            Plantcontrol.plants[this.lane].push(new Sunflower(this.x, this.y, this.lane));
            SunflowerSeed.cooldown = true;
          }

          // Position 2: Wallnut
          else if(seed.position === 2){
            Plantcontrol.plants[this.lane].push(new Wallnut(this.x, this.y, this.lane));
            WallnutSeed.cooldown = true;
          }

          // Position 3: Potato mine
          else if(seed.position === 3){
            Plantcontrol.plants[this.lane].push(new Potatomine(this.x, this.y, this.lane));
            PotatomineSeed.cooldown = true;
          }

          // Position 4: Repeater
          else if(seed.position === 4){
            Plantcontrol.plants[this.lane].push(new Repeater(this.x, this.y, this.lane));
            RepeaterSeed.cooldown = true;
          }
        }
      }
    }
  }

  // @desc: The drawing of the blocks, if nothing is on and can be selected
  draw() {
    if (this.isHovered && !this.isUsed) {
      Canvas.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
      Canvas.context.fillRect(this.x, this.y, this.#width, this.#height);
    }
  }
}