var blockAudio = new Audio(
'https://taira-komori.jpn.org/sound_os2/game01/select01.mp3'
);

var itemAudio = new Audio(
'https://taira-komori.jpn.org/sound_os2/game01/powerup01.mp3'
);

var Game1Audio = new Audio("./source/Game1BGM.mp3");
Game1Audio.loop = true;
Game1Audio.volume = 0.3;

var canPlay = true;
var paddleAudio = new Audio("https://taira-komori.jpn.org/sound_os2/game01/jump09.mp3");

function playPaddleAudio() {
  if (canPlay) {
      paddleAudio.play();
      canPlay = false;
      setTimeout(() => {
          canPlay = true;
      }, 50);
  }
}

var clearAudio = new Audio('.mp3'); // 게임 클리어 소리
var overPageAudio = new Audio('.mp3'); // 게임 오버 소리

var stagePageAudio = new Audio(
    "https://taira-komori.jpn.org/sound_os2/game01/coin01.mp3"
); // 동전 소리

var startPageAudio = new Audio("./source/WreckItRalph_StartPage.mp3");
startPageAudio.loop = true;