let hitSound;
let scoreSound;
let gameOverSound;
let nextLevelSound;
let ambiantMusic;

function audiotInit(){
	hitSound = new Audio("sounds/hitSound.mp3");
	scoreSound = new Audio("sounds/scoreSound.mp3");
	nextLevelSound = new Audio("sounds/nextLevelSound.mp3");
	gameOverSound = new Audio("sounds/Video_Game_Splash-Ploor-699235037.mp3");
	ambiantMusic = new Audio("sounds/DST-TowerDefenseTheme.mp3");
	ambiantMusic.loop = true
	ambiantMusic.play();
	console.log("son chargee");
}

function PlayGameOverSound(){
	gameOverSound.play();
}
function PlayHitSound(){
	hitSound.play();
}
function PlayScoreSound(){
	scoreSound.play();
}
function PlayNextLevelSound(){
	nextLevelSound.play();
}