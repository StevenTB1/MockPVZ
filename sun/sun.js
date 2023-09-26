class Sun {
  #width = 75;
  #height = 75;
  #value = 25;
  disappearCD = 0;
  
  constructor(x, y, flower){
    this.x = x + 40;
    this.y = y + 40;
    this.sunflower = flower;
    
    let img = new Image();
    img.src = './images/sun.png';
    this.image = img;

    this.collectSun = new Audio('./music/sun.mp3');
    this.collectSun.volume = 0.4;
  }
  // getters for private variables
  get width(){
    return this.#width;
  }

  get height(){
    return this.#height;
  }

  get value(){
    return this.#value;
  }

  // @desc: Draw the sun image
  draw(){
    Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // @desc: Update the disappear timer of the sun
  update(){
    // Not being clicked in a certain time, it disappear
    if(this.disappearCD >= 400){
      Suncontrol.removeSun(this);
      // reset the sunflower generate CD
      this.sunflower.sunCD = 0;
    }else{
      this.disappearCD++;
    }
  }

  // @desc: Detect if the click happens within the area of the sun
  detectClick(){
    if(Controller.clickx > this.x && Controller.clickx <= this.x + this.width &&
       Controller.clicky > this.y && Controller.clicky <= this.y + this.height){
      // Add the sunvalue to the suncount and remove this sun
      Suncount.sunValue += this.value;
      this.collectSun.play();
      Suncontrol.removeSun(this);
    }
  }
  
}