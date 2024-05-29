// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector('main').insertAdjacentHTML(
  'afterbegin',
  `
  <section id="levelUp2">
  <img src="../source/kingCandy.png" id="kingCandy">
  <img src="../source/heroDuty.png" id="heroDuty">
  <img src="../source/ralphAndVanellope.png" id="ralphAndVanellope">

  </section>
`
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let levelUp2 = document.querySelector('#levelUp2');

document.addEventListener('keydown', (event) => {
  if (gameState == 'Gaming2' && event.code === 'Enter' && isGameChanging) {
    levelUp2.style.display = 'none';
    moveToStagePage();
    event.preventDefault(); // Escape의 기본 동작을 방지
    isGameChanging = false;
    //실행중인 Canvas를 정지시킵니다
  }
});

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

// Move kingCandy from left to right and make it jump 3 times upon reaching the right edge, then move it up 350px and fade out
function moveKingCandy() {
  const kingCandy = document.getElementById('kingCandy');
  const ralphAndVanellope = document.getElementById('ralphAndVanellope');
  const heroDuty = document.getElementById('heroDuty');
  let position = 0;
  const containerWidth = document.getElementById('levelUp2').clientWidth;
  const kingCandyWidth = kingCandy.clientWidth;
  const maxPosition2 = containerWidth - kingCandyWidth; // 킹캔디가 이동할 수 있는 최대 위치

  function animate() {
    position += 3;
    kingCandy.style.left = position + 'px';
    if (position < maxPosition2) {
      requestAnimationFrame(animate);
    } else {
      jumpThreeTimes();
    }
  }

  function jumpThreeTimes() {
    let jumpCount = 0;

    function jump() {
      if (jumpCount < 3) {
        kingCandy.classList.add('jump');
        setTimeout(() => {
          kingCandy.classList.remove('jump');
          jumpCount++;
          setTimeout(jump, 200);
        }, 500);
      } else {
        moveUp();
      }
    }

    jump();
  }

  function moveUp() {
    let upPosition = 0;
    const maxUpPosition = 350;
    const upSpeed = 3;

    function animateUp() {
      if (upPosition < maxUpPosition) {
        upPosition += upSpeed;
        kingCandy.style.transform = `translateY(${-upPosition}px)`;
        requestAnimationFrame(animateUp);
      } else {
        fadeOut();
      }
    }

    animateUp();
  }

  function fadeOut() {
    kingCandy.style.transition = 'opacity 2s';
    kingCandy.style.opacity = '0';
    ralphAndVanellope.style.display = 'block';

    setTimeout(() => {
      moveRalphAndVanellope();
    }, 2000);
  }

  function moveRalphAndVanellope() {
    let position = 0;
    const startPosition = 0;
    const maxPosition3 = containerWidth - ralphAndVanellope.clientWidth;

    ralphAndVanellope.style.left = startPosition + 'px';
    ralphAndVanellope.style.position = 'absolute';

    function animateRight() {
      position += 3;
      ralphAndVanellope.style.left = startPosition + position + 'px';
      if (position < maxPosition3 - startPosition) {
        requestAnimationFrame(animateRight);
      } else {
        moveUpAndFadeOutRalphAndVanellope();
      }
    }

    function moveUpAndFadeOutRalphAndVanellope() {
      let upPosition = 0;
      const maxUpPosition = 300;
      const upSpeed = 3;

      function animateUp() {
        if (upPosition < maxUpPosition) {
          upPosition += upSpeed;
          ralphAndVanellope.style.transform = `translateY(${-upPosition}px)`;
          requestAnimationFrame(animateUp);
        } else {
          fadeOutRalphAndVanellope();
        }
      }

      animateUp();
    }

    function fadeOutRalphAndVanellope() {
      ralphAndVanellope.style.transition = 'opacity 2s';
      ralphAndVanellope.style.opacity = '0';
      setTimeout(() => {
        expandHeroDuty();
      }, 2000);
    }

    animateRight();
  }

  function expandHeroDuty() {
    heroDuty.style.transition = 'width 2s, height 2s';
    heroDuty.style.transition = 'bottom 2s, height 2s';
    heroDuty.style.width = '100%';
    heroDuty.style.bottom = '0';
  }

  animate();
}
