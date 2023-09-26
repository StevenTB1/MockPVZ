class Sunflower extends Plant{
  static cost = 50;
  static plantCD = 480;
  
  constructor(x, y, lane){
    super(x, y, lane);
    this.health = 50;
    this.sunCD = 50;

    let img = new Image();
    img.src = './images/sunflower.jpg';
    this.image = img;
  }

  // @desc: Generate the sun every 17s
  feature(){
    if(this.sunCD >= 1020){
      // Push in a new sun into the sun array and refresh the CD
      Suncontrol.suns.push(new Sun(this.x, this.y, this));
      this.sunCD = 0;
    }else{
      this.sunCD++;
    }
    return false;
  }
}