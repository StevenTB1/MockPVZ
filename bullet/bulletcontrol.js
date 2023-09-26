class Bulletcontrol {
  // The array that stores all the bullets
  static bullets = [[], [], [], [], []];

  // initiate some audios
  constructor() {
    this.hitAudio = new Audio('./music/hit.mp3');
    this.plasticHit = new Audio('./music/plastic.mp3');
    this.bucketHit = new Audio('./music/bucket.mp3');
  }

  // @desc: Update all the bullets' status
  update() {
    for (let i = 0; i < Bulletcontrol.bullets.length; i++) {
      for (let j = Bulletcontrol.bullets[i].length - 1; j >= 0; j--) {
        // Update the bullet first before splicing it
        Bulletcontrol.bullets[i][j].update();
        // If we splice the bullet, no reason to check the next method
        if (!this.#touchBorder(Bulletcontrol.bullets[i][j], j)) {
          this.#touchZombie(Bulletcontrol.bullets[i][j], j);
        }
      }
    }
  }

  // @desc: draw all the bullets inside the array
  draw() {
    for (let i = 0; i < Bulletcontrol.bullets.length; i++) {
      for (let j = Bulletcontrol.bullets[i].length - 1; j >= 0; j--) {
        Bulletcontrol.bullets[i][j].draw();
      }
    }
  }

  // @desc: Remove the bullet from the bullet array if it hits the border
  // @param: {object} bullet: The bullet object
  // @param: {Number} index: The index where the bullet object is at
  #touchBorder(bullet, index) {
    if (Physics.bulletHitBorder(bullet)) {
      Bulletcontrol.bullets[bullet.lane].splice(index, 1);
      // splice the array, return true
      return true;
    }
    return false;
  }

  // @desc: Detects if the bullet hit the zombie, if it does, remove health
  // @param: {object} bullet: The bullet object
  // @param: {Number} index: The index where the bullet object is at
  #touchZombie(bullet, i) {
    // If the current lane DOES have a zombie
    if (Zombiecontrol.zombies[bullet.lane].length > 0) {
      // For every zombie inside THAT lane array
      for (let zombie of Zombiecontrol.zombies[bullet.lane]) {
        // Check collisions
        if (Physics.objCollision(bullet, zombie)) {

          this.#playHitAudio(zombie);
          zombie.health -= bullet.damage;
          zombie.hitdraw = true;
          // Remove this bullet from the bullet array of this lane
          Bulletcontrol.bullets[bullet.lane].splice(i, 1);
        }
      }
    }
  }

  // @desc: Play the audio of pea hitting based on different zombie type
  // @param: {object} zombie: The zombie object
  #playHitAudio(zombie) {
    if (zombie.maxHealth === 570) {
      this.plasticHit.cloneNode(true).volume = 0.4;
      this.plasticHit.cloneNode(true).play();
    }

    else if (zombie.maxHealth === 1300) {
      this.bucketHit.cloneNode(true).volume = 0.4;
      this.bucketHit.cloneNode(true).play();
    }

    else {
      this.hitAudio.cloneNode(true).volume = 0.4;
      this.hitAudio.cloneNode(true).play();
    }
  }
}
