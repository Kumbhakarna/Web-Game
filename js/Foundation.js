
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

var monster = {
  newDirection: true,
  movementCount: 140,
  moveUp: false,
  moveDown: false,
  moveLeft: false,
  moveRight: false,
  moveUpRight: false,
  moveDownRight: false,
  moveDownLeft: false,
  moveUpLeft: false,
  monsterMove: 0,
  speed: 256,
  x: 0,
  y: 0
};
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
  monster.x = (Math.random() * (canvas.width - 64));
  monster.y = (Math.random() * (canvas.height - 64));
};
//Global variables for monster


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
          monsterReset(monster);
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
          monsterReset(monster);
          blob.moveDownRight = true; 
        }
        blob.movementCount++;
        break;
      }
      case 5: {
        if (blob.y + 50 < 580) { 
          monsterReset(monster);
          blob.moveDown = true; 
        }
        blob.movementCount++;
        break;
      }
      case 6: {
        if (blob.y + 50 < 580 && blob.x - 80 > 0) { 
          monsterReset(monster);
          blob.moveDownLeft = true;
        }
        blob.movementCount++;
        break;
      }
      case 7: {
        if ( blob.x - 80 > 0) { 
          monsterReset(monster);
          blob.moveLeft = true; 
        }
        blob.movementCount++;
        break;
      }

      case 8: {
        if (blob.y - 30 > 0 && blob.x - 80 > 0) { 
          monsterReset(monster);
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


// Update game objects
var update = function (modifier) {



  switchMonsterDirection(monster);
  monsterMovement(monster);
  increaseCount(monster);
  
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
    hero.x += monster.speed * modifier;
  }

  // Are they touching?
  if (
    hero.x <= (monster.x + 50)
    && monster.x <= (hero.x + 60)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 42)
    ) {
    ++monstersCaught;
  reset();
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

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  
  ctx.fillText("Movement Count: " + monster.movementCount + " \n Which Path: " + monster.monsterMove, 32, 32);
  
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
