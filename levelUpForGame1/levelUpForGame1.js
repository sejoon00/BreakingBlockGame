// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector('main').insertAdjacentHTML(
  'afterbegin',
  `
    <section id="levelUp1">
        <div id="container">
            <div id="speechBubble">I'm Gonna Wreck It!</div>
            <img src="../source/ralph_paddle.png" id="ralph1">
            <img src="../source/kingCandyVaenellope.png" id="kingCandyVaenellope">
            <img src="../source/슈가러쉬.png" id="sugarRushImg">
        </div>
        <div class="text_box">
            <span class="text"></span>
        </div>
        <div id="bgImg1"></div>
    </section>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let levelUp1 = document.querySelector('#levelUp1');
let position = 0;
let ralph, speechBubble, maxPosition;

document.addEventListener('keydown', (event) => {
  if (gameState == 'Gaming1' && event.code === 'Enter' && isGameChanging) {
    levelUp1.style.display = 'none';
    moveToStagePage();
    event.preventDefault(); // Escape의 기본 동작을 방지
    isGameChanging = false;
  }
});

setInterval(typing, 200);

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function moveKingCandyVanellope() {
  const kingCandyVanellope = document.getElementById('kingCandyVaenellope');
  let position = 0; // 시작 위치를 왼쪽 끝으로 설정
  const containerWidth = document.getElementById('levelUp1').clientWidth;
  const stopPosition = containerWidth - kingCandyVanellope.clientWidth;

  function animate() {
    position += 3; // 오른쪽으로 이동
    kingCandyVanellope.style.left = position + 'px';

    if (position < stopPosition) {
      requestAnimationFrame(animate);
    } else {
      moveUp();
    }
  }

  function moveUp() {
    let upPosition = 0;
    const maxUpPosition = 300;

    function animateUp() {
      upPosition += 3; // 위로 이동
      kingCandyVanellope.style.transform = `translateY(${-upPosition}px)`;

      if (upPosition < maxUpPosition) {
        requestAnimationFrame(animateUp);
      } else {
        fadeOut(); // 위로 이동 후 서서히 사라지게
      }
    }

    function fadeOut() {
      kingCandyVanellope.style.transition = 'opacity 2s';
      kingCandyVanellope.style.opacity = '0';
      setTimeout(() => {
        moveRalph(); // 킹캔디 조카가 사라지면 랄프 이동 시작
      }, 2000); // 2초 후 랄프 이동 시작
    }

    animateUp();
  }

  animate();
}
function moveRalph() {
  const ralph = document.getElementById('ralph1');
  ralph.style.display = 'block ';

  const speechBubble = document.getElementById('speechBubble');
  let position = 0;
  const stopPosition = 399; // 중간에 멈추는 위치
  const containerWidth = document.getElementById('levelUp1').clientWidth;
  const ralphWidth = ralph.clientWidth;
  const maxPosition = containerWidth - ralphWidth; // 랄프가 이동할 수 있는 최대 위치
  const bgImg1 = document.getElementById('bgImg1');

  function animate() {
    if (position === stopPosition) {
      // 멈추고 말풍선 표시
      speechBubble.style.display = 'block';
      speechBubble.style.left = ralph.style.left + 'px'; // 말풍선 위치 조정
      setTimeout(() => {
        // 말풍선 지우고 계속 이동
        speechBubble.style.display = 'none';
        position += 3;
        ralph.style.left = position + 'px';
        if (position < maxPosition) {
          requestAnimationFrame(animate);
        }
      }, 3000); // 3초 동안 말풍선 표시
    } else {
      position += 3;
      ralph.style.left = position + 'px';
      if (position === 600) {
        bgImg1.style.display = 'block'; // maxPosition에 도달하면 배경 이미지 표시
      }
      if (position < maxPosition) {
        requestAnimationFrame(animate);
      } else {
        fadeOutRalph(); // 랄프가 오른쪽 끝에 도달하면 서서히 사라지게
        setTimeout(() => {
          expandSugarRushImg(); // 랄프가 사라지면 슈가러쉬 이미지 확장 시작
        }, 2000); // 2초 후 슈가러쉬 이미지 확장 시작
      }
    }
  }

  function fadeOutRalph() {
    ralph.style.transition = 'opacity 2s';
    ralph.style.opacity = '0';
  }

  animate();
}

function expandSugarRushImg() {
  const sugarRushImg = document.getElementById('sugarRushImg');
  sugarRushImg.style.transition = 'width 2s, height 2s';
  sugarRushImg.style.transition = 'bottom 2s, height 2s';
  sugarRushImg.style.width = '100%';
  sugarRushImg.style.bottom = '200px';
}