
function aud_play_pause() {
  var myAudio = document.getElementById("myAudio");
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 580;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "../images/bgcloth.jpg";
bgImage.width = "1000";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "../images/heroImage.png";
heroImage.width = "5";


var mosterImage = false;
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "../images/redBlob.png";
monsterImage.width = "5";

// Game objects
var hero = {
  speed: 256, // movement in pixels per second
  x: 0,
  y: 0
};

function monster() {
  var newDirection = true;
  var movementCount = 140;
  var moveUp = false;
  var moveDown = false;
  var moveLeft = false;
  var moveRight = false;
  var moveUpRight = false;
  var moveDownRight = false;
  var moveDownLeft = false;
  var moveUpLeft = false;
  var monsterMove = 0;
  var speed = 256;
  var x = 0;
  var y = 0;
};


var monster1 = new monster();
var monster2 = new monster();
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
  /*
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  */
  // Throw the monster somewhere on the screen randomly
  monster1.x = (Math.random() * (canvas.width - 64));
  monster1.y = (Math.random() * (canvas.height - 64));
  monster2.x = (Math.random() * (canvas.width - 64));
  monster2.y = (Math.random() * (canvas.height - 64));
  monster1.caught = false;
  monster2.caught = false;
  
};
//Global variables for monster

var monsterInit = function (blob) {
  blob.newDirection = true;
  blob.movementCount = 140;
  blob.moveUp = false;
  blob.moveDown = false;
  blob.moveLeft = false;
  blob.moveRight = false;
  blob.moveUpRight = false;
  blob.moveDownRight = false;
  blob.moveDownLeft = false;
  blob.moveUpLeft = false;
  blob.monsterMove = 0;
  blob.speed = 256;
  blob.x = 0;
  blob.y = 0;
  blob.caught = false;
};
monsterInit(monster1);
monsterInit(monster2);
var monsterReset = function (blob) {
  
  blob.moveUp = false;
  blob.moveDown = false;
  blob.moveLeft = false;
  blob.moveRight = false;
  blob.moveUpRight = false;
  blob.moveDownRight = false;
  blob.moveDownLeft = false;
  blob.moveUpLeft = false;
  
};

var switchMonsterDirection = function (blob) {
  
  if ((blob.movementCount == 140) || (blob.y + 50 >= 580) || (blob.y - 30 <= 0) || (blob.x -5 <= 0) || (blob.x + 80 >= 1000)) {
    blob.movementCount = 0;
    blob.monsterMove = Math.floor(Math.random() * 8) + 1 ;

    switch (blob.monsterMove) {
      case 1: {
        if (blob.y - 30 > 0) {
          monsterReset(blob);
          blob.moveUp = true; 
        }
        blob.movementCount++;
        break;
      }
      case 2: {
        if (blob.y - 30 > 0 && blob.x + 80 < 1000) { 
          monsterReset(blob);
          blob.moveUpRight = true; 
        }
        blob.movementCount++;
        break;
      }
      case 3: {
        if (blob.x + 80 < 1000) { 
          monsterReset(blob);
          blob.moveRight = true; 
        }
        blob.movementCount++;
        break;
      }

      case 4: {
        if (blob.y + 50 < 580 && blob.x + 80 < 1000) { 
          monsterReset(blob);
          blob.moveDownRight = true; 
        }
        blob.movementCount++;
        break;
      }
      case 5: {
        if (blob.y + 50 < 580) { 
          monsterReset(blob);
          blob.moveDown = true; 
        }
        blob.movementCount++;
        break;
      }
      case 6: {
        if (blob.y + 50 < 580 && blob.x - 80 > 0) { 
          monsterReset(blob);
          blob.moveDownLeft = true;
        }
        blob.movementCount++;
        break;
      }
      case 7: {
        if ( blob.x - 80 > 0) { 
          monsterReset(blob);
          blob.moveLeft = true; 
        }
        blob.movementCount++;
        break;
      }

      case 8: {
        if (blob.y - 30 > 0 && blob.x - 80 > 0) { 
          monsterReset(blob);
          blob.moveUpLeft = true; 
        }
        blob.movementCount++;
        break;
      } 
    }
  }
  
};

var monsterMovement = function (blob) {
  
  if (blob.moveUp) {
   blob.y -= 2;
  } else {
    if (blob.moveUpRight) {
      monsterImage.src = "../images/redBlob.png";
      blob.y -= 2;
      blob.x += 2;
    }
    else {
      if (blob.moveRight) {
        monsterImage.src = "../images/redBlob.png";
        blob.x += 2;
      } else {
        if (blob.moveDownRight) {
          monsterImage.src = "../images/redBlob.png";
          blob.y += 2;
          blob.x += 2;
        } else {
          if (blob.moveDown) {
            blob.y += 2;
          } else {
            if (blob.moveDownLeft) {
              monsterImage.src = "../images/redBlobINVERT.png";
              blob.y += 2;
              blob.x -= 2;
            } else {
              if (blob.moveLeft) {
                monsterImage.src = "../images/redBlobINVERT.png";
                blob.x -= 2;
              } else {
                if (blob.moveUpLeft) {
                  monsterImage.src = "../images/redBlobINVERT.png";
                  blob.y -= 2;
                  blob.x -= 2;
                }
              }
            }
          }
        }
      }
    }
  }
  
};

var increaseCount = function (blob) {
  
  blob.movementCount++;
  
};

var grabbedMonster = function (blob) {
  if (
    hero.x <= (blob.x + 50)
    && blob.x <= (hero.x + 60)
    && hero.y <= (blob.y + 32)
    && blob.y <= (hero.y + 42)
    ) {
    ++monstersCaught;
    blob.caught = true;
    return true;
}
  return false;
};

// Update game objects
var update = function (modifier) {



  switchMonsterDirection(monster1);
  monsterMovement(monster1);
  increaseCount(monster1);

  
  switchMonsterDirection(monster2);
  monsterMovement(monster2);
  increaseCount(monster2);
  
  if (38 in keysDown && hero.y - 5> 0) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown && hero.y + 50 < 580) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown && hero.x -5 > 0) { // Player holding left
    heroImage.src = "../images/heroImageINVERT.png";
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown && hero.x + 78 < 1000) { // Player holding right
    heroImage.src = "../images/heroImage.png";
    hero.x += hero.speed * modifier;
  }

  // Are they touching?
  if ((!monster1.caught  && grabbedMonster(monster1)) || (!monster2.caught  && grabbedMonster(monster2))) {
    if (monster1.caught && monster2.caught) {
  reset();
}
}
};

// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (monsterReady && !monster1.caught) {
    ctx.drawImage(monsterImage, monster1.x, monster1.y);
  }

  if (monsterReady && !monster2.caught) {
    ctx.drawImage(monsterImage, monster2.x, monster2.y);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  /*monster1.movementCount = 3;
  */
  ctx.fillText("Movement Count: " + monstersCaught, 32, 32);
  
};


// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
