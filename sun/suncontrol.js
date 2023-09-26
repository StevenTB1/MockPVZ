class Suncontrol{
  // An array that stores all the suns
  static suns = [];

  // @desc: Update all the suns position
  update(){
    for(let sun of Suncontrol.suns){
      sun.update();
    }
  }

  // @desc: Draw out all the suns
  draw(){
    for(let sun of Suncontrol.suns){
      sun.draw();
    }
  }

  // @desc: A static method used for removing the sun at one index
  // @param: {object} sun: The sun object being removed
  static removeSun(sun){
    const index = Suncontrol.suns.indexOf(sun);
    Suncontrol.suns.splice(index, 1);
  }
}