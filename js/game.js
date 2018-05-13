window.onload = init;

let canvas, ctx;
let ennemis = [];
let mousepos = { x: 0, y: 0 };
let gameOver = false;
let life;
let extraLife = [];
let score;
let food = [];
let niveau;

// main.js
function init() {
  console.log("page chargee");
  
  // 1 On recupere un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  
  // 2 On recupere le contexte graphique pour dessiner
  // dans le canvas
  ctx = canvas.getContext("2d");
  
      canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);
  
  // 3 on dessine pour verifier que ca marche
  //ctx.fillStyle = 'red';
  //ctx.fillRect(10, 10, 100, 100);
  /*rect1 = new Rectangle(10, 10, 30, 30, 'red',true);
  rect1.vitesseX = 5;
  rect1.vitesseY=3;
  ennemis.push(rect1);
  
   rect2 = new Rectangle(110, 110, 100, 100, 'green');
    rect2.vitesseY = 2;
  ennemis.push(rect2);
  
  circle1 = new Circle(50,50,20,'red',true);
  circle1.vitesseX = 3;
  circle1.vitesseY=5;
  ennemis.push(circle1);*/
  audiotInit();
  ImageInit();
  life=5;
  score=0;
  niveau=0;
  joueur = new Joueur(20, 250, 10, 10, 'blue');
  startLevel();
  window.onkeydown = traiteKeydown;

  // on demarre l'animation
  requestAnimationFrame(animation);
}



// Boucle d'animation
// typiquement dans game.js
function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 2 on dessine et on deplace
  dessineEtDeplaceLesObjets();
  

  
  // 3 on teste les collisions
  testeCollisions();
  
  if(food.length == 0){
	  startLevel();
  }
  gameOver=(life==0)
  
	ctx.save();
    ctx.font = "20px Arial";
	ctx.fillText("Life = "+life+"\t\t\t\tScore = "+score+"\t\t\t\tNiveau = "+niveau,10,30); 
	ctx.restore();
	
  // 4 on rappelle la boucle d'animation 60 fois / s
  if(!gameOver){
	  requestAnimationFrame(animation);
  } else {
	  ctx.save();
	  ctx.font = "40px Arial";
	  ctx.textAlign = "center";
	  ctx.fillText("Game Over. Press any key to restart",canvas.width/2,canvas.height/2); 
	  ctx.restore();
  }
}


function dessineEtDeplaceLesObjets() {
   ennemis.forEach((el) => {
     el.draw(ctx);
     el.move();
   })
   
   food.forEach((el) => {
     el.draw(ctx);
     el.move();
   })
   
   extraLife.forEach((el) => {
     el.draw(ctx);
     el.move();
   })
   
   joueur.move(mousepos);
   joueur.draw(ctx);
}

function getMousePos(canvas, evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function creerEnnemis(nb){
	for(i = 0;i<nb;i++){
		/*if(Math.floor(Math.random()*2 + 1)==2){
			circle = new Circle(Math.random()*700+100,Math.random()*600,Math.random()*35+10,'red',(Math.floor(Math.random()*2)==0));
			circle.vitesseX = Math.floor(Math.random()*6);
			circle.vitesseY = Math.floor(Math.random()*6);
			ennemis.push(circle);
		} else {*/
			rect = new Rectangle(Math.random()*700+100,Math.random()*600,Math.random()*50+20,Math.random()*50+20,'red',(Math.floor(Math.random()*2)==0));
			rect.vitesseX = Math.floor(Math.random()*6);
			rect.vitesseY = Math.floor(Math.random()*6);
			ennemis.push(rect);
		//}
	}
}
function creerFood(nb){
	for(i = 0;i<nb;i++){
		/*if(Math.floor(Math.random()*2 + 1)==2){
			circle = new Circle(Math.random()*700+100,Math.random()*600,Math.random()*35+10,'green',(Math.floor(Math.random()*2)==0));
			circle.vitesseX = Math.floor(Math.random()*6);
			circle.vitesseY = Math.floor(Math.random()*6);
			food.push(circle);
		} else {*/
			rect = new Rectangle(Math.random()*700+100,Math.random()*600,Math.random()*50+20,Math.random()*50+20,'green',(Math.floor(Math.random()*2)==0));
			rect.vitesseX = Math.floor(Math.random()*6);
			rect.vitesseY = Math.floor(Math.random()*6);
			food.push(rect);
		//}
	}
}

function creerLife(){
	for(i = 0;i<Math.floor(Math.random()*3);i++){
		/*if(Math.floor(Math.random()*2 + 1)==2){
			circle = new Circle(Math.random()*700+100,Math.random()*600,Math.random()*35+10,'blue',(Math.floor(Math.random()*2)==0));
			circle.vitesseX = Math.floor(Math.random()*6);
			circle.vitesseY = Math.floor(Math.random()*6);
			extraLife.push(circle);
		} else {*/
			rect = new Rectangle(Math.random()*700+100,Math.random()*600,Math.random()*50+20,Math.random()*50+20,'blue',(Math.floor(Math.random()*2)==0));
			rect.vitesseX = Math.floor(Math.random()*6);
			rect.vitesseY = Math.floor(Math.random()*6);
			extraLife.push(rect);
		//}
	}
}

function startLevel(){
	PlayNextLevelSound();
	niveau++;
	ennemis = [];
	extraLife = [];
	food = [];
	creerEnnemis(niveau);
	creerFood(niveau);
	creerLife();
	joueur.x=0;
	joueur.y=0;
}

