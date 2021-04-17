function Tile(board, color, i, j) {
    this.board = board;
    this.color = color;
    this.i = i;
    this.j = j;
    this.highLight = null;
}

Tile.prototype.init = function(board) {
    var tile = this;
    var img = Stage.image(this.getImage()).pin({
        // handle: 0.5,
        // scale: 0.12,
    }).on(Mouse.CLICK, function(point) {
        tile.click(tile);
        tile.setHighLight(false);
    });
    img.appendTo(board);
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

Tile.prototype.setHighLight = function(active) {
    if (active) {
        !this.highLight && (this.highLight = Stage.image("example:highLight").appendTo(this.img).scale(1.1).pin({"align":0.5}));
    }
    else if (this.highLight) {
        this.img.remove(this.highLight);
        this.highLight = null;
    }
}

Tile.prototype.updateView = function() {
    this.img.image(this.getImage());
};

Tile.prototype.getImage = function() {
    return "example:tile-" + this.color;
}

function Board(stage, width, height, x, y) {
    this.obj = Stage.image('example:blue').appendTo(stage).pin({
        offsetX: x,
        offsetY: y,
        scale: 1,
        align: 0.5,
    });
    this.board = Stage.create().appendTo(this.obj).pin({
        width: this.obj.pin("width"),
        height: this.obj.pin("height"),
        align: 0.5,
        handleY: 0.5,
        scale : 0.96,
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

Board.prototype.setHighLight = function(i, j, highLight) {
    var tile = this.tilesMap[i + ":" + j];
    tile && tile.setHighLight(highLight);
}

Board.prototype.initTiles = function() {
    for (var i = this.tiles.length - 1; i >= 0; --i) {
        this.tiles[i].img.remove();
    }
    this.tiles = [];
    this.tilesMap = {};
    var spacing = 0.1;
    var scale = 1 / (this.width + (this.width - 1) * spacing);
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            var tile = new Tile(this, 1, i, j);
            tile.init(this.board);
            tile.img.scale(scale);
            var tw = tile.img.pin("width");
            var x = scale * ((1 + spacing) * tw * tile.i);
            var y = scale * ((1 + spacing) * tw * tile.j);
            tile.img.offset(x, y);
            this.setTile(i, j, tile);
        }
    }
    return this;
}