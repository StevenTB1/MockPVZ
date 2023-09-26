class Controller {
  // Keeps track of where the mouse is clicking
  static clickx = 0;
  static clicky = 0;
  static movex = 0;
  static movey = 0;

  constructor() {
    // Each time when there is an click action, we run the determine click method
    document.addEventListener("click", (e) => {
      Controller.clickx = e.clientX;
      Controller.clicky = e.clientY;
      Controller.clickEvents();
    });

    // Record the mouse position everytime when the mouse moves
    onmousemove = function(e) {
      Controller.movex = e.clientX;
      Controller.movey = e.clientY;
    };
  }

  // @desc: Determine the click events (combining all the possible click events)
  static clickEvents() {
    // If there is no seed selected, and click on the seed slots (chossing seeds)
    if (!Seedslot.isSelected) {
      if ((Controller.clickx > Seedslot.x && Controller.clickx <= Seedslot.x + Seedslot.width) &&
        (Controller.clicky > Seedslot.y && Controller.clicky <= Seedslot.y + Seedslot.height)) {

        // Determine which seeds the user choose
        Seedslot.choosePlants();
        
      }
    }
      
    // If there is a seed selected
    else{
      // if the click happens outside of the planting area
      if(Controller.clickx < 180 || Controller.clickx > 1230 || 
         Controller.clicky < 80 || Controller.clicky > 690){
        
        Seedslot.isSelected = false;
        
      }
      else{
        // The planted is selected and the click happens in the yard
        // Find the block position and put down the plant
        Controller.findBlock();
      }
    }

    // For every sun, check if the click event happens on the sun
    for(let sun of Suncontrol.suns){
      sun.detectClick();
    }
    
    // Reset the click positions
    Controller.clickx = 0;
    Controller.clicky = 0;
  }


  // @desc: Determines the mouse position of the block
  static findBlock(){
    let colNum = Math.floor((Controller.clickx - 180) / 116.67);
    let laneNum = Math.floor((Controller.clicky - 80) / 125);
    Blockcontrol.blocks[laneNum][colNum].putPlant();
  }
}
