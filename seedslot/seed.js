// Abstract Class for all the individual seed slots
class Seed{
  // Static and public variables for state that is used for checking
  static cooldown = true;
  isSelected = false;

  // Set the cooldown of the plants if needed
  setcooldowns(){
    
  }

  // Draw the cooldown bar of the plants
  drawcooldown(){
    
  }

  // Draw the overlay if there is not enough sun
  sunOverlay(){
    
  }

  // @desc: Drawing the selection overlay on the seed
  drawSelection(){
    Canvas.context.save();
    Canvas.context.globalAlpha = 0.5;
    Canvas.context.fillRect(Seedslot.x, Seedslot.y + (85 * this.position), 130, 80);
    Canvas.context.drawImage(this.image, Controller.movex - 40, Controller.movey - 40, 66.67, 75);
    Canvas.context.restore();
  }

  // @desc: Draw the image of the slot
  draw(){
    Canvas.context.drawImage(this.slotImage, Seedslot.x, Seedslot.y + (85 * this.position), 130, 80);
  }
  
}
