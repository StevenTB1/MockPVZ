class PeashooterSeed extends Seed{
  // Unique planting CD for each plant
  plantingCD = Peashooter.plantCD;
  
  constructor(position){
    super();
    // The position of it in the seed slot
    this.position = position;
    
    let img1 = new Image();
    let img2 = new Image();
    img1.src = './images/peashooter.png';
    img2.src = './purchase/peashooter.jpg';
    this.image = img1;
    this.slotImage = img2;
  }

  // @desc: Setting the cooldown of the peashooter each update
  setcooldowns(){
    // If the plant is on cooldown
    if(PeashooterSeed.cooldown && this.plantingCD >= 0){
      this.plantingCD--;
    }
    // If the plant isn't on cooldown, reset the values
    else{
      PeashooterSeed.cooldown = false;
      this.plantingCD = Peashooter.plantCD;
    }
  }

  // @desc: Drawing the cooldown overlay on the seed
  drawCooldown(){
    if(PeashooterSeed.cooldown){
      let length = 130 * (this.plantingCD / Peashooter.plantCD);
      Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), length, 80);
    }
  }

  // @desc: Drawing the sun cost overlay on the seed
  sunOverlay(){
    if(Suncount.sunValue < Peashooter.cost){
      Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), 130, 80);
    }
  }
}