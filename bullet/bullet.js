class Bullet {
  // Initial variables for a bullet
  #speed = 420 / Game.fps;
  #width = 25;
  #height = 25;
  damage = 20;

  constructor(x, y, lane) {
    this.x = x;
    this.y = y;
    this.lane = lane;

    let img = new Image();
    img.src = './images/pea.png';
    this.image = img;
  }

  // @desc: Getters that gets the bullet width and height for collision detection
  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get speed() {
    return this.#speed;
  }

  // @desc: Update the bullet x position each time interval
  update() {
    this.x += this.#speed;
  }
  
  // @desc: Draw function that draws the actual bullet on the canva
  draw() {
    Canvas.context.drawImage(this.image, this.x, this.y, this.#width, this.#height);
  }
}
