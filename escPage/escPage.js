// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//민석
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <div id="escPage">
        <button onclick=PopDownEscPage()>계속하기</button>
        <button onclick= setGameHide(); >나가기</button>
    </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

//민석
document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    PopUpEscPage();
    event.preventDefault(); // Escape의 기본 동작을 방지

    //실행중인 Canvas를 정지시킵니다
  }
});

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//민석
function PopUpEscPage() {
  //현재 pageState의 상태가 'Gaming'인 경우에만 ESC 이벤트 발동
  if (pageState == "Gaming") {
    document.querySelector("#escPage").style.display = "block";
  }
}

//민석
function PopDownEscPage() {
  //계속하기 버튼 클릭시 Canvas활성화, esc창 닫기
  if (document.querySelector("#escPage").style.display == "block") {
    //기존에 정지된 Canvas다시 활성화 시켜주는 코드 구현

    document.querySelector("#escPage").style.display = "none";
  }
}

//민석
function setGameHide() {
  //나가기 버튼 클릭 시 게임 hide해주고, 난이도 선택 화면으로 돌아가기
  moveToStagePage();
  document.querySelector("#game1").style.display = "none";
  document.querySelector("#game2 ").style.display = "none";
  document.querySelector("#game3").style.display = "none";
  document.querySelector("#escPage").style.display = "none";
  pageState = "startPage";
}
