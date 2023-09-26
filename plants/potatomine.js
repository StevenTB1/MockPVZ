class Potatomine extends Plant {
  static cost = 25;
  static plantCD = 1800;

  // If the potato mine should be removed
  #sproutCD = 0;

  constructor(x, y, lane) {
    super(x, y, lane);
    this.health = 40;

    let img1 = new Image();
    img1.src = './images/potatounder.png';
    this.image = img1;

    let img2 = new Image();
    img2.src = './images/potatomine.jpg';
    this.normal_image = img2;

  }

  // @desc: Checks the coliision between the zombie and the potato mine
  // @param: {Object} zombie: The zombie object being checked
  // @param: {Number} index: The index of the zombie in the zombie array
  #checkCollision(zombie, index) {
    if (Physics.objCollision(zombie, this)) {
      // Remove both the zombie and the potatomine (triggered)
      Zombiecontrol.zombies[zombie.lane].splice(index, 1);
      Plantcontrol.plants[this.lane].splice(Plantcontrol.plants[this.lane].indexOf(this), 1);
      Plantcontrol.removeBlock(this);
    }
  }

  // @desc: Check all the zombies that collide with the potato mine
  // @desc: If collided, remove the zombie and the plant itself
  feature() {
    // If the potatomine is sprouted
    if (this.#sproutCD >= 840) {
      this.image = this.normal_image;
      for (let i = Zombiecontrol.zombies[this.lane].length - 1; i >= 0; i--) {
        // If there is a collision between this plant and the zombie
        this.#checkCollision(Zombiecontrol.zombies[this.lane][i], i);
      }
    }
    // If it's not being sprouted
    else {
      this.#sproutCD++;
    }
  }
}