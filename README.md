### 도형 그리기

- beginPath() 와 closePath() 메소드 사이에 모든 명령어가 들어갑니다.

- rect()를 이용해서 직사각형을 정의했는데 처음 두 값들은 캔버스의 좌상단 모서리로 부터의 좌표를 의미하고, 나머지 두 값은 직사각형의 너비와 높이를 의미합니다.

- fillStyle 은 fill() 메소드에서 칠해질 색상 값을 갖게 됩니다.

- arc() 메소드가 있습니다. 이 메소드는 6개의 파라미터를 갖습니다.

  - 원의 중심을 가리키는 x와 y좌표

  - 원의 반지름

  - 시작 각도와 끝 각도(원을 그릴 때 시작과 끝이되는 각도이며, 라디안 값입니다.)

  - 그리는 방향(false를 넣으면 시계방향으로 그려집니다. 기본 값이나 true를 넣으면 반 시계방향으로 그려집니다.) 이 파라미터는 옵션입니다.

- stroke() 를 이용하면 원의 외곽선에 색상을 부여할 수 있습니다.

```javascript
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
```

### 도형 움직이기

- 매 프레임마다 캔버스에 그리는것을 지속적으로 갱신하기 위해서는, 계속해서 그리는 것을 반복하게 만들어주는 함수가 필요합니다.

  - setInterval() 나 requestAnimationFrame()를 이용하면 함수를 몇번이고 계속 반복해서 실행할 수 있습니다.

- 이제 공을 움직이게 하기 위해서 첫 번째로, (50,50)이라는 지정된 좌표 대신에, x와 y라는 변수를 이용해서 화면 하단 중앙에서 그려지도록 하겠습니다.

  - x, y에 작은 값을 매 프레임마다 더해줄 것입니다.(dx, dy로 정의)

  - 이후, 이 변수들을 이용하여 매 프레임마다 x, y를 갱신해 줍니다.

- 캔버스의 내용들을 지워주기 위한 메소드인 clearRect() 가 있습니다. 이 메소드는 네 개의 파라미터가 필요합니다.

  - 직사각형의 좌상단 모서리를 표시할 x와 y좌표, 그리고 직사각형의 우하단 모서리를 표시할 x와 y좌표

- 코드 정리

  - 정리 전

  ```javascript
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
  }
  ```

  - 정리 후

  ```javascript
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
  }
  ```

- 충돌을 감지하기 위해서는 공이 벽에 닿았는지를 확인하고 그에 따라 움직이는 방향을 수정해야 합니다.

  - 보다 계산을 쉽게 하기 위하여 ballRadius 변수를 만든 뒤 원의 반지름 값을 대입하여 계산하는데 사용합니다.

#### 위 아래 방향으로 튕기기

- 캔버스에는 총 4개의 모서리 즉, 4개의 벽이 있습니다.

- 캔버스 내 위치 구조는 좌상단으로 부터 시작합니다.

```javascript
if (y + dy < 0) {
  dy = -dy;
}
```

- 만약 공의 위치에서 y값이 0보다 작은 경우 음/양수를 반대로 바꾸어주어 y 축의 방향을 바꾸어 줍니다.

- 공이 매 프레임마다 2픽셀만큼 움직이고 있었다면, 이제는 매 프레임마다 2픽셀만큼 "아래 방향으로" 이동할 것입니다.

- 위 코드는 상단 모서리를 튕기도록 해주기 때문에 이번엔 하단 모서리를 튕기도록 해보겠습니다

  ```javascript
  if (y + dy > canvas.height) {
    dy = -dy;
  }
  ```

- 공의 위치에서 y값이 캔버스의 높이보다 큰 경우(좌상단으로부터 y값을 측정하기 때문에 상단모서리에서의 y값은 0, 하단모서리에서의 y값은 480, 즉 캔버서의 높이값임을 잊지마세요) y축 움직임의 반대 방향으로 튕겨냅니다.

- 위의 두가지 코드를 하나로 합친다면

  ```javascript
  if (y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
  }
  ```

- 둘 중 하나의 조건이라도 만족한다면, 공의 방향은 반대로 바뀝니다.

#### 좌우로 튕겨내기

- y 대신 x값을 대입하여 그대로 반복해주기만 하면 됩니다.

```javascript
if (x + dx > canvas.width || x + dx < 0) {
  dx = -dx;
}

if (y + dy > canvas.height || y + dy < 0) {
  dy = -dy;
}
```

- 충돌을 감지할 때 그 기준을 공의 원점에 두고 계산했지만, 원의 둘레를 기준으로 계산을 해야 합니다.

  - 벽에 공이 절반쯤 지난 뒤가 아니라 닿자마자 튕겨나와야 합니다.

    ```javascript
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }
    ```

- 공의 원점과 벽 사이의 거리가 공의 반지름과 같아졌을 때 공의 움직임이 바뀌도록 만들었습니다.

### 게임 오버 기능

- 사면 모두에서 공을 튕겨내지 말고 왼쪽, 위쪽, 오른쪽, 세 면에만 적용해봅시다. 아래쪽 면에 닿는 순간 게임은 끝납니다. 우리는 공이 밑면에 충돌하는 순간 "게임 오버" 상태로 바뀌게 합니다. 우선 경고 메시지를 보여주고 페이지를 리로딩해서 게임을 다시 시작하게 할 것입니다.

```javascript
if (y + dy < ballRadius) {
  dy = -dy;
} else if (y + dy > canvas.height - ballRadius) {
  alert("GAME OVER");
  document.location.reload();
}
```

- 참고자료
  https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it
