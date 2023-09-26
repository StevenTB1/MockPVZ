class PotatomineSeed extends Seed{
  // Unique planting CD for each plant
  plantingCD = Potatomine.plantCD;

  constructor(position){
    super();
    // The position of it in the seed slot
    this.position = position;
    
    let img1 = new Image();
    let img2 = new Image();
    img1.src = './images/potatomine.jpg';
    img2.src = './purchase/potatomine.jpg';
    this.image = img1;
    this.slotImage = img2;
  }

  // @desc: Setting the cooldown of the peashooter each update
  setcooldowns(){
    // If the plant is on cooldown
    if(PotatomineSeed.cooldown && this.plantingCD >= 0){
      this.plantingCD--;
    }
    // If the plant isn't on cooldown, reset the values
    else{
      PotatomineSeed.cooldown = false;
      this.plantingCD = Potatomine.plantCD;
    }
  }

  // @desc: Drawing the cooldown overlay on the seed
  drawCooldown(){
    if(PotatomineSeed.cooldown){
      let length = 130 * (this.plantingCD / Potatomine.plantCD);
      Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), length, 80);
    }
  }

  // @desc: Drawing the sun cost overlay on the seed
  sunOverlay(){
    if(Suncount.sunValue < Potatomine.cost){
      Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), 130, 80);
    }
  }

}