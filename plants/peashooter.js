class Peashooter extends Plant {
  static cost = 100;
  static plantCD = 480;
  // Determines if the peashooter should fire
  shootState = false;

  constructor(x, y, lane) {
    super(x, y, lane);
    this.health = 100;
    this.bulletCD = 0;
    let img = new Image();
    img.src = './images/peashooter.png';
    this.image = img;
  }

  // @desc: Check if the peashooter should shoot, and shoot respectively
  feature() {
    // Check the state before shooting the bullet
    this.checkstate();

    // If we need to shoot the bullet
    if (this.shootState) {
      // For a certain CD, push a new bullet into the controller
      if (this.bulletCD >= 90) {
        let temp = new Bullet(this.x + 80, this.y + 10, this.lane);
        Bulletcontrol.bullets[this.lane].push(temp);
        this.bulletCD = 0;
      }
      // If it hasn't reach the CD yet, add the CD by 1
      else {
        this.bulletCD++;
      }
    }
    return false;
  }

  // @desc: Check if there is a zomebie at the same lane as the plant
  checkstate() {
    // If on the plant's lane has zombie
    if(Zombiecontrol.zombies[this.lane].length > 0){
      // We should fire, other case, we should not
      this.shootState = true;
    }else{
      this.shootState = false;
    }
  }
}