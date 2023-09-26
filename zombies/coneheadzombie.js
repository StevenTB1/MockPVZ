class Coneheadzombie extends Zombie {
  // Different health from each zombie
  health = 570;
  maxHealth = 570;

  constructor() {
    super();
    this.width = 85;
    this.height = 150;

    // Getting the two stages images
    let img = new Image();
    img.src = './images/coneZombie.jpg';
    this.image = img;
  }
}