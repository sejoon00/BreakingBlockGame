// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
  <section id="levelUp2">
  <h1>게임2에서 게임3으로 레벨업하는 페이지</h1>
  </section>
`
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let levelUp2 = document.querySelector('#levelUp2');

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

const checkDisplayAndSetTimeout2 = () => {
  const interval = setInterval(() => {
      if (window.getComputedStyle(levelUp2).display === 'block') {
      clearInterval(interval);
      setTimeout(() => {
        levelUp2.style.display = 'none';
          moveToStagePage();
      }, 5000);
      }
  }, 100); // 100ms 간격으로 체크
};

checkDisplayAndSetTimeout2();
