"use strict";

const canvas = document.getElementById("myCanvas");
// 캔버스를 그리기 위해 사용되는 도구
// 2D rendering context를 ctx 변수에 저장
const ctx = canvas.getContext("2d");
// 원의 중심을 가리키기 위해 x, y 변수 생성
// 공의 시작점 (생성시 위치)
let x = canvas.width / 2;
let y = canvas.height - 100;
// 매 프레임마다 x, y 변수를 갱신하기 위해 dx, dy 변수 생성
let dx = 3;
let dy = -3;
// 원의 반지름 값 변수
const ballRadius = 10;
// paddle 생성 변수
const paddleHeight = 7;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// paddle 조작키 입력 변수
let rightPressed = false;
let leftPressed = false;
// 벽돌 변수 정의
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 40;

// 행과 열 수만큼 반복되면서 새로운 벽돌 생성
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // 캔버스의 내용을 지워주기 위한 clearRect() 메소드
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();

  // ball이 canvas 밖을 벗어나지 않는 코드
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // 윗면
  if (y + dy < ballRadius) {
    dy = -dy;
    // 아래쪽 면에 공이 닿으면 게임 오버 메세지
  } else if (y + dy > canvas.height - ballRadius) {
    //paddle이 공을 튕겨내는 코드
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      //   alert("GAME OVER");
      document.location.reload();
    }
  }

  x += dx;
  y += dy;
  // paddle을 화면에서 움직이는 코드
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}
// draw() 함수는 10ms마다 영원히 호출 (setInterval)
setInterval(draw, 10);

// 처음에는 키가 눌려지지 않은 상태이므로 기본값은 false이다
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUPHandler, false);

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUPHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
}
