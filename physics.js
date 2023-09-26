class Physics {
  
  // @desc: Check if the bullet hits the border
  // @param: {object} bullet: The bullet object
  static bulletHitBorder(bullet) {
    if (bullet.x > 1280){
      return true;
    } else {
      return false;
    }
  }

  // @desc: Check if the zombie hits the left border
  // @param: {object} zombie: The zombie object
  static zombieHitBorder(zombie){
    if(zombie.x + zombie.width <= 0){
      return true;
    }else{
      return false;
    }
  }

  // @desc: Check for if two game objects collide
  // @param: {object} obj1: the first object
  // @param: {object} obj2: the second object
  static objCollision(obj1, obj2) {
    if (
      typeof obj1 !== 'undefined' && typeof obj2 !== 'undefined' &&
      obj1.x + obj1.width > obj2.x &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y + obj1.height > obj2.y &&
      obj1.y < obj2.y + obj2.height
    ) {
      return true;
    }
    return false;
  }

}