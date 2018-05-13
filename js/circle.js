class Circle {
    constructor(x, y, r, couleur,resize) {
      this.x = x || 0;
      this.y = y || 0;
      this.r = r || 20;
      this.couleur = couleur || 'black';
	  this.resize = resize || false;
      this.vitesseX = 0; // en pixels par image d'animation
      this.vitesseY = 0; // en pixels par image d'animation
      this.vitesseMax = 3;
	  this.sizeCoef=0;
	  
	  this.initR= this.r/2;
  
    }
    
    draw(ctx) {
      // Bonne pratique : si on modifie le contexte
      // couleur, epaisseur du trait, repere geometrique etc
      // on sauvegarde au debut de la fonction, on restaure a
      // la fin
      ctx.save();
      
      ctx.fillStyle = this.couleur;
	  ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	  ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
    
    move() {
      this.x += this.vitesseX;
      this.y += this.vitesseY;
	  if(this.resize){
	  	  this.sizeCoef+=0.1;
		  var resizer = Math.cos(this.sizeCoef);
		  resizer*=resizer;
	  
		  this.r=this.initR*resizer + this.initR;
	  }

    }
  }