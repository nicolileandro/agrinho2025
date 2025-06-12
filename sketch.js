let player;
let obstacles = [];
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  player = new Player();
}

function draw() {
  background(100, 200, 100); // cor do campo

  if (!gameOver) {
    player.update();
    player.show();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (player.hits(obstacles[i])) {
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }
  } else {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
  }
}

// Classe do jogador
class Player {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.w = 40;
    this.h = 40;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    this.y = constrain(this.y, 0, height - this.h);
  }

  show() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.w, this.h);
  }

  hits(obstacle) {
    return collideRectRect(this.x, this.y, this.w, this.h, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  }
}

// Classe dos obstáculos
class Obstacle {
  constructor() {
    this.x = width;
    this.y = random(height - 30);
    this.w = 30;
    this.h = random(30, 100);
    this.speed = 6;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.x + this.w < 0;
  }
}

// Inclui a função de colisão da p5.collide2D
function collideRectRect(x, y, w, h, x2, y2, w2, h2) {
  return (x < x2 + w2 &&
          x + w > x2 &&
          y < y2 + h2 &&
          y + h > y2);
}
