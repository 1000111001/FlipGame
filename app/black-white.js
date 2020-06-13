var Math = Stage.Math, Mouse = Stage.Mouse;

function Game(stage, width, height) {

  this.board = Stage.create().appendTo(stage).pin({
    width : width * 2,
    height : height * 2,
    align : 0.5
  });
  Stage.image('example:blue').appendTo(this.board).pin({
    alignX : 0.5,
    alignY : 0.5,
    handleY : 0.5,
    scaleX : 1.05 * width / 8,
    scaleY : 1.05 * height / 8,
  });

  var game = this;
  // Stage.image('easy').appendTo(this.board).pin({
  //   alignX : 1,
  //   alignY : 1,
  //   handleY : 0,
  //   offsetX : -2,
  //   offsetY : 0.5
  // }).on(Mouse.CLICK, function() {
  //   game.start();
  // });

  Stage.image('hard').appendTo(this.board).pin({
    alignX : 1,
    alignY : 1,
    handleY : 0,
    offsetX : 0.1,
    offsetY : 0.5
  }).on(Mouse.CLICK, function() {
    game.start();
  });

  var tiles = [];
  var tilesMap = {};

  this.start = function() {
    for (var i = tiles.length - 1; i >= 0; --i) {
      tiles[i].img.remove();
    }
    tilesMap = {}, tiles = [];
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        var tile = new Tile(1, i, j);
        tile.init(this.board);
        setTile(i, j, tile);
      }
    }
  };

  this.click = function(tile) {
    var tiles = [ tile ];
    tiles = tiles.concat(getNeighbour(tile));
    tiles.forEach(t => {
      t.toggle();
    });
  };

  function getNeighbour(tile) {
    var ret = [];
    if (tile.i - 1 >= 0) ret.push(getTile(tile.i - 1, tile.j));
    if (tile.i + 1 < width) ret.push(getTile(tile.i + 1, tile.j));
    if (tile.j - 1 >= 0) ret.push(getTile(tile.i, tile.j - 1));
    if (tile.j + 1 < height) ret.push(getTile(tile.i, tile.j + 1));
    return ret;
  }

  function getTile(i, j) {
    return tilesMap[i + ':' + j];
  }

  function setTile(i, j, tile) {
    if (tilesMap[i + ':' + j]) {
      console.log('Location unavailable: ' + i + ':' + j);
      return;
    }
    tilesMap[i + ':' + j] = tile;
    tiles.push(tile);
  }

  function Tile(color, i, j) {
    this.color = color;
    this.i = i;
    this.j = j;
  }

  Tile.prototype.init = function(board) {
    var tile = this;
    var img = Stage.image(this.getImage()).pin({
      handle : 0.5,
      scale : 0.12
    }).on(Mouse.CLICK, function(point) {
      game.click(tile);
    });
    img.appendTo(board).offset(tile.i * 2 + 1, tile.j * 2 + 1);
    this.img = img;
  };

  Tile.prototype.setColor = function(color) {
      this.color = color;
      this.updateView();
  };

  Tile.prototype.toggle = function() {
    this.color = this.color == 1 ? 2 : 1;
    this.updateView();
  };

  Tile.prototype.updateView = function() {
    this.img.image(this.getImage());
  };

  Tile.prototype.getImage = function() {
    return "example:tile-" + this.color;
  }
  
}

Stage(function(stage) {

  stage.background('#555555');
  stage.viewbox(24, 24);

  var width = 8, height = 8;

  // create game with ui callbacks
  var game = new Game(stage, width, height);

  game.start();

});
