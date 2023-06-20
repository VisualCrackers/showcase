// Variables globales
let jupyter;
let moons = [];
let selectedMoon = null;

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
  camera(900, -300, 500, 0, 0, 0, 0, 1, 0);

  
  directionalLightSlider = createSlider(0, 255, 200); // Slider para ajustar la luz direccional
  directionalLightSlider.position(20, 20);

  sizeLabel = createP('Lightning level');
  sizeLabel.position(175, 10);
  sizeLabel.style('font-size', '14px');
  sizeLabel.style('color', 'white');

  removeTexturesButton = createButton("Quitar texturas"); // Crear el botón
  removeTexturesButton.position(500, 20);
  removeTexturesButton.mousePressed(toggleTextures); // Asignar una función al evento click del botón
  
  
  // Crear jupiter
  jupyter = new Moon(100, 0, 0, 0.02, 0, jupyter_texture);
  
  // Crear lunas

  let io, europa, ganimedes, calisto;

  io = moons.push(new Moon(15, 200, -60, 0.02, 1, io_texture));

  europa = moons.push(new Moon(10, 300, -20, 0.015, 4,europa_texture));
  
  ganimedes = moons.push(new Moon(30, 400, 20, 0.019, 2, ganimedes_texture));
  
  calisto = moons.push(new Moon(20, 600, 30, 0.017, 4, calisto_texture));


}

function toggleTextures() {
  texturesEnabled = !texturesEnabled; // Cambiar el estado de las texturas
}

function draw() {
  
  background('black');
  //orbitControl();
  texture(bgTexture);
  sphere(2000);
  noStroke();
  rotateZ(-0.3)
  lights();

  let ambientLightColor = color(100); // Color and intensity level of the ambient light
  ambientLight(ambientLightColor);

 
  let directionalLightValue = directionalLightSlider.value();

  directionalLight(directionalLightValue , directionalLightValue , directionalLightValue, -255, 200, 0);
  
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