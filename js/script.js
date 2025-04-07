let launcher;
let launcher1;
let launcher2;
let bullets = [];
let missiles = [];
let explosion = [];
let mouseLastClickedY = 0;
let coll;
let collision;
let mouseOffset = 25;
let score = 0;
let lives = 10;
let winAnimation = false;
let tank = true;
let tank2 = true;
let tank3 = true;
let tick = 0;
let winScreenAnimation = 0;
let repeatRate = 30
let countdown = 0;
let x1 = 300;
let x2 = 300;
let x3 = 300;
let startScreen = 0;
let controlAnimation = 0
let start = true;
let gameOver = false;
let expand = 0;
function setup() {
  angleMode(DEGREES);
  rectMode(CENTER);
  createCanvas(600, 600);
  background("lightSkyBlue");
  imageMode(CENTER);
  launcher = new Tank(300, 480);
  launcher1 = new Tank(100, 480)
  launcher2 = new Tank(500, 480)


}

function draw() {
  if (start === false) {
    clear();
    background("lightSkyBlue");

    fill("grey")
    stroke(1)
    rect(300, 600, 600, 200);


    fill("black");
    textAlign(CENTER);
    text("Mission Control", 300, 50, 100, 50);

    textAlign(LEFT);
    text("Score: " + score, 75, 50, 100, 50);
    text("Health: " + lives, 75, 75, 100, 50);

    launcher.render(tank);
    launcher.follow();

    launcher1.render(tank2);
    launcher1.follow();

    launcher2.render(tank3);
    launcher2.follow();

    for (let i = 0; i < bullets.length; i++) {
      if (tank === true) {
        bullets[i].render(tank);
      }
      if (tank2 === true) {
        bullets[i].render(tank2);
      }
      if (tank3 === true) {
        bullets[i].render(tank3);
      }
      bullets[i].applyMovement();
      bullets[i].update();
      if (bullets[i].Boolean() == true) {
        explosion.push(new Explode(bullets[i].getX(), bullets[i].getY(), 0, true));
        bullets.splice(i, 1);
        break;
      }
      if (bullets[i].getY() <= mouseLastClickedY) {
        bullets[i].setY(mouseLastClickedY)
        bullets[i].setJustify(true);
        break;
      }
      if (bullets[i].kill() == true) {
        bullets.splice(i, 1);
        break;
      }
    }
    if (tick == 0) {
      missiles.push(new Missiles(random(50, 550), -50, random(45, 135)));
    }
    tick += 1;
    if (tick == repeatRate) {
      tick = 0;
    }

    for (let i = 0; i < missiles.length; i++) {
      missiles[i].render();
      missiles[i].applyForce(createVector(0, 0.1));
      missiles[i].updateVelocity();

      collision = CollisionCheck.coll(missiles[i].getX(), missiles[i].getY());
      if (collision === true) {
        explosion.push(new Explode(missiles[i].getX(), missiles[i].getY(), 0, true));
        lives -= 1;
        missiles.splice(i, 1)
        break;
      }
      if (missiles[i].boundries() == true) {
        missiles.splice(i, 1)
        break;
      }
    }

    for (let j = 0; j < explosion.length; j++) {
      if (explosion[j].getExplode() == true) {
        explosion[j].expand();
      }
      if (explosion[j].isDead() === true) {
        explosion.splice(j, 1);
        break;
      }
    }

    for (let i = 0; i < bullets.length; i++) {
      for (let j = 0; j < missiles.length; j++) {
        coll = CollisionCheck.collisionCheck(missiles[j].getX(), missiles[j].getY(), 30, bullets[i].getX(), bullets[i].getY(), 15);
        if (coll === true) {
          explosion.push(new Explode(missiles[j].getX(), missiles[j].getY(), 0, true));
          score += 1;
          missiles.splice(j, 1)
          bullets.splice(i, 1);
          break;
        }
      }
    }

    for (let i = 0; i < missiles.length; i++) {
      let sons = CollisionCheck.tankCheck(missiles[i].getX(), missiles[i].getY(), launcher.getX());
      let sons2 = CollisionCheck.tankCheck2(missiles[i].getX(), missiles[i].getY(), launcher1.getX());
      let sons3 = CollisionCheck.tankCheck3(missiles[i].getX(), missiles[i].getY(), launcher2.getX());
      if (tank === true) {
        if (sons === true) {
          explosion.push(new Explode(missiles[i].getX(), missiles[i].getY(), 0, true));
          tank = false;
          missiles.splice(i, 1);
          break;
        }
      }
      if (tank2 === true) {
        if (sons2 === true) {
          explosion.push(new Explode(missiles[i].getX(), missiles[i].getY(), 0, true));
          tank2 = false;
          missiles.splice(i, 1)
          break;
        }
      }
      if (tank3 === true) {
        if (sons3 === true) {
          explosion.push(new Explode(missiles[i].getX(), missiles[i].getY(), 0, true));
          tank3 = false;
          missiles.splice(i, 1)
          break;
        }
      }
    }
    for (let j = 0; j < explosion.length; j++) {
      let collM = CollisionCheck.collisionCheck(explosion[j].getX(), explosion[j].getY(), explosion[j].getRadius(), launcher.getX(), launcher.getY(), launcher.getRadius())
      let collL = CollisionCheck.collisionCheck(explosion[j].getX(), explosion[j].getY(), explosion[j].getRadius(), launcher1.getX(), launcher1.getY(), launcher1.getRadius())
      let collR = CollisionCheck.collisionCheck(explosion[j].getX(), explosion[j].getY(), explosion[j].getRadius(), launcher2.getX(), launcher2.getY(), launcher2.getRadius())
      if (tank === true) {
        if (collM === true) {
          tank = false;
        }
      }
      if (tank2 === true) {
        if (collL === true) {
          tank2 = false;
        }
      }
      if (tank3 === true) {
        if (collR === true) {
          tank3 = false;
        }
      }
    }
    mouseMoved();
  }
  if (start === true) {
    fill("Black");
    square(300, 300, 600);
    if (startScreen >= 0) {
      startScreen += 1;
    }
    if (startScreen <= 60) {
      fill("Grey");
      textAlign(CENTER);
      textSize(50);
      text("Mission Impossible", 300, 200, 400, 200)
      fill("white");
      textSize(15);
      text("Click to Start", 300, 500, 300, 50);
    }
    if (startScreen >= 120) {
      startScreen = 0;
    }
    if (mouseIsPressed) {
      start = false;
    }
  }
  if (tank == false && tank2 == false && tank3 == false) {
    gameOver = true;
  }
  if (lives <= 0) {
    gameOver = true;
  }
  if (score === 15) {
    winAnimation = true;
  }

  if (gameOver === true) {
    expand += 15
    fill("Black");
    square(300, 300, 0 + expand);
    if (expand >= 600) {
      expand = 600;
      if (controlAnimation >= 0) {
        controlAnimation += 1;
      }
      if (controlAnimation <= 60) {
        fill("Grey");
        textAlign(CENTER);
        textSize(50);
        text("Game Over", 300, 200, 400, 200)
        fill("white");
        textSize(15);
        text("Click to Try Again", 300, 500, 300, 50);
      }
      if (controlAnimation >= 120) {

        controlAnimation = 0;
      }
      if (countdown <= 180) {
        countdown++
      }
      if (countdown >= 180) {
        if (mouseIsPressed) {
          gameOver = false;
          lives = 10;
          score = 0;
          missiles = [];
          bullets = [];
          explosion = [];
          tank = true;
          tank2 = true;
          tank3 = true;
          countdown = 0;
          expand = 0
        }
      }
    }


  }
  if (winAnimation === true) {
    expand += 15
    fill("Black");
    square(300, 300, 0 + expand);
    if (expand >= 600) {
      expand = 600;
      if (winScreenAnimation >= 0) {
        winScreenAnimation += 1;
      }
      if (winScreenAnimation <= 60) {
        fill("Blue");
        textAlign(CENTER);
        textSize(50);
        text("YOU WIN", 300, 200, 400, 200)
        fill("white");
        textSize(15);
        text("Click to Try Again", 300, 500, 300, 50);
      }
      if (winScreenAnimation >= 120) {

        winScreenAnimation = 0;
      }
      if (countdown <= 180) {
        countdown++
      }
      if (countdown >= 180) {
        if (mouseIsPressed) {
          winAnimation = false;
          lives = 10;
          score = 0;
          missiles = [];
          bullets = [];
          explosion = [];
          tank = true;
          tank2 = true;
          tank3 = true;
          countdown = 0;
          expand = 0
        }
      }
    }
  }
}

function mouseMoved() {
  fill("purple")
  stroke(1)
  rect(mouseX - 5, mouseY, 5, 2);
  rect(mouseX + 5, mouseY, 5, 2);
  rect(mouseX, mouseY - 5, 2, 5);
  rect(mouseX, mouseY + 5, 2, 5);
  circle(mouseX, mouseY, 5);
}
function mouseClicked() {
  mouseLastClickedY = mouseY + mouseOffset;
  if (tank === true) {
    bullets.push(new Defence(launcher.getX(), 480, launcher.getAngle()));
  }
  if (tank2 === true) {
    bullets.push(new Defence(launcher1.getX(), 480, launcher1.getAngle()));
  }
  if (tank3 === true) {
    bullets.push(new Defence(launcher2.getX(), 480, launcher2.getAngle()));
  }
}