---
weight: 4
---
# **Color Histogram**

Color histograms can also be employed as a potential application for individuals with color blindness, specifically for distinguishing and interpreting colors that might pose challenges to them. By utilizing color histograms, the following benefits can be realized:

- **Color Differentiation:** Color histograms can help individuals with color blindness differentiate between different colors by analyzing the distribution of color values. Even if they cannot perceive specific colors accurately, they can still observe variations in color frequencies and patterns.

- **Color Mapping:** Color histograms can assist in mapping colors to alternative representations that are distinguishable for individuals with color blindness. By analyzing the histogram peaks and valleys, color transformations or adjustments can be applied to make certain colors more discernible.

- **Color Recognition:** By comparing the color histograms of different images or regions within an image, individuals with color blindness can identify similarities and differences in color distribution. This can aid in recognizing objects, patterns, or distinguishing features that might otherwise be challenging due to color-related limitations.

## How does it work?

The program allows the user to select one of the preloaded images. This selection is made using a dropdown menu. Once an image is selected, the program calculates the color histogram by iterating over each pixel of the image. It records the frequency of red, green, and blue color values in separate arrays (red_arr, green_arr, and blue_arr), where the **`getIndex(x,y)`** function obtains the index of the iterated pixel from with we get the different values.

```js
for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
        let idx = getIndex(i, j);
        let r = img.pixels[idx + 0];
        let g = img.pixels[idx + 1];
        let b = img.pixels[idx + 2];
        red_arr[r]++;
        green_arr[g]++;
        blue_arr[b]++;
    }
}
```

Then, the selected image is displayed on the canvas, along with three lines representing the color histograms for red, green, and blue. 
A graph is shown below the image and histograms, representing the intensity levels from 0 to 255 on the x-axis and the frequency on the y-axis. 


## Result

The final result is the following:

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/colorHistogram.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>


{{< hint danger >}}
**Weaknesses:**

**Limited Image Selection:** The program only offers a fixed set of preloaded images. It could be improved by allowing users to upload their own images or providing a wider range of image options.

**Color Space Considerations:** The program currently calculates the color histogram based on the RGB color space. However, other color spaces like HSL or LAB could provide additional insights into color distributions. Supporting different color spaces would enhance the program's capabilities.

**Accessibility for Screen Readers:** The program heavily relies on visual elements, which may pose challenges for users who rely on screen readers. To improve accessibility, alternative text descriptions or sonification of the histogram data should be considered.
{{< /hint >}}

## Full Code

{{< details title="colorHistogram.js" open=false >}}
{{< highlight js >}}
let red_arr = new Array(256);
let green_arr = new Array(256);
let blue_arr = new Array(256);

let colors = new Array(3);
let img,img1,img2,img3;
let leftM = 180;
let upM = 15;

let canvasWidth = 700;
let canvasHeight = 550; 

function preload() {
img1 = loadImage("/showcase/assets/Cristales.jpeg");
img2 = loadImage("/showcase/assets/Rainbow.png");
img3 = loadImage("/showcase/assets/Landscape.jpg");
}

function getIndex(x, y) {
    return (x + y * img.width) * 4;
}

function setup() {
    img = img1;
    img.resize(canvasWidth/2, canvasHeight/2.2);
    createCanvas(canvasWidth, canvasHeight);  

    for (let i = 0; i < 256; i++) {
        red_arr[i] = green_arr[i] = blue_arr[i] = 0;
    }

    loadPixels();
    img.loadPixels();
    filtered = createImage(img.width, img.height);
    filtered.loadPixels();

    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let idx = getIndex(i, j);
            let r = img.pixels[idx + 0];
            let g = img.pixels[idx + 1];
            let b = img.pixels[idx + 2];
            red_arr[r]++;
            green_arr[g]++;
            blue_arr[b]++;
        }
    }

    colors[0] = red_arr;
    colors[1] = green_arr;
    colors[2] = blue_arr;

    img.updatePixels();
    filtered.updatePixels();
    updatePixels();

    // Crea el selector desplegable de imágenes
    imageSelector = createSelect();
    imageSelector.position(620, 10);
    imageSelector.option("Imagen 1");
    imageSelector.option("Imagen 2");
    imageSelector.option("Imagen 3");
    imageSelector.selected("Imagen 1");
    imageSelector.changed(updateSelectedImage);
}

function updateSelectedImage() {
    let selectedImage = imageSelector.value();
    if (selectedImage == "Imagen 1") {
        img = img1;
    } else if (selectedImage == "Imagen 2") {
        img = img2;
    } else if (selectedImage == "Imagen 3") {
        img = img3;
    }
    img.resize(canvasWidth/2, canvasHeight/2.2);
    calculateHistogram(img);
}

function calculateHistogram(imagen) {
    for (let i = 0; i < 256; i++) {
        red_arr[i] = green_arr[i] = blue_arr[i] = 0;
    }

    loadPixels();
    imagen.loadPixels();
    filtered.loadPixels();

    for (let i = 0; i < imagen.width; i++) {
        for (let j = 0; j < imagen.height; j++) {
            let idx = getIndex(i, j);
            let r = imagen.pixels[idx + 0];
            let g = imagen.pixels[idx + 1];
            let b = imagen.pixels[idx + 2];
            let a = imagen.pixels[idx + 3];
            red_arr[r]++;
            green_arr[g]++;
            blue_arr[b]++;
        }
    }

    colors[0] = red_arr;
    colors[1] = green_arr;
    colors[2] = blue_arr;

    imagen.updatePixels();
    updatePixels();
}

function draw() {
    background(255);
    image(img, 180, 10);
    stroke(0);
    push();
    paint(color('rgba(255,0,0,0.1)'), colors[0]);
    paint(color('rgba(0,255,0,0.1)'), colors[1]);
    paint(color('rgba(0,0,255,0.1)'), colors[2]);
    pop();
    graph();
}

function graph() {
    push();
    textAlign(CENTER);
    textSize(14);

    text('Valores del color (0 - 255) ', leftM + img.width / 2, 2 * img.height + 2 * upM);
    let angle2 = radians(270);
    translate(leftM / 2, (3 / 2) * img.height);
    rotate(angle2);
    text("Frecuencias", 0, -40);
    pop();
}

function paint(color, array) {
    push();
    stroke(color);
    for (let i = 1; i < 256; i++) {
        xPos = map(i, 0, 256, leftM - img.width/3, leftM + img.width*1.3)
        xPrev = map(i - 1, 0, 256, leftM- img.width/3, leftM + img.width*1.3)
        yPos = map(array[i], 0, max(array), 2 * img.height, img.height + 50)
        yPrev = map(array[i - 1], 0, max(array), 2 * img.height, img.height + 50)
        line(xPrev, yPrev, xPos, yPos)
        line(xPos, 2 * img.height, xPos, yPos)
    }
    pop();
}

{{< /highlight >}}
{{< /details >}}

<style>
    .sketch{
        width: 100%;
        height: 500px;
        display: flex;
    }
</style>

<script>
  function adjustIframeSize() {
    // Obtener la altura y ancho de la imagen del sketch de P5
    var sketchImage = document.querySelector('#palette').contentDocument.querySelector('canvas');

    // Establecer la altura y ancho del iframe en consecuencia
    var p5Iframe = document.getElementById('palette');
    p5Iframe.style.height = Math.round(sketchImage.height*700/sketchImage.width)+24 + 'px';
  }

  window.addEventListener('load', function () {
    setTimeout(adjustIframeSize, 1000); // retrasar la ejecución en 0.1 segundos
  }, { passive: true });
</script>
