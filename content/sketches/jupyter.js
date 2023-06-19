// Variables globales
let jupyter;
let moons = [];
let bgTexture;
let europa_texture;
let io_texture;
let ganimedes_texture;
let calisto_texture;

function preload() {

  jupyter_texture = loadImage('/showcase/assets/jupyter_texture.jpeg');
  io_texture = loadImage('/showcase/assets/io_texture.jpg');
  europa_texture = loadImage('/showcase/assets/europa_texture.jpg');
  ganimedes_texture = loadImage('/showcase/assets/ganimedes_texture.jpg');
  calisto_texture = loadImage('/showcase/assets/calisto_texture.jpg');

  bgTexture = loadImage('/showcase/assets/nocheHD.jpg');
}

function setup() {
  createCanvas(700, 700, WEBGL);
  camera(0, -300, 1000, 0, 0, 0, 0, 1, 0);
  
  // Crear jupiter
  jupyter = new Moon(100, 0, 0, 0.02, 0, jupyter_texture);
  
  // Crear lunas
  moons.push(new Moon(15, 200, -60, 0.02, 1, io_texture));

  moons.push(new Moon(10, 300, -20, 0.015, 4,europa_texture));
  
  moons.push(new Moon(30, 400, 20, 0.019, 2, ganimedes_texture));
  
  moons.push(new Moon(20, 600, 30, 0.017, 4, calisto_texture));

}

function draw() {
  
  background('black');
  orbitControl();
  texture(bgTexture);
  sphere(2000);
  noStroke();
  rotateZ(-0.3)
  
  for (let i = 0; i < 3; i++) {
      directionalLight(
            255, 255, 255 - i * 25,//Color
            -1, 1, -1 //Dirección
      );
  }
  
  // Mover y mostrar jupiter
  jupyter.update();
  jupyter.show();
  
  // Mover y mostrar las lunas
  for (let i = 0; i < moons.length; i++) {
    moons[i].update();
    moons[i].show();
  }
}

class Moon {
  constructor(radius, distance, distanceY, speed, angle, textura) {
    this.radius = radius;
    this.distance = distance;
    this.distanceY = distanceY;
    this.speed = speed;
    this.angle = angle;
    this.textura = textura;
    this.orbitAngle = 0;
  }
  
  update() {
    this.angle -= this.speed;
    this.orbitAngle += this.speed;
  }

  show() {
    push();
    rotateY(frameCount * 0.01);
    translate(this.distance * cos(this.orbitAngle), this.distanceY, this.distance * sin(this.orbitAngle));
    rotateY(this.angle);
    texture(this.textura);
    sphere(this.radius);
    pop();
  }
}