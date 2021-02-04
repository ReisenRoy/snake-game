game.setEvents = function() {
  window.addEventListener("keydown", e => {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      this.snake.startMoving(e.keyCode);
    }
  });
};

game.snake.startMoving = function(keyCode) {
  this.moving = true;
  switch(keyCode) {
    case 38: 
      this.direction = this.directions.up;
      break;
    case 37: 
      this.direction = this.directions.left;
      break;
    case 39: 
      this.direction = this.directions.right;
      break;
    case 40: 
      this.direction = this.directions.down;
      break;
  }
};