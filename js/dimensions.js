game.initDimensions = function() {
  let data = {
    maxWidth: this.dimensions.max.width,
    maxHeight: this.dimensions.max.height,
    minWidth: this.dimensions.min.width,
    minHeight: this.dimensions.min.height,
    realWidth: window.innerWidth,
    realHeight: window.innerHeight,
  };

  // соотношение шире запланированного
  if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
    this.fitWidth(data);
  } else {
    this.fitHeight(data);
  }

  this.canvas.width = this.width;
  this.canvas.height = this.height;
};

game.fitWidth = function(data) {
  this.width = Math.round(data.realHeight * data.maxWidth / data.realWidth);
  this.width = Math.min(this.height, data.maxHeight);
  this.width = Math.max(this.height, data.minHeight);
  this.height = Math.round(this.width * data.realHeight / data.realWidth);
  this.canvas.style.width = "100%";
};

game.fitHeight = function(data) {
  this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
  this.width = Math.min(this.width, data.maxWidth);
  this.width = Math.max(this.width, data.minWidth);
  this.height = Math.round(this.width * data.realHeight / data.realWidth);
  this.canvas.style.height = "100%";
};