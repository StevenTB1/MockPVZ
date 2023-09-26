class Game {
  static fps = 60;
  static timeInterval = 1000 / Game.fps;
  static getBrain = 0;
  #spawnCD = 0;
  #spawnTime = Game.randomNum(1200, 1500);

  constructor() {
    this.controller = new Controller();
    this.map = new Map();
    this.seedslot = new Seedslot();
    this.plantcontrol = new Plantcontrol();
    this.blockcontrol = new Blockcontrol();
    this.bulletcontrol = new Bulletcontrol();
    this.zombiecontrol = new Zombiecontrol();
    this.suncontrol = new Suncontrol();
    this.suncount = new Suncount();
    this.gameprogress = new GameProgress();


    this.gameInterval = setInterval(() => {
      this.#spawnZombie();
      this.#update();
      this.#draw();
      this.#gameover();
    }, Game.timeInterval)

  }

  // @desc: Update all the objects related to the game class
  #update() {
    this.map.update();
    this.seedslot.update();
    this.blockcontrol.update();
    this.plantcontrol.update();
    this.bulletcontrol.update();
    this.zombiecontrol.update();
    this.suncontrol.update();
    this.gameprogress.update();
  }

  // @desc: Draw all the objects related to the actual game
  #draw() {
    this.#clear();
    this.map.draw();
    this.plantcontrol.draw();
    this.blockcontrol.draw();
    this.bulletcontrol.draw();
    this.zombiecontrol.draw();
    this.suncontrol.draw();
    this.suncount.draw();
    this.seedslot.draw();
    this.gameprogress.draw();
  }

  // @desc: Clear the canva each time interval
  #clear() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }

  // @desc: randomize a number between a minimum and maximum
  // @param: {number} min: the minimum value
  // @param: {number} max: the maximum value
  static randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // @desc: Spawning the zombie as time goes
  #spawnZombie() {
    // If it's before the final wave
    if (this.gameprogress.levelTimer <= 16200) {
      if (this.#spawnCD >= this.#spawnTime) {
        // Randomizing and generating different types of zombie
        let typeNum = Game.randomNum(0, 10);

        // 30% of generating a cone head zombie (after 1 min)
        if (typeNum >= 0 && typeNum < 4 && this.gameprogress.levelTimer >= 3600) {
          let temp = new Coneheadzombie();
          Zombiecontrol.zombies[temp.lane].push(temp);
        }
        // 60% of generating a normal zombie
        else if (typeNum >= 4 && typeNum < 9) {
          let temp = new Normalzombie(this.gameprogress);
          Zombiecontrol.zombies[temp.lane].push(temp);
        }
        // 10% of generating a bucket head zombie (after 1 min 30s)
        else if (typeNum >= 9 && this.gameprogress.levelTimer >= 5400) {
          let temp = new Bucketzombie();
          Zombiecontrol.zombies[temp.lane].push(temp);
        }
        else {
          let temp = new Normalzombie(this.gameprogress);
          Zombiecontrol.zombies[temp.lane].push(temp);
        }
        // After each spawn, set the new spawn Time
        this.#spawnCD = 0;

        // First minute: Spawn time randomly generated from 10s to 15s
        if (this.gameprogress.levelTimer < 3600) {
          this.#spawnTime = Game.randomNum(600, 900);
        }
        // Second minute: Spawn time randomly generated from 8s to 10s
        else if (this.gameprogress.levelTimer >= 3600 && this.gameprogress.levelTimer < 7200) {
          this.#spawnTime = Game.randomNum(480, 600);
        }
        // More than two minutes: Spawn time from 5s to 8s
        else {
          this.#spawnTime = Game.randomNum(300, 480);
        }
      } else {
        this.#spawnCD++;
      }
    }
    // Time for last wave
    else if (this.gameprogress.pauseTimer >= 600 && this.gameprogress.levelTimer <= 18000) {

      let typeNum = Game.randomNum(1, 10);
      this.#spawnTime = Game.randomNum(90, 150);

      // Have a higher speed of spawning (1.5s - 3s)
      if (this.#spawnCD >= this.#spawnTime) {
        if (typeNum >= 1 && typeNum <= 4) {
          let temp = new Coneheadzombie();
          Zombiecontrol.zombies[temp.lane].push(temp);
        }
        else if (typeNum > 4 && typeNum <= 8) {
          let temp = new Normalzombie(this.gameprogress);
          Zombiecontrol.zombies[temp.lane].push(temp);
        }
        else if (typeNum > 8 && typeNum <= 10) {
          let temp = new Bucketzombie();
          Zombiecontrol.zombies[temp.lane].push(temp);
        }

        this.#spawnCD = 0;
        this.#spawnTime = Game.randomNum(90, 150);
      }
      else {
        this.#spawnCD++;
        this.gameprogress.levelTimer = 1;
      }
    }
  }

  // @desc: Determine if the game is over
  #gameover() {
    // If the user wins
    if (this.gameprogress.levelTimer >= 18000 && Game.checkZombieArray()) {
      // Stop the setInterval
      clearInterval(this.gameInterval);
      
      // Reset all the used array and CD
      this.#resetAllArray();
      this.#resetAllCD();

      // Stop day music and Playing ending music
      let gamemusic = document.getElementById("gamemusic");
      gamemusic.pause();
      let endingMusic = document.getElementById("endingmusic");
      endingMusic.currentTime = 0;
      endingMusic.play();
      
      // Show the start screen
      document.getElementById('gameScreen').style.visibility = "hidden";
      document.getElementById('win').style.visibility = "visible";
    }

    // Else if the user loses
    else if (Game.getBrain >= 5) {
      
      // Stop the setInterval
      clearInterval(this.gameInterval);
      
      // Reset all the used array and CD
      this.#resetAllArray();
      this.#resetAllCD();

      // Stop day music and Playing ending music
      let gamemusic = document.getElementById("gamemusic");
      gamemusic.pause();
      let endingMusic = document.getElementById("endingmusic");
      endingMusic.currentTime = 0;
      endingMusic.play();

      // Show the end screen
      document.getElementById('gameScreen').style.visibility = "hidden";
      document.getElementById('end').style.visibility = "visible";
    }
  }

  // @desc: Check to see if the zombie array is empty
  static checkZombieArray() {
    if (Zombiecontrol.zombies[0].length <= 0 &&
      Zombiecontrol.zombies[1].length <= 0 &&
      Zombiecontrol.zombies[2].length <= 0 &&
      Zombiecontrol.zombies[3].length <= 0 &&
      Zombiecontrol.zombies[4].length <= 0) {
      return true;
    }
    else return false;
  }

  // @desc: Reset all the possible arrays
  #resetAllArray() {
    // Reset all the used static arrays
    Zombiecontrol.zombies = [[], [], [], [], []];
    Bulletcontrol.bullets = [[], [], [], [], []];
    Plantcontrol.plants = [[], [], [], [], []];
    Suncontrol.suns = [];
    Suncount.sunValue = 100;
    Game.getBrain = 0;
  }
  
  // @desc: Reset all other classes CD, if contains
  #resetAllCD() {
    // Seeds CD
    let tempCD = [Peashooter.plantCD, Sunflower.plantCD, Wallnut.plantCD, Potatomine.plantCD, Repeater.plantCD];

    for (let i = 0; i < 5; i++) {
      Seedslot.seeds[i].plantCD = tempCD[i];
    }

    // Falling Sun CD
    this.map.sunTimer = 0;
  }

}