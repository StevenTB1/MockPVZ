class Suncount {
  // Intitial area of showing the count of sun
  x = 20;
  y = 10;
  width = 225;
  height = 85;
  // Default starting value
  static sunValue = 100; 
  
  constructor(){
    let img = new Image();
    img.src = './images/sunBar.png';
    this.image = img;
  }

  // @desc: A draw function that draws the sun display bar
  draw(){
    Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);

    // Draw out the amount text
    Canvas.context.font = '35px serif';
    Canvas.context.fillStyle = 'rgba(255, 255, 255, 1)';
    Canvas.context.fillText(Suncount.sunValue, this.x + 125, this.y + 50);
  }
  
}