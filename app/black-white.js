var Math = Stage.Math,
    Mouse = Stage.Mouse;

function Game(stage, width, height) {

    this.leftBoard = new Board(stage, width, height, -8, 0);
    this.rightBoard = new Board(stage, width, height, 8, 0);

    var game = this;

    Stage.image('hard').appendTo(this.rightBoard.obj).pin({
        alignX: 1,
        alignY: 1,
        handleY: 0,
        offsetX: 0.1,
        offsetY: 0.5
    }).on(Mouse.CLICK, function() {
        game.start();
    });

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
}

Stage(function(stage) {

    stage.background('#555555');
    stage.viewbox(24, 24);

    var width = 8, height = 8;

    // create game with ui callbacks
    var game = new Game(stage, width, height);

    game.start();

});
