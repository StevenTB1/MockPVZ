class Wallnut extends Plant{
  static cost = 50;
  static plantCD = 1800;
  
  constructor(x, y, lane){
    super(x, y, lane);
    this.health = 2000;

    // Four stages of the wallnut
    let img1 = new Image();
    img1.src = './images/wallnut/wallnut1.png';
    this.image = img1;

    let img2 = new Image();
    img2.src = './images/wallnut/wallnut2.png';
    this.stage1Image = img2;

    let img3 = new Image();
    img3.src = './images/wallnut/wallnut3.png';
    this.stage2Image = img3;

    let img4 = new Image();
    img4.src = './images/wallnut/wallnut4.png';
    this.stage3Image = img4;  
  }

  // @desc: Based on the current health of the wallnut, draw different images
  feature(){
    if(this.health <= 1500 && this.health > 1000){
      this.image = this.stage1Image;
    }else if(this.health <= 1000 && this.health > 500){
      this.image = this.stage2Image;
    }else if(this.health <= 500){
      this.image = this.stage3Image;
    }
    return false;
  }
}