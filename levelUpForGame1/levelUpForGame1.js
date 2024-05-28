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
  if (isGame1Cleared == true && event.code === 'Enter') {
    levelUp1.style.display = 'none';
    setGame2();
    event.preventDefault(); // Escape의 기본 동작을 방지
  }
});

setInterval(typing, 200);

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function moveRalph() {
  const ralph = document.getElementById('ralph1');
  const speechBubble = document.getElementById('speechBubble');
  let position = 0;
  const stopPosition = 399; // 중간에 멈추는 위치
  const containerWidth = document.getElementById('levelUp1').clientWidth;
  const ralphWidth = ralph.clientWidth;
  const maxPosition = containerWidth - ralphWidth; // 랄프가 이동할 수 있는 최대 위치
  const bgImg1 = document.getElementById('bgImg1');

  function animate() {
    console.log(maxPosition);
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
      }
    }
  }
  animate();
}

let content1 = '게임 안에 갇혀버린 바넬로피. 바넬로피를 구하기 위해 ';

function typing(content) {
  const text = document.querySelector('.text');
  text.innerHTML = ''; // Clear the text content before starting new typing animation
  let i = 0;
  function type() {
    if (i < content.length) {
      let txt = content[i++];
      text.innerHTML += txt === '\n' ? '<br/>' : txt;
      setTimeout(type, 100); // Adjust typing speed by changing the timeout duration
    }
  }
  type();
}

// 첫번째에는 랄프 혼자 슈가러쉬로 이동
// 두번째에는 킹캔디를 따라 히어로즈듀티로 이동
// 세번째 엔딩 페이지에는
