// The abstract class used for all zombies
class Zombie {
  // Initial damage and movement speed
  #damage = 20 / Game.fps;
  #speed = 15 / Game.fps;
  #hitTimer = 0;
  hitdraw = false;
  stop = false;

  constructor() {
    // randomly generate a lane number for the zombie
    let laneNum = Game.randomNum(1, 5);
    this.lane = laneNum - 1;
    this.width = 90;
    this.height = 144;
    // x on the right side of the canva when started
    this.x = 1250;
    this.y = (80 + laneNum * 125) - this.height;
  }

  // Getters that gets the private variables
  get damage() {
    return this.#damage;
  }

  get speed() {
    return this.#speed;
  }
  
  // @desc: Update the zombie movement (stop) and update the timer of drawing hit status
  update() {
    if (!this.stop) this.x -= this.#speed;
    this.hitdrawTimer();
  }

  // @desc: Inherited drawing method for all the subclasses of zombies
  draw() {
    Canvas.context.strokeStyle = 'rgba(0, 0, 0)';
    
    // @desc: Draw a healthbar of the zombie above the zombie image
    Canvas.context.fillStyle = 'rgba(242, 41, 41)';
    Canvas.context.fillRect(this.x, this.y - 15, this.width * (this.health / this.maxHealth), 10);
    Canvas.context.strokeRect(this.x, this.y - 15, this.width * (this.health / this.maxHealth), 10);
    
    // @desc: Call the draw hit status to draw if necessary
    this.drawHitStatus();
  }

  // @desc: Determine the drawing if the zombie is being hit
  hitdrawTimer() {
    // If we need to draw the hitting drawing
    if (this.hitdraw) {
      // If it goes over an amount, we stop drawing it
      if (this.#hitTimer >= 8){
        this.hitdraw = false;
        this.#hitTimer = 0;
      }
      else {
        this.#hitTimer++;
      }
    }
  }

  // @desc: Drawing the hit status of the zombie, if necessary
  drawHitStatus() {
    if (this.hitdraw) {
      Canvas.context.save();
      Canvas.context.globalAlpha = 0.8;
      Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      Canvas.context.restore();
    } else {
      Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}