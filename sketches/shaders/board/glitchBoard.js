let screen;
let effectShader;

function preload(){
  effectShader = loadShader('/showcase/sketches/shaders/board/shader.vert', '/showcase/sketches/shaders/board/shader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height);
  screen.background('#1E1E37');
  screen.stroke(255);
  screen.strokeWeight(5);
  
  shader(effectShader);
}

function draw() {
  if(mouseIsPressed){
    screen.line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  effectShader.setUniform('texture', screen);
  effectShader.setUniform('noise', getNoiseValue());
  
  rect(-width/2, -height/2, width, height);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    screen.background('#1E1E37');
  }
}

function getNoiseValue(){
  return random()/50;
}