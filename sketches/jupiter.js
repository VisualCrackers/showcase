// Variables globales
let jupiter;
let moons = [];
let selectedMoon = null;
let directionalLightAngle = 0;

function preload() {

  jupiter_texture = loadImage('/showcase/assets/jupiter_texture.jpeg');
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

  directionalAngleSlider = createSlider(0, TWO_PI, PI, 0.01); // Slider para ajustar la dirección de la luz direccional
  directionalAngleSlider.position(20, 50);

  angleLabel = createP('Light direction');
  angleLabel.position(175, 40);
  angleLabel.style('font-size', '14px');
  angleLabel.style('color', 'white');

 
  
  // Creates the planet
  jupiter = new Moon(150, 0, 0, 0.02, 0, 0, jupiter_texture);
  
  // Creates the moons 

  io = moons.push(new Moon(15, 200, -60, 0.02, 1, PI/8, io_texture));
  europa = moons.push(new Moon(10, 300, -20, 0.015, 4, PI/2, europa_texture));
  ganimedes = moons.push(new Moon(30, 400, 20, 0.019, 2, PI, ganimedes_texture));
  calisto = moons.push(new Moon(20, 500, 30, 0.017, 4, PI/3, calisto_texture));
}

function toggleTextures() {
  texturesEnabled = !texturesEnabled; // Cambiar el estado de las texturas
}

function draw() {
  
  background('black');
  texture(bgTexture);
  sphere(2000);
  noStroke();
  rotateZ(-0.3)
  lights();

  let ambientLightColor = color(100); // Color and intensity level of the ambient light
  ambientLight(ambientLightColor);

 
  let directionalLightValue = directionalLightSlider.value();

  directionalLightAngle = directionalAngleSlider.value();
  directionalLight(
    directionalLightValue,
    directionalLightValue,
    directionalLightValue,
    cos(directionalLightAngle),
    sin(directionalLightAngle),
    0
  );
  
  // Mover y mostrar jupiter
  jupiter.show();
  
  // Mover y mostrar las lunas
  for (let i = 0; i < moons.length; i++) {
    push();
    rotate(50)
    moons[i].update();
    moons[i].show();
    pop();
  }
}

class Moon {
  constructor(radius, distance, distanceY, speed, angle, tilt, texture) {
    this.radius = radius;
    this.distance = distance;
    this.distanceY = distanceY;
    this.speed = speed;
    this.angle = angle;
    this.tilt = tilt;
    this.texture = texture;
    this.orbitAngle = 0;
  }
  
  update() {
    this.angle -= this.speed;
    this.orbitAngle += this.speed;
  }

  show() {
    push();
    rotateX(this.tilt); // Inclinación de la órbita de la luna
    push();
    rotateY(this.angle);
    translate(this.distance, 0,0);
    rotateY(frameCount * this.speed);
    texture(this.texture);
    sphere(this.radius);
    pop();
    pop();
  }
}