class Map {
  // For creating the falling sun
  #sunTimer = 0;

  constructor(){
    let img = new Image();
    img.src = './images/background.jpg';
    this.image = img;
  }
  
  // Getters and Setters for restting the timer
  get sunTimer(){
    return this.#sunTimer;
  }
  
  set sunTimer(value){
    this.#sunTimer = value;
  }


  // @desc: Draw the background each update
  draw() {
    Canvas.context.drawImage(this.image, 0, 0, Canvas.width, Canvas.height);
  }

  // @desc: Update the falling sun timer
  update(){
    if(this.#sunTimer >= 480){
      this.#sunTimer = 0;
      Suncontrol.suns.push(new Fallingsun());
    }
    this.#sunTimer++;
  }
}