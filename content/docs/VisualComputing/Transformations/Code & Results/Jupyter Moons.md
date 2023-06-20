---
weight: 2
---

# **Jupyter and its moons**

Once we have the 3D models of the solar system, we can further enhance the level of detail for specific planets, such as Jupiter and its Galilean moons. These models can be created using specialized 3D modeling software that allows for intricate design and customization.

To make the models more realistic, we employ advanced techniques such as lighting and textures. Lighting plays a crucial role in creating a lifelike appearance. By simulating different light sources, shadows, and reflections, we can bring depth and realism to the scene. This can include effects like sunlight casting shadows on the planet's surface or the moons orbiting around Jupiter.

In addition to lighting, textures are used to add surface characteristics to the models. By applying detailed textures, we can depict the specific features of each planet and its moons. For example, Jupiter's turbulent atmosphere, characterized by its distinct cloud bands and the iconic Great Red Spot, can be accurately represented through textures.

To provide interactivity, we can implement user controls that allow for adjusting the level of illumination. Users can manipulate settings such as the intensity and direction of light sources, enabling them to experiment with different lighting conditions. This interactive feature enhances the user's experience and provides a more engaging exploration of the model.

By combining advanced lighting techniques, high-quality textures, and interactive elements, we can create visually stunning and accurate 3D models of planets like Jupiter and its Galilean moons, bringing the wonders of our solar system to life in a realistic and captivating way.

## How does it work?

We will create a class to manage the moons and their atributes, which is called `Moon`, where we can change values as distance, speed of rotation, translation and his own texture. We defined as follows:

{{< details title="class Moon" open=false >}}
{{< highlight js >}}

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
{{< /highlight >}}
{{< /details >}}

The class `Moon` represents a moon in the system of moons of Jupiter. It has properties such as the radius, distance from Jupiter, rotation speed, and the texture of the moon. Additionally, it has methods like "show()" to display the moon in the scene.

The `show()` method is a function in the "Moon" class that is responsible for displaying the moon in the scene. Here's a detailed explanation of each component and what they do:

`push()` and `pop()`: These functions are used to save and restore the current transformation matrix configuration. Using push() saves the current configuration, and pop() restores the previous configuration. This prevents transformations from affecting other objects in the scene.

The `translate()` function moves the current drawing position to where the moon will be drawn. The first argument this.distanceFromJupiter indicates the distance from Jupiter along the X-axis. By setting the Y and Z axes to zero, the moon remains in the same relative position to Jupiter along those axes.

The `rotateY()` function rotates the moon around its own axis in 3D space. The argument frameCount * this.rotationSpeed controls the amount of rotation based on the elapsed time in the program. Multiplying by this.rotationSpeed allows adjusting the rotation speed of the moon.

The `texture()` function applies the moon's texture to the spherical object that will be drawn. The argument this.texture refers to the specific texture assigned to the moon in the texture property.

The `sphere()` function draws a sphere with the specified radius in the this.radius argument. This creates the 3D shape of the moon.

**Lightning**

The lighting in the model is achieved using two types of lights: ambient light `(ambientLight())` and directional light `(directionalLight())`. These lights affect how objects in the scene reflect light and, therefore, influence their visual appearance.

Here's an explanation of how the lighting works in the model:

Ambient Light: Ambient light is considered the general light that exists in the environment and is reflected by all objects. In the model, an ambient light is created in the setup() function using the ambientLight() function.


{{< details title="ambientLight()" open=false >}}
{{< highlight js >}}

let ambientLightColor = color(100); // Color and intensity level of the ambient light
ambientLight(ambientLightColor);

{{< /highlight >}}
{{< /details >}}

The ambientLightColor argument represents the color and intensity level of the ambient light. By increasing the numeric value of the color, the intensity of the ambient light is increased, making the objects appear brighter.

Directional light simulates a light source that emits parallel rays in a specific direction. In the model, a directional light is created in the setup() function using the directionalLight() function.



{{< details title="directionalLight()" open=false >}}
{{< highlight js >}}

let directionalLightColor = color(255); // Color and intensity level of the directional light
let directionalLightPosition = createVector(0, 0, 1); // Direction of the directional light in 3D space
directionalLight(directionalLightColor, directionalLightPosition);


{{< /highlight >}}
{{< /details >}}

The directionalLightColor argument represents the color and intensity level of the directional light. By increasing the numeric value of the color, the intensity of the directional light is increased, making the objects appear brighter as well. The directionalLightPosition argument defines the direction from which the light rays are emitted. In this case, the directional light is emitted from the direction of the vector (0, 0, 1), meaning that the light rays are emitted from the XY plane towards the positive Z-axis plane.

By adjusting the colors and intensity levels of the ambient and directional lights, you can achieve different lighting effects in the model. Experiment with the values to find the combination that best suits your needs and the visual appearance you want to achieve.


**Result**

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/jupyter.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

**Full Code**

{{< details title="jupyter.js" open=false >}}
{{< highlight js >}}

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


{{< /highlight >}}
{{< /details >}}

<style>
    .sketch{
        width: 730px;
        height: 730px;
        display: flex;
    }
</style>