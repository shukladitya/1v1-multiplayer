canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
document.querySelector(".healthBars").width = window.innerWidth - 5;
document.querySelector(".message").width = window.innerWidth - 5;
gameTimer = document.querySelector(".timer");

let backgroundFramesArray = [0, 8, 36, 8, 4, 8, 40, 38, 24, 51, 131];
let numberOfFramesInSprites = [
  {},
  {
    run: 8,
    attack1: 6,
    attack2: 6,
    death: 6,
    fall: 2,
    idle: 8,
    jump: 2,
    tHit1: 4,
    tHit2: 4,
  },
  {
    run: 8,
    attack1: 4,
    attack2: 4,
    death: 7,
    fall: 2,
    idle: 4,
    jump: 2,
    tHit1: 3,
    tHit2: 3,
  },
  {
    run: 8,
    attack1: 4,
    attack2: 4,
    death: 6,
    fall: 2,
    idle: 8,
    jump: 2,
    tHit1: 4,
    tHit2: 4,
  },
];
let random = Math.floor(Math.random() * 10) + 1;

let gravity = 0.5;
let time = 60;

c = canvas.getContext("2d");
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

keyPressed = {
  a: false,
  d: false,
  w: false,
  keyRight: false,
  keyLeft: false,
  keyUp: false,
};

addEventListener("keydown", (e) => {
  if (e.key == "a") keyPressed.a = true;
  if (e.key == "d") keyPressed.d = true;
  if (e.key == "w" && !player.isDead) player.jump();
  if (e.key == " " && !player.isDead) player.attacking();

  if (e.key == "ArrowRight") keyPressed.keyRight = true;
  if (e.key == "ArrowLeft") keyPressed.keyLeft = true;
  if (e.key == "ArrowUp" && !enemy.isDead) enemy.jump();
  if (e.key == "ArrowDown" && !enemy.isDead) enemy.attacking();
});
addEventListener("keyup", (e) => {
  if (e.key == "a") keyPressed.a = false;
  if (e.key == "d") keyPressed.d = false;
  if (e.key == "w") keyPressed.w = false;
  if (e.key == "ArrowRight") keyPressed.keyRight = false;
  if (e.key == "ArrowLeft") keyPressed.keyLeft = false;
  if (e.key == "ArrowUp") keyPressed.keyLeft = false;
});

class Human {
  constructor(locationX, locationY, spriteNumber, spriteDirection) {
    this.locationX = locationX;
    this.locationY = locationY;
    this.velocityY = 0; //initial velocity freefall
    this.width = 200;
    this.height = 250;
    this.attackBoxX = this.locationX;
    this.attackBoxY = this.locationY;
    this.attackBoxWidth = 410;
    this.attackBoxHeight = 90;
    this.applyAttackInset = false;
    this.attackInset = 210;
    this.health = 100;
    this.isDead = false;
    //
    //drawing the player
    this.spriteNumber = spriteNumber;
    this.spriteDirection = spriteDirection;
    this.posture = "fall";
    this.image = new Image();
    //create source
    this.source = `assets/player${this.spriteNumber}${this.spriteDirection}/${this.posture}.png`;
    this.image.src = this.source;
    this.frames = numberOfFramesInSprites[this.spriteNumber][this.posture];
    this.scale = 5; //hardcoded for current sprites
    this.currentFrameNumber = 0;
    this.framesElapsed = 0;
    this.frameshold = 5;
    this.playAttackSprite = false;
    this.playHitSprite = false;
    this.framesInDeath = numberOfFramesInSprites[this.spriteNumber]["death"];
  }

  updateSpritePosture = (spriteDirection, spritePosture) => {
    if (!this.playAttackSprite && !this.playHitSprite) {
      this.posture = spritePosture;
      this.source = `assets/player${this.spriteNumber}${spriteDirection}/${this.posture}.png`;
      this.image.src = this.source;
      this.frames = numberOfFramesInSprites[this.spriteNumber][spritePosture];
    }
  };

