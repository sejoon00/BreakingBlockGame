// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector("main").insertAdjacentHTML(
    "afterbegin",
    `
    <section id="levelUp1">
        <h1>게임1에서 게임2로 레벨업하는 페이지</h1>
        <h1>skip 하려면 엔터 누르세요</h1>
    </section>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let levelUp1 = document.querySelector('#levelUp1');

document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        levelUp1.style.display = 'none';
        moveToStagePage();
  
      event.preventDefault(); // Escape의 기본 동작을 방지
      //실행중인 Canvas를 정지시킵니다
    }
});

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
