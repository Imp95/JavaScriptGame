function testeCollisions() {
    testeCollisionsAvecMurs(joueur);
    testCollisionsEnnemisMurs();
	testCollisionsFoodMurs();
    testCollisionJoueursEnnemis();
	
	testCollisionJoueursFood();
	testCollisionJoueursLife();
  }

  function testCollisionsEnnemisMurs() {
    ennemis.forEach((el) => {
      testeCollisionsAvecMurs(el);
    })
    
   joueur.draw(ctx);
   
 }
 
   function testCollisionsFoodMurs() {
    food.forEach((el) => {
      testeCollisionsAvecMurs(el);
    })
	extraLife.forEach((el) => {
      testeCollisionsAvecMurs(el);
    })
    
   joueur.draw(ctx);
   
 }
 function testeCollisionsAvecMurs(r) {
   // MURS DROITE ET GAUCHE
   
   if(r instanceof Rectangle){
	      if((r.x + r.l) > canvas.width) {
     // detection avec mur de droite
     // on met la vitesse horizontale a zero
     r.vitesseX = -r.vitesseX;
     // on le remet au point de contact
     r.x = canvas.width - r.l;
   } else if((r.x) < 0) {
     // detection avec mur de gauche
     // on met la vitesse horizontale a zero
     r.vitesseX = -r.vitesseX;
     // on le remet au point de contact
     r.x = 0;
   }
   
   // MURS BAS ET HAUT
   if((r.y + r.h) > canvas.height) {
     // detection avec mur de droite
     // on met la vitesse horizontale a zero
     r.vitesseY = -r.vitesseY;
     // on le remet au point de contact
     r.y = canvas.height - r.h;
   } else if((r.y) < 0) {
     // detection avec mur de gauche
     // on met la vitesse horizontale a zero
     r.vitesseY = -r.vitesseY;
     // on le remet au point de contact
     r.y = 0;
   }
   }
   else if (r instanceof Circle){
	      if((r.x + r.r) > canvas.width) {
     // detection avec mur de droite
     // on met la vitesse horizontale a zero
     r.vitesseX = -r.vitesseX;
     // on le remet au point de contact
     r.x = canvas.width - r.r;
   } else if((r.x - r.r) < 0) {
     // detection avec mur de gauche
     // on met la vitesse horizontale a zero
     r.vitesseX = -r.vitesseX;
     // on le remet au point de contact
     r.x = r.r;
   }
   
   // MURS BAS ET HAUT
   if((r.y + r.r) > canvas.height) {
     // detection avec mur de droite
     // on met la vitesse horizontale a zero
     r.vitesseY = -r.vitesseY;
     // on le remet au point de contact
     r.y = canvas.height - r.r;
   } else if((r.y) < 0) {
     // detection avec mur de gauche
     // on met la vitesse horizontale a zero
     r.vitesseY = -r.vitesseY;
     // on le remet au point de contact
     r.y = r.r;
   }
   }

 }
 
 function testCollisionJoueursEnnemis() {
   ennemis.forEach((el) => {
	   if(el instanceof Rectangle){
		            if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                  el.x, el.y, el.l, el.h)) {
     //console.log("collision");
     el.couleur = 'pink';
	 PlayHitSound();
	 life--;
	 joueur.x=0;
	 joueur.y=0;
   } else {
     el.couleur = 'red';
   }     
	   }else   if(el instanceof Circle){
		            if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                  el.x-el.r, el.y-el.r, el.r*2, el.r*2)) {
     //console.log("collision");
     el.couleur = 'pink';
	 life--;
	 PlayHitSound();
	 joueur.x=0;
	 joueur.y=0;
   } else {
     el.couleur = 'red';
   }     
	   }
 
  })
  
  if(life==0){PlayGameOverSound();}
   
 }
 
  function testCollisionJoueursFood() {
	  var markfordelete = [];
   food.forEach((el) => {
	   if(el instanceof Rectangle){
		            if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                  el.x, el.y, el.l, el.h)) {
     //console.log("collision");
	 score++;
	 PlayScoreSound();
     markfordelete.push(el);
   }    
	   }else   if(el instanceof Circle){
		            if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                  el.x-el.r, el.y-el.r, el.r*2, el.r*2)) {
     //console.log("collision");
    score++;
	PlayScoreSound();
     markfordelete.push(el);
   }
	   }
 
  });
  markfordelete.forEach((el) => {
	  remove(food,el);
  });
   
 }
 
   function testCollisionJoueursLife() {
	  var markfordelete = [];
   extraLife.forEach((el) => {
	   if(el instanceof Rectangle){
		            if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                  el.x, el.y, el.l, el.h)) {
     //console.log("collision");
	 life++;
	 PlayScoreSound();
     markfordelete.push(el);
   }    
	   }else   if(el instanceof Circle){
		            if(rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h,
                  el.x-el.r, el.y-el.r, el.r*2, el.r*2)) {
     //console.log("collision");
    life++;
	PlayScoreSound();
     markfordelete.push(el);
   }
	   }
 
  });
  markfordelete.forEach((el) => {
	  remove(extraLife,el);
  });
   
 }
 
 // Collisions between aligned rectangles
 // dans collision.js
 function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  
   if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
      return false; // No horizontal axis projection overlap
   if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
      return false; // No vertical axis projection overlap
   return true; // If previous tests failed, then both axis projections
                // overlap and the rectangles intersect
 }
 
 function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}