  draw = () => {
    // .....bodybox below......
    // c.fillRect(this.locationX, this.locationY, this.width, this.height);
    c.drawImage(
      this.image,
      (this.currentFrameNumber % this.frames) *
        (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.locationX - 600,
      this.locationY - 500,
      this.width * this.scale + 400,
      this.height * this.scale
    );

    //drawing and updating position of attackbox
    this.attackBoxX = this.locationX;
    this.attackBoxY = this.locationY;

    if (this.applyAttackInset) this.attackBoxX -= this.attackInset;
    //.....attackbox below.....
    // c.fillRect(
    //   this.attackBoxX,
    //   this.attackBoxY,
    //   this.attackBoxWidth,
    //   this.attackBoxHeight
    // );
  };

  updateFrames = () => {
    this.framesElapsed++;
    if (this.framesElapsed % this.frameshold == 0) {
      this.currentFrameNumber++;
    }
    this.draw();
  };

  updatePosition = (movementX) => {
    this.locationY += this.velocityY;
    if (this.locationY + 150 + this.velocityY >= canvas.height - 170) {
      this.velocityY = 0;
      this.locationY = canvas.height - 320;
      this.updateSpritePosture(this.spriteDirection, "idle");
    } else {
      this.velocityY += gravity;
      if (this.velocityY < 0)
        this.updateSpritePosture(this.spriteDirection, "jump");
      else this.updateSpritePosture(this.spriteDirection, "fall");
    }
    this.locationX += movementX;
    if (movementX != 0 && this.velocityY == 0) {
      this.updateSpritePosture(this.spriteDirection, "run");
    }
    ///death updated below
    if (this.isDead) {
      this.updateSpritePosture(this.spriteDirection, "death");
    }

    //
    //
    //finally update the frame if player alive
    if (!this.isDead) this.updateFrames();
  };

  jump = () => {
    this.velocityY = -20;
  };

  attacking = () => {
    this.updateSpritePosture(
      this.spriteDirection,
      Math.floor(Math.random() * 2) == 0 ? "attack1" : "attack2"
    );
    this.isAttacking = true;
    this.playAttackSprite = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
    setTimeout(() => {
      this.playAttackSprite = false;
    }, 400);
  };

  takeHit = () => {
    if (!this.isAttacking && !this.isDead) {
      this.updateSpritePosture(
        this.spriteDirection,
        Math.floor(Math.random() * 2) == 0 ? "tHit1" : "tHit2"
      );
      this.health -= 10;
      this.playHitSprite = true;
      setTimeout(() => {
        this.playHitSprite = false;
      }, 400);
    }
  };
  initiateDeath = () => {
    this.isDead = true;
    this.framesElapsed++;
    this.updateSpritePosture(this.spriteDirection, "death");
    if (this.framesElapsed % this.frameshold == 0 && this.framesInDeath != 0) {
      if (this.spriteDirection == "r") {
        this.currentFrameNumber =
          numberOfFramesInSprites[this.spriteNumber]["death"] -
          this.framesInDeath;
      } else {
        this.currentFrameNumber = this.framesInDeath;
      }
      this.framesInDeath--;
    }
    this.draw();
  };
}

let player = new Human(300, 0, 1, "r");
let enemy = new Human(900, 20, 3, "l");
let background = new Sprite(
  `./assets/background${random}.png`,
  0,
  0,
  backgroundFramesArray[random]
);

let animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.updateFrames();

  ///update position in x axis
  if (keyPressed.a && !player.isDead) {
    player.updatePosition(-5);
  } else if (keyPressed.d && !player.isDead) player.updatePosition(5);
  else player.updatePosition(0);

  if (keyPressed.keyLeft && !enemy.isDead) {
    enemy.updatePosition(-5);
  } else if (keyPressed.keyRight && !enemy.isDead) enemy.updatePosition(5);
  else enemy.updatePosition(0);

  ///

  ///attacking
  if (player.locationX > enemy.locationX + enemy.width && !player.isDead) {
    player.applyAttackInset = true;
    player.spriteDirection = "l";
  } else if (!player.isDead) {
    player.applyAttackInset = false;
    player.spriteDirection = "r";
  }

  if (enemy.locationX > player.locationX && !enemy.isDead) {
    enemy.applyAttackInset = true;
    enemy.spriteDirection = "l";
  } else if (!enemy.isDead) {
    enemy.applyAttackInset = false;
    enemy.spriteDirection = "r";
  }
  ///actual player attack mechanics
  if (
    ((player.attackBoxX + player.attackBoxWidth > enemy.locationX &&
      player.attackBoxX + player.attackBoxWidth <
        enemy.locationX + enemy.width) ||
      (player.attackBoxX > enemy.locationX &&
        player.attackBoxX < enemy.locationX + enemy.width)) &&
    player.isAttacking &&
    player.locationY == enemy.locationY
  ) {
    enemy.takeHit();
    gsap.to(".enemyHealth>div", { width: `${enemy.health}%` });
    player.isAttacking = false;
  }
  ///actual enemy attack mechanics
  if (
    ((enemy.attackBoxX + enemy.attackBoxWidth > player.locationX &&
      enemy.attackBoxX + enemy.attackBoxWidth <
        player.locationX + player.width) ||
      (enemy.attackBoxX > player.locationX &&
        enemy.attackBoxX < player.locationX + player.width)) &&
    enemy.isAttacking &&
    enemy.locationY == player.locationY
  ) {
    player.takeHit();
    gsap.to(".playerHealth>div", { width: `${player.health}%` });
    enemy.isAttacking = false;
  }

  if (player.health == 0) {
    player.initiateDeath();
    clearTimeout(a);
    setMessage("Player 2 won.");
  }
  if (enemy.health == 0) {
    enemy.initiateDeath();
    clearTimeout(a);
    setMessage("Player 1 won.");
  }
};
animate();
///
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
///////time and messages

let timer = () => {
  a = setInterval(() => {
    time--;
    gameTimer.innerText = time;
    if (time == 0) {
      clearTimeout(a);
      if (enemy.health < player.health) setMessage("Player 1 won.");
      else if (enemy.health > player.health) setMessage("player 2 won.");
      else setMessage("tie");
    }
  }, 1000);
};
message = document.querySelector(".message");
let setMessage = (messageString) => {
  message.style.display = "block";
  message.innerText = messageString;
};

timer();
