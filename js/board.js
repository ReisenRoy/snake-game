game.board = {
  // чтобы получить доступ к game, находясь в board
  game: game,
  cells: [],
  size: 15,

  create() {
    let cellSize, offsetX, offsetY;
    cellSize = this.game.sprites.cell.width + 1;
    offsetX = (this.game.width - cellSize * this.size) / 2;
    offsetY = (this.game.height - cellSize * this.size) / 2;
    
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push({
          row: row,
          col: col,
					x: cellSize * col + offsetX,
          y: cellSize * row + offsetY,
        });
      }
    }
  },

  createCellObject(type) {
    // получить текующую ячейку и сбросить флаг
    let cell = this.cells.find(cell => cell.type === type);
    if (cell) cell.type = false;

    // получить случайную ячейку и обновить флаг
    cell = this.getAvailableCell();
    cell.type = type;
  },

  createFood() {
    this.createCellObject("food");
  },

  createBomb() {
    this.createCellObject("bomb");
  },
  
  render() {
    for (let cell of this.cells) {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);

      if(cell.type) {
        this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
      }
    }
  },

  getAvailableCell() {
    let pool = this.cells.filter(cell => !cell.type && !this.game.snake.hasCell(cell));
    let index = this.game.getRandomValue(0, pool.length - 1);
    return pool[index];
  },

  getCell(row, col) {
    return this.cells.find(boardCell =>  boardCell.row === row && boardCell.col === col);
  },
};