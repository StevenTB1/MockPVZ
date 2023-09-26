// Handles the switch of the menus and audios
let titlemusic = document.getElementById("titlemusic");
titlemusic.volume = 0.3;
let gamemusic = document.getElementById("gamemusic");
gamemusic.volume = 0.3;
let endingmusic = document.getElementById("endingmusic");
endingmusic.volume = 0.3;

const onClickTitle = function() {
  document.getElementById('title').style.visibility = "hidden";
  document.getElementById('rules').style.visibility = "visible";
}

const onClickRules = function(){
  document.getElementById('gameScreen').style.visibility = "visible";
  document.getElementById('rules').style.visibility = "hidden";
  titlemusic.pause();
  gamemusic.currentTime = 0;
  gamemusic.play();
  new Canvas();
}

const newGame = function(){
  document.getElementById('gameScreen').style.visibility = "visible";
  document.getElementById('rules').style.visibility = "hidden";
  document.getElementById('end').style.visibility = "hidden";
  document.getElementById('win').style.visibility = "hidden";
  endingmusic.pause();
  gamemusic.currentTime = 0;
  gamemusic.play();
  new Canvas();
}

document.getElementById("title").onclick = onClickTitle;
document.getElementById("rules").onclick = onClickRules;
document.getElementById("end").onclick = newGame;
document.getElementById("win").onclick = newGame;
