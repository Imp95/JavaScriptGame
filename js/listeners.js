function traiteKeydown(evt) {
    if(gameOver == true){
		life=5;
		score=0;
		niveau=0;
		startLevel();
		gameOver = false;
		requestAnimationFrame(animation);
	}
}