class Canvas {
  static canvas = document.getElementById("gameScreen");
  static context = Canvas.canvas.getContext('2d');

  // Default width and height
  static width = 1280;
  static height = 720;
  
  constructor() {
    Canvas.canvas.width = Canvas.width;
    Canvas.canvas.height = Canvas.height;
    this.game = new Game();
  }
}