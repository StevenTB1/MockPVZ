class Zombiecontrol {
  // Initial 2D array that saves all the zombies respectively to their lane number
  static zombies = [[], [], [], [], []];
  // For drawing temporary message
  #shouldDraw = false;
  #drawTimer = 0;

  // @desc: Draw all the zombies that is in the array
  draw() {
    for (let row of Zombiecontrol.zombies) {
      // If there is something in the row array, we draw
      if (row.length > 0) {
        for (let zombie of row) {
          zombie.draw();
        }
      }
    }
    this.#drawBrain();
  }

  // @desc: update all the zombies status
  update() {
    for (let i = 0; i < Zombiecontrol.zombies.length; i++) {
      for (let j = Zombiecontrol.zombies[i].length - 1; j >= 0; j--) {
        // If healthCheck does not splice the array, go on
        if (!this.#healthCheck(Zombiecontrol.zombies[i][j], j)) {
          // If hitborder also does not slice the array, go on
          if (!this.#hitBorder(Zombiecontrol.zombies[i][j], j)) {
            // The update that does not splice the zombie array
            this.#touchPlant(Zombiecontrol.zombies[i][j]);
            Zombiecontrol.zombies[i][j].update();
          }
        }
      }
    }
  }

  // @desc: Check the zombie health and remove it if necessary
  // @param: {Object} zombie: The zombie object that is being evaluated
  // @param: {Number} index: The index of the zombie object in the array
  #healthCheck(zombie, index) {
    if (zombie.health <= 0) {
      Zombiecontrol.zombies[zombie.lane].splice(index, 1);
      return true;
    }
    return false;
  }

  // @desc: Check the zombie hits the border, and remove it if it's the case
  // @param: {Object} zombie: The zombie object that is being evaluated
  // @param: {Number} index: The index of the zombie object in the array
  #hitBorder(zombie, index) {
    if (Physics.zombieHitBorder(zombie)) {
      Zombiecontrol.zombies[zombie.lane].splice(index, 1);
      Game.getBrain += 1;
      this.#shouldDraw = true;
      return true;
    }
    return false;
  }

  // @desc: Check the zombie touches one of the plants
  // @param: {Object} zombie: The zombie object that is being evaluated
  #touchPlant(zombie) {
    // if on the zombie lane has a plant
    if (Plantcontrol.plants[zombie.lane].length > 0) {
      for (let plant of Plantcontrol.plants[zombie.lane]) {
        if (Physics.objCollision(zombie, plant)) {
          // Zombie should stop, plant get hit from zombie
          zombie.stop = true;
          plant.hitdraw = true;
          plant.health -= zombie.damage;

          // If during the collision, zombie's health is smaller than 0 (get hit)
          // Immediately ends the function and stop drawing the plant hitting status
          if (zombie.health <= 0) {
            plant.hitdraw = false;
            return;
          }
        }
        // There is something, but the zombie is not collding with it
        else {
          zombie.stop = false;
        }
      }
    }
    // If the current lane has no plants, zombie should move regardless
    else {
      zombie.stop = false;
    }
  }

  // @desc: Draw the remaining brains left
  #drawBrain() {
    // Draw the brain message for particular amount of time
    if (this.#shouldDraw && this.#drawTimer <= 300) {
      Canvas.context.save();
      Canvas.context.fillStyle = 'rgb(255, 0, 0)';
      Canvas.context.font = '50px serif';
      Canvas.context.fillText(`${Game.getBrain} / 5 brains being eaten`, 425, 350);
      Canvas.context.restore();
      this.#drawTimer++;
    } else {
      this.#shouldDraw = false;
      this.#drawTimer = 0;
    }
  }
}