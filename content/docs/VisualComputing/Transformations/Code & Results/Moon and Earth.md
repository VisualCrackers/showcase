---
weight: 2
---

# **Earth and Moon**

This model is similar to that of Jupiter and its Galilean moons. Here, we work with rotation because the Earth is tilted at an angle, and we will also use translations and rotations for the movement of the moon

## How does it work?

In this model we do not creat a class for the Earth and Moon, we just doing 

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

**Texturing**

In the preload() function, three images are loaded using the loadImage() function: earth_texture.jpg, moon_texture.jpg, and nocheHD.jpg. These images will be used as textures for the Earth, Moon, and the background starry sky, respectively.

Inside the draw() function, the following lines of code are responsible for texture mapping:

{{< details title="textureBg" open=false >}}
{{< highlight js >}}

texture(textura_fondo_estrellas);
sphere(800);

{{< /highlight >}}
{{< /details >}}

Here, the texture() function is called with the textura_fondo_estrellas image as the argument. This sets the texture for the upcoming 3D shape, which in this case is a sphere with a radius of 800 units. The image textura_fondo_estrellas is applied to the sphere, creating a starry sky background.

The next instance of texture mapping is applied to the Earth:

{{< details title="Earth Texture" open=false >}}
{{< highlight js >}}

texture(textura_tierra);
sphere(100);

{{< /highlight >}}
{{< /details >}}

Similarly, the texture() function is used with the textura_tierra image as the argument. This sets the texture for the next 3D shape, which is a sphere representing the Earth with a radius of 100 units. The image textura_tierra is applied to this sphere, giving it the appearance of the Earth's surface.

Finally, texture mapping is applied to the Moon:

{{< details title="Moon texture" open=false >}}
{{< highlight js >}}

texture(textura_luna);
sphere(25);

{{< /highlight >}}
{{< /details >}}

Again, the texture() function is used with the textura_luna image as the argument. This sets the texture for the subsequent 3D shape, which is a sphere representing the Moon with a radius of 25 units. The image textura_luna is applied to this sphere, giving it the appearance of the Moon's surface.

## Result

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



**Full Code**

{{< details title="earth_moon.js" open=false >}}
{{< highlight js >}}

function preload() {
    textura_tierra = loadImage('/showcase/assets/earth_texture.jpg');
    textura_luna = loadImage('/showcase/assets/moon_texture.jpg');
    textura_fondo_estrellas = loadImage('/showcase/assets/nocheHD.jpg')
}

function setup() {
    createCanvas(700, 700, WEBGL);
}

function draw() {
    background("black")
    
    noStroke() //No dibujar la malla de las esferas
    
    texture(textura_fondo_estrellas)
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
    texture(textura_tierra); 
    sphere(100);
    pop()

    push()
    rotateY(-frameCount * 0.05 / 10);//Traslación de la luna al rededor de la tierra
    translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
    rotateY(-frameCount * 0.05);//Rotación del la luna sobre su propio eje
    texture(textura_luna);
    sphere(25);
    pop()
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