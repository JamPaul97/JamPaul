var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
let resizing = false;
function windowResized(){
  clear();
  resizing = true;
  frameCount= 0;
  setup();
}
function setup() {
  resizing= true;
  fadeInterval = 1.6;
  symbolSize = 14;
  let div = document.getElementById("Banner");
  let canvas = createCanvas(
    div.offsetWidth,
    div.offsetHeight
  );
  canvas.parent("Banner");
  background(0);
  frameRate(23);
  streams= [];
  var x = 0;
  for (var i = 0; i <= canvas.width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }
  streams.forEach(function(stream){
    console.log(stream);
  });
  textFont('Consolas');
  textSize(symbolSize);
  resizing = false;
}

function draw() {
  if(resizing)
  {return;}
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + floor(random(0, 97))
        );
      } else {
        // set it to numeric
        this.value = floor(random(0,10));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 22);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}