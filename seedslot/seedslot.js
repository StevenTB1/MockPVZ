class Seedslot {
  // Static variable for the big seed slot
  static width = 130;
  static height = 550;
  static x = 10;
  static y = 125;
  static isSelected = false;

  // The array contains all the seed sub classes
  static seeds = [];

  constructor(){
    // Push in and create the seed slots when created
    Seedslot.seeds = 
      [new PeashooterSeed(0), new SunflowerSeed(1), new WallnutSeed(2), new PotatomineSeed(3), new RepeaterSeed(4)];
  }

  // @desc: Update all the seed slots (update the cooldown of the slots)
  update(){
    for(let seed of Seedslot.seeds){
      seed.setcooldowns();
    }
  }

  // @desc: Draw the seed slots
  draw() {
    Canvas.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    
     // Loop through each seed and call their respective draw functions
    for(let seed of Seedslot.seeds){
      seed.draw();   
      seed.drawCooldown();
      seed.sunOverlay();

      // If there is a seed being selected, draw out that seed selection
      if(Seedslot.isSelected && seed.isSelected){
        seed.drawSelection();
      }   
    }    
  }

  // A sttaic method that determines which plant is being choosed eventually
  // Can selected a plant based on:
  
    // 1. In the right position
    // 2. Has enough sun to cover the cost
    // 3. The seed is not on cooldown
  static choosePlants() {
    let selectNum;
    // Area of pea shooter
    if (Controller.clicky > Seedslot.y && Controller.clicky <= Seedslot.y + 80 &&
      Suncount.sunValue >= Peashooter.cost && PeashooterSeed.cooldown === false) {
      Seedslot.isSelected = true;
      selectNum = 0;
    }
      
    // Area of the sunflower
    else if (Controller.clicky > Seedslot.y + 85 && Controller.clicky <= Seedslot.y + 165 && Suncount.sunValue >= Sunflower.cost && SunflowerSeed.cooldown === false) {
      Seedslot.isSelected = true;
      selectNum = 1;
    }

    // Area of the wallnut
    else if (Controller.clicky > Seedslot.y + 170 && Controller.clicky <= Seedslot.y + 250 && Suncount.sunValue >= Wallnut.cost && WallnutSeed.cooldown === false) {
      Seedslot.isSelected = true;
      selectNum = 2;
    }

    // Area of the Potato Mine
    else if (Controller.clicky > Seedslot.y + 255 && Controller.clicky <= Seedslot.y + 335 && Suncount.sunValue >= Potatomine.cost && PotatomineSeed.cooldown === false) {
      Seedslot.isSelected = true;
      selectNum = 3;  
    }

    // Area of the Repeater
    else if (Controller.clicky > Seedslot.y + 340 && Controller.clicky <= Seedslot.y + 420 && Suncount.sunValue >= Repeater.cost && RepeaterSeed.cooldown === false) {
      Seedslot.isSelected = true;
      selectNum = 4;  
    }

    // Set the current seed selection to be true, others to be false
    for(let i = 0; i < Seedslot.seeds.length; i++){
      if(i === selectNum) Seedslot.seeds[i].isSelected = true;
      else Seedslot.seeds[i].isSelected = false;
    }

  }
}