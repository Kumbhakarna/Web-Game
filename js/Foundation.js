
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

var monsterReset = function () {
  //movementCount = 0;
  moveUp = false;
  moveDown = false;
  moveLeft = false;
  moveRight = false;
  moveUpRight = false;
  moveDownRight = false;
  moveDownLeft = false;
  moveUpLeft = false;
};

// Update game objects
var update = function (modifier) {


  if ((movementCount == 140) || (monster.y + 50 >= 580) || (monster.y - 30 <= 0) || (monster.x -5 <= 0) || (monster.x + 80 >= 1000)) {
    movementCount = 0;
    monsterMove = Math.floor(Math.random() * 8) + 1 ;

    switch (monsterMove) {
      case 1: {
        if (monster.y - 30 > 0) {
          monsterReset();
          moveUp = true; 
        }
        movementCount++;
        break;
      }
      case 2: {
        if (monster.y - 30 > 0 && monster.x + 80 < 1000) { 
          monsterReset();
          moveUpRight = true; 
        }
        movementCount++;
        break;
      }
      case 3: {
        if (monster.x + 80 < 1000) { 
          monsterReset();
          moveRight = true; 
        }
        movementCount++;
        break;
      }

      case 4: {
        if (monster.y + 50 < 580 && monster.x + 80 < 1000) { 
          monsterReset();
          moveDownRight = true; 
        }
        movementCount++;
        break;
      }
      case 5: {
        if (monster.y + 50 < 580) { 
          monsterReset();
          moveDown = true; 
        }
        movementCount++;
        break;
      }
      case 6: {
        if (monster.y + 50 < 580 && monster.x - 80 > 0) { 
          monsterReset();
          moveDownLeft = true;
        }
        movementCount++;
        break;
      }
      case 7: {
        if ( monster.x - 80 > 0) { 
          monsterReset();
          moveLeft = true; 
        }
        movementCount++;
        break;
      }

      case 8: {
        if (monster.y - 30 > 0 && monster.x - 80 > 0) { 
          monsterReset();
          moveUpLeft = true; 
        }
        movementCount++;
        break;
      } 
    }
  }

  if (moveUp) {
    monster.y -= 2;
  } else {
    if (moveUpRight) {
      monsterImage.src = "../images/redBlob.png";
      monster.y -= 2;
      monster.x += 2;
    }
    else {
      if (moveRight) {
        monsterImage.src = "../images/redBlob.png";
        monster.x += 2;
      } else {
        if (moveDownRight) {
          monsterImage.src = "../images/redBlob.png";
          monster.y += 2;
          monster.x += 2;
        } else {
          if (moveDown) {
            monster.y += 2;
          } else {
            if (moveDownLeft) {
              monsterImage.src = "../images/redBlobINVERT.png";
              monster.y += 2;
              monster.x -= 2;
            } else {
              if (moveLeft) {
                monsterImage.src = "../images/redBlobINVERT.png";
                monster.x -= 2;
              } else {
                if (moveUpLeft) {
                  monsterImage.src = "../images/redBlobINVERT.png";
                  monster.y -= 2;
                  monster.x -= 2;
                }
              }
            }
          }
        }
      }
    }
  }

  movementCount++;
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
  
  ctx.fillText("Movement Count: " + movementCount + " \n Which Path: " + monsterMove, 32, 32);
  
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