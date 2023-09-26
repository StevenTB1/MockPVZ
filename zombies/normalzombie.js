class Normalzombie extends Zombie {
  // Different health from each zombie
  health = 200;
  maxHealth = 200;
  #speed = 15 / Game.fps;
  
  constructor(gameprogress) {
    super();
    this.gameprogress = gameprogress;

    let img = new Image();
    img.src = './images/zombie.jpg';
    this.image = img;

    let img2 = new Image();
    img2.src = './images/flagzombie.jpg';
    this.newImage = img2;
  }

  // @desc: Update if the zombie should move (change x) and should draw hit stage
  update() {
    if (!this.stop) this.x -= this.#speed;
    this.hitdrawTimer();
    this.#timeCheck();
  }

  // @desc: If it's the last wave, swap the images
  // @desc: To the normal zombie one instead of the cone head one
  #timeCheck(){
    if(this.gameprogress.levelTimer >= 16201){
      this.image = this.newImage;
    }
  }

}