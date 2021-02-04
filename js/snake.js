game.snake = {
  // чтобы получить доступ к game, находясь в snake
  game: game,
  cells: [],
  moving: false,
  directions: {
    up: {
      row: -1,
      col: 0,
      angle: 0,
    },

    down: {
      row: 1,
      col: 0,
      angle: 180,
    },

    left: {
      row: 0,
      col: -1,
      angle: 270,
    },

    right: {
      row: 0,
      col: 1,
      angle: 90,
    }
  },
  direction: false,
  verticalOffset: 0,
  horizontalOffset: 0,

  create() {
    let startCells = [{row: 7, col: 7}, {row: 8, col: 7}];
    this.direction = this.directions.up;

    for(let startCell of startCells) {
      this.cells.push(this.game.board.getCell(startCell.row, startCell.col));
    }
  },

  renderHead() {
    let head = this.cells[0];
    let halfSize = this.game.sprites.head.width / 2;
    
    // сохранить исходное состояние контекста (под нужным уголм крутить будем контекст, а не голову змеи, затем отрисовывать голову и возвращать контекст на место)
    this.game.ctx.save();
    //перемещаем точку начала отсчета координат в координаты головы (в центр)
    this.game.ctx.translate(head.x + halfSize, head.y + halfSize);

    //вращаем контекст
    let degree = this.direction.angle;
    let radian = degree * (Math.PI / 180);
    this.game.ctx.rotate(radian);

    // отрисовываем голову с учетом поворота контекста
    this.game.ctx.drawImage(this.game.sprites.head, -halfSize, -halfSize);

    // возвращаем контекст
    this.game.ctx.restore();

  },

  renderBody() {
    for (let i = 1; i < this.cells.length; i++) {
      this.game.ctx.drawImage(this.game.sprites.body, this.cells[i].x, this.cells[i].y);
    }
  },

  render() {
    this.renderHead();
    this.renderBody();
  },

  move() {
    if (!this.moving) {
      return;
    }
    // если змейка в движении:
    // 1. получить координаты следующей ячейки с исп метода getNextCell()
    let nextCell = this.getNextCell();

    //проверяем случаи конца игры
     // 1. конец доски, бомба, тело змеи
    if (!nextCell || nextCell.type === "bomb" || this.hasCell(nextCell)) {
      this.game.end();
      // 2. если все ок продолжаем
    } else {
      this.cells.unshift(nextCell);

        // если след ячейка пустая - просто движемся
      if (nextCell.type !== "food") {
        this.cells.pop();
        // если след ячейка еда - едим
      } else {
        this.game.score +=1;
        this.game.board.createFood();
        if (this.game.score % 5 === 0) this.game.board.createBomb();
      }
    }
  },

  getNextCell() {
    let head = this.cells[0];
    let row = head.row + this.direction.row;
    let col = head.col + this.direction.col;

    return this.game.board.getCell(row, col);
  },

  hasCell(cell) {
    return this.cells.find(part => part === cell);
  },
};