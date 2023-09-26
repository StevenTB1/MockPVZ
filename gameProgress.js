class GameProgress {
  #levelTimer = 0;
  #pauseTimer = 0;

  // getters of the two timers
  get levelTimer(){
    return this.#levelTimer;
  }

  get pauseTimer(){
    return this.#pauseTimer;
  }

  set levelTimer(value){
    this.#levelTimer += value;
  }

  // @desc: Updating the level timer if:
  // @desc: Hasn't reach the last wave, and excludes the pausing time
  update() {
    if (this.#levelTimer <= 16200 && this.#pauseTimer < 1) {
      this.#levelTimer++;
    } else if (this.#levelTimer > 16200 && this.#pauseTimer <= 600 && Game.checkZombieArray()) {
      this.#pauseTimer++;
    }
  }

  // @desc: Drawing depends on the various situation
  draw() {
    this.#drawLevelBar();
    this.#drawLastWaveMsg();
  }

  // @desc: Drawing the level bar of the current level
  #drawLevelBar() {
    // Unfilled part
    Canvas.context.fillStyle = 'rgb(207, 212, 208)';
    Canvas.context.fillRect(1000, 680, 250, 25);
    // Filling part
    Canvas.context.fillStyle = 'rgb(47, 138, 235)';
    Canvas.context.fillRect(1000, 680, 250 * (this.#levelTimer / 18000), 25);
    // Marking the last wave part
    Canvas.context.fillStyle = 'rgb(255, 0, 0)';
    Canvas.context.fillRect(1225, 680, 5, 25);
    Canvas.context.strokeRect(1000, 680, 250, 25);
    // Draw the text that shows the intervals
    Canvas.context.fillStyle = 'rgb(0, 0, 0)';
    Canvas.context.font = '23px serif';
    Canvas.context.fillText(`Time: ${Math.round(this.#levelTimer / 60)}s / 300s`, 1050, 700);
  }

  // @desc: Draw the last wave message before it comes
  #drawLastWaveMsg() {
    if (this.#levelTimer >= 16200 && this.#pauseTimer <= 600) {
      Canvas.context.fillStyle = 'rgb(255, 0, 0)';
      Canvas.context.font = '50px serif';
      Canvas.context.fillText(`LAST WAVE INCOMING`, 400, 300);
    }
  }
}