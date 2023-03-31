let img;
let colors = [];
let canvasSize = 700;
let paletteHeight = 30;
let tolerance = 25;

let images = [
    'Landscape.jpg',
    'Canada.png',
    'Unal.png',
    'Rainbow.png',
    'Urus.jpg',
    'Colombia.jpg',
    'Cristales.jpeg'
];

function preload() {
  let index = floor(random(images.length));
  img = loadImage('/showcase/assets/' + images[index]);
}

function setup() {
  let canvasHeight = round(img.height*canvasSize/img.width)+paletteHeight+5;
  createCanvas(canvasSize, canvasHeight);
  image(img,  0, 0, canvasSize, canvasHeight-paletteHeight-5);
  extractColors();
  colors = colors.sort((b, a) => a[1] - b[1]);
  colors = colors.slice(0,7);
  colors = colors.sort((b, a) => colorNumber(a[0]) - colorNumber(b[0]));
  console.log(colors);
  showPalette();
}
function extractColors() {
  colors = [];
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = color(img.get(x, y));
      let found = false;
      for (let i = 0; i < colors.length; i++) {
        let existingColor = colors[i][0];
        if (colorDistance(existingColor, c) < tolerance) { // tolerance range
          found = true;
          colors[i][1]++;
          break;
        }
      }
      if (!found) {
        colors.push([c, 1]);
      }
    }
  }
}

function showPalette() {
  noStroke();
  let swatchSize = width / colors.length;
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i][0]);
    rect(i * swatchSize, height - paletteHeight, swatchSize, paletteHeight);
  }
}

function colorNumber(c) {
    return 256*256*red(c) + 256*green(c) + blue(c);
}

function colorDistance(c1, c2) {
  let rDiff = red(c1) - red(c2);
  let gDiff = green(c1) - green(c2);
  let bDiff = blue(c1) - blue(c2);
  return sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}
