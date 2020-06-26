function Tile(board, color, i, j) {
    this.board = board;
    this.color = color;
    this.i = i;
    this.j = j;
}

Tile.prototype.init = function(board) {
    var tile = this;
    var img = Stage.image(this.getImage()).pin({
        handle: 0.5,
        scale: 0.12
    }).on(Mouse.CLICK, function(point) {
        tile.click(tile);
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

function Board(stage, width, height, x, y) {
    this.obj = Stage.create().appendTo(stage).pin({
        width: width * 2,
        height: height * 2,
        offsetX: x,
        offsetY: y,
        scaleX: 0.8,
        scaleY: 0.8,
        align: 0.5
    });
    Stage.image('example:blue').appendTo(this.obj).pin({
        alignX: 0.5,
        alignY: 0.5,
        handleY: 0.5,
        scaleX: 1.05 * width / 8,
        scaleY: 1.05 * height / 8,
    });
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.tilesMap = {};
};

Board.prototype.registerTileClick = function(callback) {
    this.tiles.forEach(t => {
        t.click = callback;
    });
};

Board.prototype.getNeighbour = function(tile) {
    var ret = [];
    if (tile.i - 1 >= 0) ret.push(this.getTile(tile.i - 1, tile.j));
    if (tile.i + 1 < this.width) ret.push(this.getTile(tile.i + 1, tile.j));
    if (tile.j - 1 >= 0) ret.push(this.getTile(tile.i, tile.j - 1));
    if (tile.j + 1 < this.height) ret.push(this.getTile(tile.i, tile.j + 1));
    return ret;
}

Board.prototype.getTile = function(i, j) {
    return this.tilesMap[i + ':' + j];
}

Board.prototype.setTile = function(i, j, tile) {
    if (this.tilesMap[i + ':' + j]) {
        console.log('Location unavailable: ' + i + ':' + j);
        return;
    }
    this.tilesMap[i + ':' + j] = tile;
    this.tiles.push(tile);
}

Board.prototype.initTiles = function() {
    for (var i = this.tiles.length - 1; i >= 0; --i) {
        this.tiles[i].img.remove();
    }
    this.tiles = [];
    this.tilesMap = {};
    for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.height; j++) {
            var tile = new Tile(this, 1, i, j);
            tile.init(this.obj);
            this.setTile(i, j, tile);
        }
    }
    return this;
}