// Variables globales
let jupyter;
let moons = [];
let bgTexture;




function preload() {
  earth_texture = loadImage('earth_texture.jpg');
  moon = loadImage('moon_texture.jpg');
  jupyter_texture = loadImage('jupyter_texture.jpeg');
  europa_texture = loadImage('europa_texture.jpg');
  bgTexture = loadImage('stars_texture.jpeg');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  

  
  
  // Crear jupiter
  jupyter = new Moon(100, 0, 0.1, 0, jupyter_texture);
  
  // Crear lunas
  moons.push(new Moon(10, 120, 0.03, 1, moon));
  moons.push(new Moon(10, 135, 0.025, 4,europa_texture));
  
  moons.push(new Moon(15, 150, 0.02, 2, moon));
  
  moons.push(new Moon(10, 170, 0.03, 4,europa_texture));
  moons.push(new Moon(25, 210, 0.025, 4,europa_texture));

  moons.push(new Moon(10, 250, 0.017, 4,europa_texture));
  moons.push(new Moon(20, 280, 0.023, 3, europa_texture));
  moons.push(new Moon(10, 290, 0.028, 4,europa_texture));
  moons.push(new Moon(10, 310, 0.035, 4,europa_texture));

 

  
}

function draw() {
  
  background('black');
  orbitControl();
  texture(bgTexture);
  sphere(800);
  noStroke();
  
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
  constructor(radius, distance, speed, angle, textura) {
    this.radius = radius;
    this.distance = distance;
    this.speed = speed;
    this.angle = angle;
    this.textura = textura;
    this.orbitAngle = 0;
  }
  
  update() {
    
    this.orbitAngle += this.speed;
  }
  
  show() {
    push();
    rotateY(frameCount * 0.01);
    translate(this.distance * cos(this.orbitAngle), 0, this.distance * sin(this.orbitAngle));
    rotateY(this.angle);

    texture(this.textura);
    sphere(this.radius);
    pop();
  }
}