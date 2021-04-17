Stage({
  name : "main",
  image : { src : "./main.png", ratio : 32 },
  textures : {
    "easy"   : { x : 0,   y : 0,  width : 2,  height : 2 },
    "hard"   : { x : 2,   y : 0,  width : 2,  height : 2 },
    "tile-1" : { x : 4,   y : 0,  width : 2,  height : 2 },
    "tile-2" : { x : 6,   y : 0,  width : 2,  height : 2 },
    "tile-3" : { x : 8,   y : 0,  width : 2,  height : 2 },
    "tile-4" : { x : 10,  y : 0,  width : 2,  height : 2 },
    "tile-5" : { x : 12,  y : 0,  width : 2,  height : 2 },
    "tile-6" : { x : 14,  y : 0,  width : 2,  height : 2 }
  }
});

var example = {
  name : "example",
  image : { src : "./example.png", ratio : 4 },
  trim : 0.2,
  textures : {
    "tile-1" :  { x : 1*16, y : 0,  width : 16, height : 16 },
    "tile-2" :   { x : 0*16, y : 0,  width : 16, height : 16 },
    
    dark :   { x : 0*16, y : 0,  width : 16, height : 16 },
    light :  { x : 1*16, y : 0,  width : 16, height : 16 },
    blue :   { x : 2*16, y : 0,  width : 16, height : 16 },
    purple : { x : 3*16, y : 0,  width : 16, height : 16 },
    red :    { x : 4*16, y : 0,  width : 16, height : 16 },
    orange : { x : 5*16, y : 0,  width : 16, height : 16 },
    yellow : { x : 6*16, y : 0,  width : 16, height : 16 },
    green :  { x : 7*16, y : 0,  width : 16, height : 16 },

    rainbow : [ 'dark', 'light', 'blue', 'purple', 'red', 'orange', 'yellow', 'green' ],

    digit : {
      '0' : { x : 0*8,  y : 20, width : 8,  height : 8 },
      '1' : { x : 1*8,  y : 20, width : 8,  height : 8 },
      '2' : { x : 2*8,  y : 20, width : 8,  height : 8 },
      '3' : { x : 3*8,  y : 20, width : 8,  height : 8 },
      '4' : { x : 4*8,  y : 20, width : 8,  height : 8 },
      '5' : { x : 5*8,  y : 20, width : 8,  height : 8 },
      '6' : { x : 6*8,  y : 20, width : 8,  height : 8 },
      '7' : { x : 7*8,  y : 20, width : 8,  height : 8 },
      '8' : { x : 8*8,  y : 20, width : 8,  height : 8 },
      '9' : { x : 9*8,  y : 20, width : 8,  height : 8 },
    },

    hint : { x : 80, y : 20, width : 20, height : 10},

    box :      { x : 0,    y : 32, width : 16, height : 16, top : 4, bottom : 4, left : 4, right : 4},
    circle :   { x : 16,   y : 32, width : 16, height : 16},
    highLight : { x : 2*16, y : 32, width : 16, height : 16}
  }
};
var alpahWidth = 3.7;
var alpahHeight = 8;
example.textures.alpha = {};
var a = "abcdefghijklmnopqrstuvwxyz";
for (var i = 0; i < a.length; ++i) {
  example.textures.alpha[a[i]] = { x : i*(alpahWidth + 0.03),  y : 50, width : alpahWidth + 0.2,  height : alpahHeight };
}
example.textures.alpha[' '] = { x : 27*alpahWidth, y : 50, width: alpahWidth, height: alpahHeight};
Stage(example);
