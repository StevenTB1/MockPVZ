class Repeater extends Peashooter {
  static cost = 200;

  constructor(x, y, lane) {
    super(x, y, lane);
    this.health = 100;
    this.bulletCD = 50;

    let img = new Image();
    img.src = './images/repeater.png';
    this.image = img;
  }

  // @desc: Check if the repeater should shoot, and shoot respectively
  feature() {
    // Check the state before shooting the bullet
    this.checkstate();
    if (this.shootState) {
      // For a certain CD, push two new bullets into the bullet controller
      if (this.bulletCD >= 90) {
        // What is different is that REPEATER pushes in two 
        let temp1 = new Bullet(this.x + 80, this.y + 10, this.lane);
        let temp2 = new Bullet(this.x + 110, this.y + 10, this.lane);
        Bulletcontrol.bullets[this.lane].push(temp1);
        Bulletcontrol.bullets[this.lane].push(temp2);
        this.bulletCD = 0;
      }
      else {
        this.bulletCD++;
      }
    }
    return false;
  }
  
}