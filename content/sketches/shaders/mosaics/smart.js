let n, selected;
let mosaic;
let uv;
let palette;
let pics;
let resolution, quantity;

function preload() {
  mosaic = readShader('/showcase/sketches/shaders/mosaics/smartMosaic.frag', { varyings: Tree.texcoords2 });
  pics = [];
  for(let i=0; i<10; i++) pics.push(loadImage(`/showcase/assets/mosaicPhotos/pic${i}.png`));
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  
  shader(mosaic);
  
  resolution = createSlider(1, 50, 1, 1);
  resolution.position(10, 15);
  resolution.style('width', '80px');
  resolution.input(() => {
    mosaic.setUniform('resolution', resolution.value());
  });
  
  quantity = createSlider(2, 10, 3, 1);
  quantity.position(10, 35);
  quantity.style('width', '80px');
  quantity.input(() => {
    generatePalette();
    mosaic.setUniform('n', quantity.value()-1);
  });
  
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'magenta');
  uv.changed(() => mosaic.setUniform('uv', uv.checked()));
  uv.position(10, 60);
  
  mosaic.setUniform('n', quantity.value()-1);
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('uv', false);
  
  selected = floor(random() * pics.length);
  generatePalette();
  
}

function generatePalette(){
  n = quantity.value();
  palette = createGraphics(720*(n-1),720); //Object with images to shader
  offset = 0;
  
  for(let i=0; i<n; i++){
    if(i!=selected){ //Avoid incluying the selected image
      palette.image(pics[i], 720*offset, 0, 720, 720);
      offset++;
    } 
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    selected = floor(random() * pics.length);
    generatePalette();
  }
}

function draw() {
  background(120);
  mosaic.setUniform('original', pics[selected]);
  mosaic.setUniform('pics', palette);
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

function luma(img) {
  let sum = 0;
  
  // Iterate over each pixel
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Get the pixel color
      let pixelColor = img.get(x, y);
      
      // Extract the red, green, and blue channels
      let r = red(pixelColor);
      let g = green(pixelColor);
      let b = blue(pixelColor);
      
      // Calculate the luma using the formula: Y = 0.299R + 0.587G + 0.114B
      let luma = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Accumulate the luma value
      sum += luma;
    }
  }
  
  // Calculate the average luma by dividing the sum by the total number of pixels
  let averageLuma = sum / (img.width * img.height);
  
  return averageLuma;
}