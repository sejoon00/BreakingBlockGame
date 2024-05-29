// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector('main').insertAdjacentHTML(
  'afterbegin',
  `
    <section id="levelUp3">
    <div id="fireworks-container">
       <div id="endingContainer">
         <img src="./source/endingScreen.png" id="endingScreen">
       </div>
     </div>
    </section>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let levelUp3 = document.querySelector('#levelUp3');

document.addEventListener('keydown', (event) => {
  if (gameState == 'Gaming3' && event.code === 'Enter' && isGameChanging) {
    levelUp3.style.display = 'none';
    moveToStagePage();
    event.preventDefault(); // Escape의 기본 동작을 방지
    isGameChanging = false;

    //실행중인 Canvas를 정지시킵니다
  }
});

function fireWorks() {
  const container = document.getElementById('fireworks-container');
  setInterval(createFirework, 50); // Create fireworks at intervals

  function createFirework() {
    console.log('fireWork');
    const firework = document.createElement('div');
    firework.classList.add('firework');
    const size = Math.random() * 10 + 2 + 'px';
    firework.style.width = size;
    firework.style.height = size;
    firework.style.top = Math.random() * window.innerHeight + 'px';
    firework.style.left = Math.random() * window.innerWidth + 'px';
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    container.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 1500);
  }
}

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/