// Abstract Class for all plants
class Plant {
  // Hit drawing state and drawing timer
  hitdraw = false;
  #hitTimer = 0;

  constructor(x, y, lane) {
    // Slightly smaller than the actual block
    this.x = x + 15;
    this.y = y + 15;
    this.width = 66.67;
    this.height = 75;
    this.lane = lane;
  }

  // @desc: a method used on all extends classes (if not declared)
  draw() { 
    // If we need to draw the hit state of the plant
    if (this.hitdraw) {
      // During the "hitting Timer" (alternating the drawing)
      if (this.#hitTimer >= 0 && this.#hitTimer <= 30) {
        Canvas.context.save();
        Canvas.context.globalAlpha = 0.8;
        Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        Canvas.context.restore();
      }
      // During the "not-htting Timer" (alternating the drawing)
      else if (this.#hitTimer >= 31 && this.#hitTimer <= 60) {
        Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        // If it exceeds 60, set it back to 0
        if(this.#hitTimer >= 60) this.#hitTimer = 0;
      }
      this.#hitTimer++;
    }
    // Other case, normally draw the image
    else{
      Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  // @desc: a virtual method used for the individual features
  feature() {
  }

}
