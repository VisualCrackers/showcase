let colorShader;
let picker1;
let picker2;
let color1;
let color2;
let rectColor1;
let rectColor2;
let rectResult;
let offset;

function preload(){
  colorShader = loadShader('/showcase/sketches/shaders/basic.vert', '/showcase/sketches/shaders/basic.frag');
}

function setup() {
  createCanvas(370, 370, WEBGL);
}

function draw() {
  background(255);
  
  shader(colorShader);
  
  beginShape();
  vertex(-1.0, -1.0);
  vertex(1.0, -1.0);
  vertex(1.0, 1.0);
  vertex(-1.0, 1.0);
  endShape();
  
}