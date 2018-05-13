// Une classe pour le rectangle
// typiquement dans rectangle.js
class Rectangle {
    constructor(x, y, l, h, couleur,resize) {
      this.x = x || 0;
      this.y = y || 0;
      this.l = l || 20;
      this.h = h || 20;
      this.couleur = couleur || 'black';
	  this.resize = resize || false;
      this.vitesseX = 0; // en pixels par image d'animation
      this.vitesseY = 0; // en pixels par image d'animation
      this.vitesseMax = 3;
	  this.sizeCoef=0;
	  
	  this.initL= this.l/2;
	  this.initH= this.h/2;
  
    }
    
    draw(ctx) {
      // Bonne pratique : si on modifie le contexte
      // couleur, epaisseur du trait, repere geometrique etc
      // on sauvegarde au debut de la fonction, on restaure a
      // la fin
      ctx.save();
      
      /*ctx.fillStyle = this.couleur;
	  ctx.fillRect(this.x, this.y, this.l, this.h);*/
	  	  if(this.couleur=="blue"){
		ctx.drawImage(imageLife,this.x, this.y, this.l, this.h)
	  }
	  else if(this.couleur=="red"){
		ctx.drawImage(imageDanger,this.x, this.y, this.l, this.h)
	  }
	  else if(this.couleur=="green"){
		ctx.drawImage(imageFood,this.x, this.y, this.l, auto)
	  }
      
      ctx.restore();
    }
    
    move() {
      this.x += this.vitesseX;
      this.y += this.vitesseY;
	  if(this.resize){
	  	  this.sizeCoef+=0.1;
		  var resizer = Math.cos(this.sizeCoef);
		  resizer*=resizer;
	  
		  this.l=this.initL*resizer + this.initL;
		  this.h=this.initH*resizer + this.initH;
	  }

    }
  }
  class Joueur {
    constructor(x, y, l, h, couleur,vitesse) {
      this.x = x || 0;
      this.y = y || 0;
      this.l = l || 20;
      this.h = h || 20;
      this.couleur = couleur || 'blue';
      this.v = vitesse || 4;
  
    }
    
    draw(ctx) {
      // Bonne pratique : si on modifie le contexte
      // couleur, epaisseur du trait, repere geometrique etc
      // on sauvegarde au debut de la fonction, on restaure a
      // la fin
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.translate(-this.l/2, -this.h/2);
      ctx.fillStyle = this.couleur;
	  ctx.fillRect(0, 0, this.l, this.h);
      
      ctx.restore();
    }
    
    move(mousepos) {
          let dx = this.x - mousepos.x;
    let dy = this.y - mousepos.y;
    this.angle = Math.atan2(dy, dx);
    
    if (distance(this.x, this.y, mousepos.x, mousepos.y) >= (this.l + this.h)/2) {
        this.x -= this.v * Math.cos(this.angle);
        this.y -= this.v * Math.sin(this.angle);
    }

    }
  }