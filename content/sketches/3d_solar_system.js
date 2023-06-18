let sizeFactor = 1;
let speedFactor = 1;
let asteroidBeltCheckbox = true;
let selectedPlanet = null;

class Star {
  constructor(radius, color) {
    this.radius = radius;
    this.color = color;
    this.planets = [];
  }
  show() {
    push();
    noStroke();
    fill(this.color);
    sphere(this.radius);

    for (let planet of this.planets) {
      rotateX(planet.orbitTilt)
      planet.show();
      planet.update();
    }
    pop();
  }
}

class CelestialBody {
  constructor(radius, distance, orbitSpeed, rotationSpeed, color, orbitTilt = 0, rotationTilt = 0) {
    this.radius = radius;
    this.distance = distance;
    this.orbitSpeed = orbitSpeed;
    this.rotationSpeed = rotationSpeed;
    this.orbitTilt = orbitTilt;
    this.rotationTilt = rotationTilt;
    this.angle = random(360);
    this.color = color;
    this.orginalRadius = radius;
    this.originalOrbitSpeed = orbitSpeed;
    this.originalRotationSpeed = rotationSpeed;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  update() {
    this.radius = this.orginalRadius*sizeFactor;
    this.orbitSpeed = this.originalOrbitSpeed*speedFactor;
    this.rotationSpeed = this.originalRotationSpeed*speedFactor;
    this.angle += this.orbitSpeed;
    this.x = this.distance * cos(this.angle);
    this.y = this.distance * sin(this.angle) * sin(this.orbitTilt);
    this.z = this.distance * -sin(this.angle) * cos(this.orbitTilt);  
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
  constructor(radius, distance, orbitSpeed, rotationSpeed, color, orbitTilt, rotationTilt, hasRings = false, innerRadius = 0, outerRadius = 0, ringThickness = 0, ringSegments = 0)   {
    super(radius, distance,orbitSpeed, rotationSpeed, color, orbitTilt, rotationTilt);
    this.moons = [];
    this.hasRings = hasRings;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.ringThickness = ringThickness; // Grosor del anillo
    this.ringSegments = ringSegments; // Número de segmentos del anillo (círculos vacíos)
  }

  show() {
    super.show(); // Llama al método show() de la clase base
    for (let moon of this.moons) {
      push();
      rotateY(this.angle);
      rotateX(moon.orbitTilt); // Inclinación de la órbita de la luna
      translate(this.distance, 0, 0);
      moon.show();
      pop();
      moon.update()
    }
    if (this.hasRings) {
      push();
      rotateY(this.angle);
      rotateX(this.rotationTilt); // Inclinación de la órbita del anillo
      translate(this.distance, 0, 0);
      rotateX(PI / 2); // Rotar el anillo para que esté en el plano XY
      noFill();
      stroke(115,100,90); // Color del anillo
      strokeWeight(this.ringThickness); // Grosor del borde
      for (let i = 0; i < this.ringSegments; i++) {
        let radius = random(this.radius*this.innerRadius, this.radius*this.outerRadius); // Radio del círculo vacío
        circle(0, 0, radius * 2, radius * 2);
      }
      pop();
    }
  }
}

class Moon extends CelestialBody {
  constructor(radius, distance, orbitSpeed, rotationSpeed, color, orbitTilt) {
    super(radius, distance, orbitSpeed, rotationSpeed, color, orbitTilt);
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

let sun, mercury, venus, earth, moon, mars, asteroidBelt, jupiter, saturn, uranus, neptune, pluto;

function setup() {
  createCanvas(700, 700, WEBGL);
  camera(0, -300, 1000, 0, 0, 0, 0, 1, 0);

  sun = new Star(25, color(255, 200, 50));
  mercury = new Planet(3, 80, 0.01, 0.02, color(200));
  sun.planets.push(mercury);
  venus = new Planet(5, 120, 0.008, 0.03, color(150, 125, 100));
  sun.planets.push(venus);
  earth = new Planet(6, 240, 0.006, 0.04, color(0, 100, 255));
  sun.planets.push(earth);
  moon = new Moon(1.2, 35, 0.1, 0.1, color(200), 50, PI/8);
  earth.moons.push(moon);
  mars = new Planet(3.5, 350, 0.004, 0.05, color(255, 0, 0));
  sun.planets.push(mars);
  asteroidBelt = new AsteroidBelt(450, 600, 300, color(150), 0.6);
  jupiter = new Planet(15, 700, 0.002, 0.06, color(250, 150, 90));
  sun.planets.push(jupiter);
  saturn = new Planet(12, 900, 0.001, 0.07, color(190, 150, 120), 0, PI/8, true, 1.5, 2.8, 0.2,150);
  sun.planets.push(saturn);
  uranus = new Planet(8, 1100, 0.0008, 0.08, color(120, 150, 190), 0, PI/2, true, 1.1,1.8, 0.1, 70);
  sun.planets.push(uranus);
  neptune = new Planet(7, 1300, 0.0006, 0.09, color(80, 110, 180), 0, PI/5, true, 1.1,1.8, 0.1, 70);
  sun.planets.push(neptune);
  pluto = new Planet(1, 1500, 0.0004, 0.1, color(120, 150, 220), PI/8, 0);
  sun.planets.push(pluto);

  // Crea el slider para ajustar el tamaño de los planetas
  sizeSlider = createSlider(1, 5, 1, 0.1);
  sizeSlider.position(20, 20);
  sizeSlider.style('width', '150px');
  sizeSlider.input(updateSize); // Llama a la función updateSize cuando se cambia el valor del slider
  // Crea el elemento de párrafo para el título del tamaño
  sizeLabel = createP('Size');
  sizeLabel.position(175, 10);
  sizeLabel.style('font-size', '14px');
  sizeLabel.style('color', 'white');

  // Crea el slider para ajustar la velocidad de los planetas
  speedSlider = createSlider(0.2, 10, 1, 0.1);
  speedSlider.position(20, 50);
  speedSlider.style('width', '150px');
  speedSlider.input(updateSpeed); // Llama a la función updateSpeed cuando se cambia el valor del slider
  // Crea el elemento de párrafo para el título de la velocidad
  speedLabel = createP('Speed');
  speedLabel.position(175, 40);
  speedLabel.style('font-size', '14px');
  speedLabel.style('color', 'white');

  // Crea el checkbox para el cinturón de asteroides
  asteroidBeltCheckbox = createCheckbox('Asteroid Belt', true);
  asteroidBeltCheckbox.position(20, 80);
  asteroidBeltCheckbox.style('color', 'white');

  // Crea el select para seleccionar el planeta
  planetSelector = createSelect();
  planetSelector.position(620, 20);
  planetSelector.option('Free')
  planetSelector.option('Sun');
  planetSelector.option('Mercury');
  planetSelector.option('Venus');
  planetSelector.option('Earth');
  planetSelector.option('Mars');
  planetSelector.option('Jupiter');
  planetSelector.option('Saturn');
  planetSelector.option('Uranus');
  planetSelector.option('Neptune');
  planetSelector.option('Pluto');
  planetSelector.changed(updateSelectedPlanet); // Llama a la función updateCamera cuando cambia la selección
  
}

function updateSelectedPlanet() {
  const planetMap = {
    Free: null,
    Sun: sun,
    Mercury: mercury,
    Venus: venus,
    Earth: earth,
    Mars: mars,
    Jupiter: jupiter,
    Saturn: saturn,
    Uranus: uranus,
    Neptune: neptune,
    Pluto: pluto
  };

  const selected = planetSelector.value();
  selectedPlanet = planetMap[selected];
}

function updateCamera() {
  if (selectedPlanet) {
    let distance = selectedPlanet.radius*15 + 20; // Distancia de la cámara desde el planeta (ajustable)
    /* if (distance < selectedPlanet.radius*2) {
      distance = selectedPlanet.radius*2;
    } */
    let x = selectedPlanet.x;
    let y = selectedPlanet.y;
    let z = selectedPlanet.z;
    camera(x+distance, y-distance, z+distance, x, y, z, 0, 1, 0);
  }
}

// Función que se llama cuando se cambia el valor del slider de tamaño
function updateSize() {
  sizeFactor = sizeSlider.value();
}

// Función que se llama cuando se cambia el valor del slider de velocidad
function updateSpeed() {
  speedFactor = speedSlider.value();
}

function draw() {
  background(0);
  
  sun.show();
  if (selectedPlanet === sun) {
    camera(0, -300, 1000, 0, 0, 0, 0, 1, 0);
  } else if (selectedPlanet) {
    updateCamera();
  }
  else {
    orbitControl();
  }

  if (asteroidBeltCheckbox.checked()){
    asteroidBelt.show();
  }
}
