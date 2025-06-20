let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let ballWidth = 50;
let ballHeight = 50;
let ballX = 50;
let ballY = boardHeight - ballHeight;
let ballImg;

let ball = {
  x: ballX,
  y: ballY,
  width: ballWidth,
  height: ballHeight,
};

let thornsArray = [];

let thorn1Width = 20;
let thorn2Width = 36;
let thorn3Width = 54;

let thornHeight = 50;
let thornX = 700;
let thornY = boardHeight - thornHeight;

let thorn1Img;
let thorn2Img;
let thorn3Img;

let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d");

  ballImg = new Image();
  ballImg.src = "./img/ball.jpg";
  ballImg.onload = function () {
    context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height);
  };

  thorn1Img = new Image();
  thorn1Img.src = "./img/thorn1.png";

  thorn2Img = new Image();
  thorn2Img.src = "./img/thorn2.png";

  thorn3Img = new Image();
  thorn3Img.src = "./img/thorn3.png";

  requestAnimationFrame(update);
  setInterval(placeThorns, 1000);
  document.addEventListener("keydown", moveBall);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  ball.y = Math.min(ball.y + velocityY, ballY);
  context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height);

  for (let i = 0; i < thornsArray.length; i++) {
    let thorn = thornsArray[i];
    thorn.x += velocityX;
    context.drawImage(thorn.img, thorn.x, thorn.y, thorn.width, thorn.height);

    if (detectCollision(ball, thorn)) {
      gameOver = true;
      context.fillStyle = "red";
      context.font = "30px Courier";
      context.fillText("ИГРА ОКОНЧЕНА", boardWidth / 2 - 100, boardHeight / 2);
    }
  }

  context.fillStyle = "black";
  context.font = "20px Courier";
  score++;
  context.fillText(score, 5, 20);
}

function moveBall(e) {
  if (e.code == "Space") {
    if (gameOver) {
      restartGame();
      return;
    }

    if (ball.y == ballY) {
      velocityY = -10;
    }
  }
}

function placeThorns() {
  if (gameOver) {
    return;
  }

  let thorn = {
    img: null,
    x: thornX,
    y: thornY,
    width: null,
    height: thornHeight,
  };

  let placeThornChance = Math.random();

  if (placeThornChance > 0.9) {
    thorn.img = thorn3Img;
    thorn.width = thorn3Width;
    thornsArray.push(thorn);
  } else if (placeThornChance > 0.7) {
    thorn.img = thorn2Img;
    thorn.width = thorn2Width;
    thornsArray.push(thorn);
  } else if (placeThornChance > 0.5) {
    thorn.img = thorn1Img;
    thorn.width = thorn1Width;
    thornsArray.push(thorn);
  }

  if (thornsArray.length > 5) {
    thornsArray.shift();
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function restartGame() {
  if (gameOver) {
    gameOver = false;
    score = 0;
    thornsArray = [];
    ball.y = ballY;
    velocityY = 0;
  }
}
