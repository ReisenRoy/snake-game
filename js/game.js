/*
ШАГИ:
  1. создаем глобальную переменную game, где будут храниться все данные
  2. init() создает контекст и в нем также проверяеются размеры окна устройства
  3. preload(callback) загружает спрайты изображений, когда все спрайты загружены, в методе start() вызываются run() и create()
  4. create() вносит игровые данные в game
  5. run(), запускающий игру, содержит в себе render() и update()
  6. render() отображает данные, которые были созданы, на canvas
  7. update() обновляет данные в соответствии с изменениями
  8. пока игра запущена (running: true), run() выполняется рекурсивно
*/ 


// null подразумевает, что в будущем в переменную будет помещен объект
let game = {
  running: true,
  canvas: null,
  ctx: null,
  fps: 10,
  width: 0,
  height: 0, 
  dimensions: {
    max: {
      width: 640,
      height: 360,
    },
    min: {
      width: 300,
      height: 300,
    },
  },
  board: null,
  sprites: {
    background: null,
    cell: null,
    body: null,
    head: null,
    food: null,
    bomb: null,
  },
  score: 0,

	preload(callback) {
		let loaded = 0;
		let required = Object.keys(this.sprites).length;

		let onResourceLoad = () => {
			++loaded;
			if (loaded >= required) {
				callback();
			}
		};

		this.preloadSprites(onResourceLoad);
  },
  
  preloadSprites(onResourceLoad) {
		for (let key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = `./img/${key}.png`;
			this.sprites[key].addEventListener("load", onResourceLoad);
		}
  },

  render() {
    // очищаем ctx
    this.ctx.clearRect(0, 0, this.width, this.height);

    // drawImage запланировать графику, но НЕ вывести ее ( requestAnimationFrame - выполняет перерисовку с учетом запланированного )
    this.ctx.drawImage(this.sprites.background, (this.width - this.sprites.background.width) / 2, (this.height - this.sprites.background.height) / 2);
    this.board.render();
    this.snake.render();
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);
  },

  create() {
    // creat`ы заполняют объекты данными
    this.board.create();
    this.snake.create();
    this.board.createFood();
    this.board.createBomb();
  },

  update() {
    this.snake.move();
  },

  run() {
    if(this.running) {
      setTimeout(() => {
        window.requestAnimationFrame(this.run);
        this.update();
        // отрисовка игровых объектов
        this.render();
        this.run();
      }, 1000 / this.fps );
    };
  },

  setTextFonts() {
    this.ctx.font = "20px Cactus";
    this.ctx.fillStyle = "orange";
  },

  init() {
    this.canvas = document.getElementById("mycanvas");
    this.ctx = this.canvas.getContext("2d");
    this.initDimensions(); // in dimensions.js
    //установка игровых событий in events.js
    this.setTextFonts();
    this.setEvents();
  },

  start() {
    this.init();
    this.preload(() => {
    // после загрузки спрайтов и создания игровых объектов:
      // 1. создание игровых объектов
      this.create();
      // 2. запуск игры 
      this.run();
    });
  },

  end() {
    this.running = false;
    let newGame = confirm("Новая игра?");
    if (newGame === true) window.location.reload();
  }
};

window.addEventListener("load", () => {
	game.start();
});