---
weight: 2
---

# **3D Solar System**

Now that we have seen how the transformations work in 2D, we can apply them to a 3D model. In addition to that, we will add a bit more of interactivity to the model, so that we can move around the solar system and see it from different perspectives.

A 3D model involves way more transformations than a 2D one, some of which may be really unintuitive, so we will have to be careful with the order in which we apply them.

## How does it work?

Similar to the 2D model, we need a class to manage the planets and their atributes, but now, we will be more specific. First, we will define a class called `Star` for the sun and another class called `CelestiaBody` for the planets and moons. The `Star` class will be as follows:

{{< details title="class Star" open=false >}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

So basically, we have a constructor that takes the radius and color of the sun, and an array of planets. The `show()` method will draw the sun and then, for each planet, it will call their own `show()` method (which we will see in a moment) and also rotate the plane in which the planet orbitates if it has an orbitTilt. Note that we do this transformation inside the `push()` and `pop()` functions, so that it only affects the planets and not the sun.

Now, the `CelestialBody` class will contain more information that will be shared by the classes `Planet` and `Moon`. It will first have a contructor with the common atributes like the radius, color, distance to the sun, and the speed at which it rotates around the sun. It will also have a `show()` method that will draw the planet and rotate it around the sun. Lastly, the `update()` method will be used to update the angle of the planet in the orbit. There are wo other things we're adding here: first, a reference to the absolute position of the planet in the canvas with the three atributes `x`, `y` and `z` (this will be useful for the camera positioning), and secondly, a factor scaling to the radius and speed atributes to add more interactivity.

{{< details title="CelestialBody.update()" open=false >}}
{{< highlight js >}}

update() {
    this.radius = this.orginalRadius*sizeFactor;
    this.orbitSpeed = this.originalOrbitSpeed*speedFactor;
    this.rotationSpeed = this.originalRotationSpeed*speedFactor;
    this.angle += this.orbitSpeed;
    this.x = this.distance * cos(this.angle);
    this.y = this.distance * sin(this.angle) * sin(this.orbitTilt);
    this.z = this.distance * -sin(this.angle) * cos(this.orbitTilt);  
  }

{{< /highlight >}}
{{< /details >}}

{{< hint info >}}
Note how we get the absolute position by using `cos` and `sin` functions, and also how we multiply the `y` and `z` coordinates by the `sin` of the `orbitTilt` angle.
{{< /hint >}}

The `Planet` class will follow a similar logic to the `Star` class for showing its moons. The main feature inside this class is the `hasRings` atributte, which will be used to draw the rings around the planet. The `show()` method will contain the following:

{{< details title="Planet.show()" open=false >}}
{{< highlight js >}}
show() {
    super.show(); // Call the show() method of its parent class
    for (let moon of this.moons) {
      push();
      rotateY(this.angle);
      rotateX(moon.orbitTilt); // Moon's orbit tilt
      translate(this.distance, 0, 0);
      moon.show();
      pop();
      moon.update()
    }
    if (this.hasRings) {
      push();
      rotateY(this.angle);
      rotateX(this.rotationTilt); // Ring's rotation tilt
      translate(this.distance, 0, 0);
      rotateX(PI / 2);
      noFill();
      stroke(115,100,90); // Ring's color
      strokeWeight(this.ringThickness); // Border thickness
      for (let i = 0; i < this.ringSegments; i++) {
        let radius = random(this.radius*this.innerRadius, this.radius*this.outerRadius); // Radius of the ring
        circle(0, 0, radius * 2, radius * 2);
      }
      pop();
    }
  }
{{< /highlight >}}
{{< /details >}}

The `Moon` does not add any new info to it parent. We also declare one final class which is the `AsteroidBelt` which is shown is the following way.

{{< details title="AsteroidBelt.show()" open=false >}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

After this, we just instantiate the planets, add them to the Sun's planets array and the call the `show()` method inside the `draw()` function. Additionally, we include the `updateCamera` function to allow the user to change the camera view around the solar system. We also include Pluto as a planet, because why not.

{{< details title="updateCamera()" open=false >}}
{{< highlight js >}}
function updateCamera() {
  if (selectedPlanet) {
    let distance = selectedPlanet.radius*5 + 50; // Distancia de la cámara desde el planeta (ajustable)
    let x = selectedPlanet.x;
    let y = selectedPlanet.y;
    let z = selectedPlanet.z;
    camera(x+distance, y-distance, z+distance, x, y, z, 0, 1, 0);
  }
}
{{< /highlight >}}
{{< /details >}}

{{< hint info >}}
Here we use the `camera()` function to set the camera position. The first three parameters are the camera position, the next three are the camera target, and the last three are the camera orientation. You can find more info about this function on the [p5 camera doc](https://p5js.org/es/reference/#/p5.Camera).
{{< /hint >}}

And that's it! You can see the final result in the following sketch.
## Result

Move the sliders to change the planets `size` and `speed` and check the `asteroid belt` option to show it. You can also select a planet to follow it with the camera and see it with more detail. To move freely on the canvas select `Free`. Try to find Pluto from the Sun view!

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/3d_solar_system.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint info >}}
The distances and sizes of the planets are not fully to scale (they would be too small or too far), but the speeds are.
Of course, this is just a simple example of what you can do with the `p5.js` library. You can add more planets, moons, rings, etc. You can also add more features to the planets, like clouds, or even add a spaceship to move around the solar system. The possibilities are endless!
{{< /hint >}}

## Full Code

{{< details title="3d_solar_system.js" open=false >}}
{{< highlight js >}}

let sizeFactor = 1;
let speedFactor = 1;
let asteroidBeltCheckbox = false;
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

  sun = new Star(70, color('#EAD740'));
  mercury = new Planet(0.8, 250, 0.00479, 0.02, color('#999999'));
  sun.planets.push(mercury);
  venus = new Planet(2.4, 450, 0.0035, 0.03, color('#B1894F'));
  sun.planets.push(venus);
  earth = new Planet(2.4, 550, 0.00298, 0.04, color('#06429F'));
  sun.planets.push(earth);
  moon = new Moon(0.6, 16, 0.1, 0.1, color(200), 50, PI/8);
  earth.moons.push(moon);
  mars = new Planet(1.4, 1000, 0.00241, 0.05, color('#D95B2E'));
  sun.planets.push(mars);
  asteroidBelt = new AsteroidBelt(1250, 2000, 300, color(150), 0.6);
  jupiter = new Planet(14, 2200, 0.00131, 0.06, color('#D39E7B'));
  sun.planets.push(jupiter);
  saturn = new Planet(12, 3000, 0.00097, 0.07, color('#CAAA67'), 0, PI/8, true, 1.5, 2.5, 0.2,150);
  sun.planets.push(saturn);
  uranus = new Planet(5, 4000, 0.00068, 0.08, color('#C4EAEE'), 0, PI/2, true, 1.3,1.8, 0.08, 60);
  sun.planets.push(uranus);
  neptune = new Planet(4.9, 4500, 0.00054, 0.09, color('#4575FF'), 0, PI/5, true, 1.3,1.5, 0.01, 30);
  sun.planets.push(neptune);
  pluto = new Planet(0.4, 5000, 0.00046, 0.1, color('#B5AA9F'), PI/8, 0);
  sun.planets.push(pluto);

  // Crea el slider para ajustar el tamaño de los planetas
  sizeSlider = createSlider(1, 4, 1, 0.1);
  sizeSlider.position(20, 20);
  sizeSlider.style('width', '150px');
  sizeSlider.input(updateSize); // Llama a la función updateSize cuando se cambia el valor del slider
  // Crea el elemento de párrafo para el título del tamaño
  sizeLabel = createP('Size');
  sizeLabel.position(175, 10);
  sizeLabel.style('font-size', '14px');
  sizeLabel.style('color', 'white');

  // Crea el slider para ajustar la velocidad de los planetas
  speedSlider = createSlider(0.1, 15, 1, 0.1);
  speedSlider.position(20, 50);
  speedSlider.style('width', '150px');
  speedSlider.input(updateSpeed); // Llama a la función updateSpeed cuando se cambia el valor del slider
  // Crea el elemento de párrafo para el título de la velocidad
  speedLabel = createP('Speed');
  speedLabel.position(175, 40);
  speedLabel.style('font-size', '14px');
  speedLabel.style('color', 'white');

  // Crea el checkbox para el cinturón de asteroides
  asteroidBeltCheckbox = createCheckbox('Asteroid Belt', false);
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
    let distance = selectedPlanet.radius*5 + 50; // Distancia de la cámara desde el planeta (ajustable)
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
{{< /highlight >}}
{{< /details >}}

<style>
    .sketch{
        width: 730px;
        height: 730px;
        display: flex;
    }
</style>