class SunflowerSeed extends Seed{
  // Unique planting CD for each plant
  plantingCD = Sunflower.plantCD;

  constructor(position){
    super();
    // The position of it in the seed slot
    this.position = position;
    
    let img1 = new Image();
    let img2 = new Image();
    img1.src = './images/sunflower.jpg';
    img2.src = './purchase/sunflower.jpg';
    this.image = img1;
    this.slotImage = img2;
  }

  // @desc: Setting the cooldown of the peashooter each update
  setcooldowns(){
    // If the plant is on cooldown
    if(SunflowerSeed.cooldown && this.plantingCD >= 0){
      this.plantingCD--;
    }
    // If the plant isn't on cooldown, reset the values
    else{
      SunflowerSeed.cooldown = false;
      this.plantingCD = Sunflower.plantCD;
    }
  }

  // @desc: Drawing the cooldown overlay on the seed
  drawCooldown(){
    if(SunflowerSeed.cooldown){
      let length = 130 * (this.plantingCD / Sunflower.plantCD);
      Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), length, 80);
    }
  }

  // @desc: Drawing the sun cost overlay on the seed
  sunOverlay(){
    if(Suncount.sunValue < Sunflower.cost){
      Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), 130, 80);
    }
  }

  // @desc: Draw the image of the slot
  draw(){
    Canvas.context.drawImage(this.slotImage, Seedslot.x, Seedslot.y + (85 * this.position), 130, 80);
  }
}