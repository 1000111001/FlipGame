var Math = Stage.Math,
    Mouse = Stage.Mouse;

DEBUG = false;

function Game(stage, width, height) {

    this.leftBoard = new Board(stage, width, height, -8, 0);
    this.rightBoard = new Board(stage, width, height, 8, 0);

    var game = this;

    Stage.image('hard').appendTo(this.rightBoard.obj).pin({
        alignX: 1,
        alignY: 1,
        handleY: 0,
        offsetX: 0.1,
        offsetY: 0.0
    }).on(Mouse.CLICK, function() {
        game.start();
    });

    Stage.image('example:hint').appendTo(this.rightBoard.obj).pin({
        alignX: 1,
        alignY: 1,
        handleY: 0,
        offsetX: -2,
        offsetY: 0.5,
        scale : 0.15,
    }).on(Mouse.CLICK, function() {
        game.hintClick();
    });
    
    var tips = 'click grids to set puzzle';
    Stage.string('example:alpha').value(tips)
        .pin({alignY: 0.5, offsetX:0, offsetY: 9, scale : 0.12, })
        .appendTo(this.leftBoard.obj);

    this.start = function() {
        this.leftBoard.initTiles();
        this.leftBoard.registerTileClick(this.setPazzleClick);
        this.rightBoard.initTiles();
        this.rightBoard.registerTileClick(this.gameplayClick);
    };

    this.gameplayClick = function(tile) {
        var tiles = [tile];
        tiles = tiles.concat(tile.board.getNeighbour(tile));
        tiles.forEach(t => {
            t.toggle();
        });
    };

    this.setPazzleClick = function(tile) {
        tile.toggle();
    }

    this.hintClick = function() {
        var solver = new Solver();
        var n = 8;
        var b = new Array(n * n);
        b.fill(0);
        for (var i = 0; i< this.leftBoard.tiles.length; ++i) {
            b[i] = this.leftBoard.tiles[i].color == 2 ? 1 : 0;
        }
        var result = solver.solve(n, b);
        for (var i = 0; i < result.length; ++i) {
            this.rightBoard.tiles[i].setHighLight(result[i] == 1);
        }
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
