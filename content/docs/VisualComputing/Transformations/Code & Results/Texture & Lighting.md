---
weight: 2
---

# **Texture and Lighting**

Once we have the 3D models of the solar system, we can further enhance the level of detail for specific models, such as the one with the Earth seen from space, or one with Jupiter and its Galilean moons. To make the models more realistic, we employ techniques such as lighting and textures. Lighting plays a crucial role in creating a lifelike appearance. By simulating different light sources, shadows, and reflections, we can bring depth and realism to the scene.

Textures are used to add surface characteristics to the models. By applying detailed textures, we can depict the specific features of each planet and its moons. Observe the following example in which we can fully appreciate the Earth's surface and the Moon's craters, try toggling the textures on and off to see the difference.

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/earth_moon.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>


To provide more interactivity, we can implement user controls that allow for adjusting the level of illumination. Users can manipulate settings such as the intensity and direction of light sources, enabling them to experiment with different lighting conditions. This interactive feature enhances the user's experience and provides a more engaging exploration of the model.

## How does it work?

For the above model, we're just creating a fuctions which changes the current of the spheres rendered on the scene. We can see the code below:

{{< details title="earth_moon.toggleTextures()" open=false >}}
{{< highlight js >}}

function toggleTextures() {
    toggleState = !toggleState; // Changes the state of the textures
    
    if (toggleState) {
        earth_current_texture = empty_texture;
        moon_current_texture = empty_texture;
        bg_current_texture = empty_texture;
    } else {
        earth_current_texture = earth_texture;
        moon_current_texture = moon_texture;
        bg_current_texture = bg_texture;
    }
}

{{< /highlight >}}
{{< /details >}}

As for the next model, we will create a class to manage the moons and their atributes, which is called `Moon`, where we can change values as distance, speed of rotation, translation and his own texture. We defined as follows:

The class `Moon` represents a moon in the system of moons of Jupiter. It has properties such as the radius, distance from Jupiter, rotation speed, and the texture of the moon. Additionally, it has methods like "show()" to display the moon in the scene.

**Lightning**

The lighting in the model is achieved using two types of lights: ambient light `(ambientLight())` and directional light `(directionalLight())`. These lights affect how objects in the scene reflect light and, therefore, influence their visual appearance.

Here's an explanation of how the lighting works in the model:

**Ambient Light:** Ambient light is considered the general light that exists in the environment and is reflected by all objects. In the model, an ambient light is created in the setup() function using the ambientLight() function.


{{< details title="ambientLight()" open=false >}}
{{< highlight js >}}

let ambientLightColor = color(100); // Color and intensity level of the ambient light
ambientLight(ambientLightColor);

{{< /highlight >}}
{{< /details >}}

The ambientLightColor argument represents the color and intensity level of the ambient light. By increasing the numeric value of the color, the intensity of the ambient light is increased, making the objects appear brighter.

**Directional light** simulates a light source that emits parallel rays in a specific direction. In the model, a directional light is created in the setup() function using the directionalLight() function.


{{< details title="directionalLight()" open=false >}}
{{< highlight js >}}

let directionalLightColor = color(255); // Color and intensity level of the directional light
let directionalLightDirection = createVector(0, 0, 1); // Direction of the directional light in 3D space
directionalLight(directionalLightColor, directionalLightDirection);


{{< /highlight >}}
{{< /details >}}

The directionalLightColor argument represents the color and intensity level of the directional light. By increasing the numeric value of the color, the intensity of the directional light is increased, making the objects appear brighter as well. The directionalLightDirection argument defines the direction from which the light rays are emitted. In this case, the directional light is emitted from the direction of the vector (0, 0, 1), meaning that the light rays are emitted from the XY plane towards the positive Z-axis plane.

By adjusting the intensity levels and direction og the lights, you can achieve different lighting effects in the model. Experiment with the values to find the combination that best suits your needs and the visual appearance you want to achieve.


**Result**

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/jupiter.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

**Full Code**


{{< details title="earth_moon.js" open=false >}}
{{< highlight js >}}

let toggleButton;
let toggleState = false;
let earth_texture;
let moon_texture;
let bg_texture;
let empty_texture;
let earth_current_texture;
let moon_current_texture;
let bg_current_texture;

function preload() {
    earth_texture = loadImage('/showcase/assets/earth_texture.jpg');
    moon_texture = loadImage('/showcase/assets/moon_texture.jpg');
    bg_texture = loadImage('/showcase/assets/nocheHD.jpg')
    empty_texture = loadImage('/showcase/assets/Grey_full.png')
    // Cargar las texturas currentes
    earth_current_texture = loadImage('/showcase/assets/earth_texture.jpg');
    moon_current_texture = loadImage('/showcase/assets/moon_texture.jpg');
    bg_current_texture = loadImage('/showcase/assets/nocheHD.jpg');
}

function setup() {
    createCanvas(700, 700, WEBGL);
    toggleButton = createButton('Toggle texture');
    toggleButton.position(width - 100, 15);
    toggleButton.mousePressed(toggleTextures);
}

function toggleTextures() {
    toggleState = !toggleState; // Changes the state of the textures
    
    if (toggleState) {
        earth_current_texture = empty_texture;
        moon_current_texture = empty_texture;
        bg_current_texture = empty_texture;
    } else {
        earth_current_texture = earth_texture;
        moon_current_texture = moon_texture;
        bg_current_texture = bg_texture;
    }
}

function draw() {
    background("black")
    
    noStroke() //No dibujar la malla de las esferas
    
    texture(bg_current_texture)
    sphere(800)

    for (let i = 0; i < 3; i++) {
         directionalLight(
              255, 255, 255 - i * 25,//Color
              -1, 1, -1 //Dirección
         );
    }

    orbitControl() //Controlar con el mouse la camara

    rotateZ(-0.3) //Inclinación de la tierra

    push()
    rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
    texture(earth_current_texture); 
    sphere(100);
    pop()

    push()
    rotateY(-frameCount * 0.05 / 10);//Traslación de la luna al rededor de la tierra
    translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
    rotateY(-frameCount * 0.0002);//Rotación del la luna sobre su propio eje
    texture(moon_current_texture);
    sphere(25);
    pop()
}

{{< /highlight >}}
{{< /details >}}

<br>

{{< details title="jupiter.js" open=false >}}
{{< highlight js >}}

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

{{< /highlight >}}
{{< /details >}}

<style>
    .sketch{
        width: 730px;
        height: 730px;
        display: flex;
    }
</style>