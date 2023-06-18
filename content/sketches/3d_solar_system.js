class CelestialBody {
  constructor(radius, distance, orbitSpeed, rotationSpeed, color) {
    this.radius = radius;
    this.distance = distance;
    this.orbitSpeed = orbitSpeed;
    this.rotationSpeed = rotationSpeed;
    this.angle = random(360);
    this.color = color;
  }

  update() {
    this.angle += this.orbitSpeed;
  }

  show() {
    push();
    rotateY(this.angle);
    translate(this.distance, 0,0);
    rotateY(frameCount * this.rotationSpeed);
    noStroke();
    fill(this.color);
    sphere(this.radius);
    pop();
  }
}

class Planet extends CelestialBody {
  constructor(radius, distance, orbitSpeed,rotationSpeed, color)   {
    super(radius, distance,orbitSpeed, rotationSpeed, color);
    this.moons = [];
  }

  show() {
    super.show(); // Llama al método show() de la clase base
    for (let moon of this.moons) {
      push();
      rotateY(this.angle);
      rotateX(50); // Inclinación de la órbita de la luna
      translate(this.distance, 0, 0);
      moon.show();
      pop();
      moon.update()
    }
  }
}

class Moon extends CelestialBody {
  constructor(radius, distance, orbitSpeed, rotationSpeed, color) {
    super(radius, distance, orbitSpeed, rotationSpeed, color);
  }
}


class AsteroidBelt {
  constructor(innerRadius, outerRadius, density, color, asteroidSize) {
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.density = density;
    this.color = color;
    this.asteroidSize = asteroidSize
  }

  update() {
    // El cinturón de asteroides no necesita actualizaciones
  }

  show() {
    push();
    noFill();
    stroke(this.color);
    strokeWeight(this.asteroidSize);
    for (let i = 0; i < this.density; i++) {
      let angle = map(i, 0, this.density, 0, TWO_PI);
      let x = cos(angle) * random(this.innerRadius, this.outerRadius);
      let y = cos(angle) * random(-5, 5);
      let z = sin(angle) * random(this.innerRadius, this.outerRadius);
      point(x, y, z);
    }
    pop();
  }
}

let sun, mercury, venus, earth, moon, mars, asteroidBelt;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  sun = new CelestialBody(25, 0, 0, 0, color(255, 200, 50));
  mercury = new Planet(3, 80, 0.01, 0.02, color(200));
  venus = new Planet(5, 120, 0.008, 0.03, color(150, 125, 100));
  earth = new Planet(6, 240, 0.006, 0.04, color(0, 100, 255));
  moon = new Moon(1.2, 35, 0.1, 0.1, color(200));
  earth.moons.push(moon);
  mars = new Planet(3.5, 350, 0.004, 0.05, color(255, 0, 0));
  asteroidBelt = new AsteroidBelt(450, 600, 300, color(150), 0.6);
  
  camera(0, -300, 1000, 0, 0, 0, 0, 1, 0);
}

function draw() {
  background(0);
  orbitControl();

  sun.show();
  mercury.show();
  venus.show();
  earth.show();
  mars.show();
  asteroidBelt.show();

  mercury.update();
  venus.update();
  earth.update();
  mars.update();
  asteroidBelt.update();
}
