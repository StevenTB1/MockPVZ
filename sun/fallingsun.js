class Fallingsun extends Sun{
  // Initial variable of the falling sun
  #fallingSpeed = 120 / Game.fps;
  
  constructor(){
    super();

    // Randomly generate its random x and y value (y initially is above canva)
    this.x = Game.randomNum(180, 1230 - this.width);
    this.y = -100;
    this.finaly = Game.randomNum(80, 690 - this.height);

    let img = new Image();
    img.src = './images/sun.png';
    this.image = img;
  }

  // @desc: Update the falling sun position
  update(){
    // If it hasn't reach the final position yet, update the speed
    if(this.y < this.finaly){
      this.y += this.#fallingSpeed;
    }
    // If it reaches the final position, start the disappear timer
    else{
      this.disappearCD++;
      if(this.disappearCD >= 400){
        Suncontrol.removeSun(this);
      }
    }
  }
}
