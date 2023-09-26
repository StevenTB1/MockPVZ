class Bucketzombie extends Coneheadzombie {
  // Different health from each zombie
  health = 1300;
  maxHealth = 1300;

  constructor() {
    super();
    this.width = 85;
    this.height = 150;

    // Getting the two stages images
    let img = new Image();
    img.src = './images/bucketzombie.jpg';
    this.image = img;
  }
}
