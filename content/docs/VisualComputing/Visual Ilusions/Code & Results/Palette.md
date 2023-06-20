---
weight: 1
---
# **Palette Generator**

When creating any type of software, design, or tool, it is important to consider that not all users have the same perception capacity. The colors are variables that really affect the interaction of consumers with the product, so making a *selection of the appropriate palette* is a task that must be properly contemplated, and even more so when trying to make the product **accessible** to everyone.

{{< hint >}}
Obtaining the palette of colors that appear most frequently in an image will allow the designer to show if the colors he has selected are the most suitable for the product, or if, on the contrary, it is necessary make a change to it. Also, through a color palette generator, you can investigate about *color combinations that are less likely to cause confusion* problems for people with **color blindness**.
{{< /hint >}}

## How does it work?

The script is based on extracting the colors that appear in an image, and obtaining the frequency from each of them. For this, the **`loadPixels()`** method of the P5.js library has been used, which allows obtaining the information of each one of the pixels of the image, and thus be able to count the colors when going through the graphic piece. The information of each color is saved in an arrangement, and the frequency with which it appears in the image, also taking into account a tolerance so as not to make the data structure excessively large.

Once the information on the colors has been obtained, they are ordered from highest to lowest frequency, taking the first 7 colors of this list, and showing them at the bottom of the canvas.

{{< hint info >}}
The code for extracting the colors is shown below:
{{< /hint >}}

{{< details title="extractColors" open=true >}}
{{< highlight js >}}
function extractColors() {
  colors = [];
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = color(img.get(x, y));
      let found = false;
      for (let i = 0; i < colors.length; i++) {
        let existingColor = colors[i][0];
        if (colorDistance(existingColor, c) < tolerance) { // tolerance range
          found = true;
          colors[i][1]++;
          break;
        }
      }
      if (!found) {
        colors.push([c, 1]);
      }
    }
  }
}
{{< /highlight >}}
{{< /details >}}

{{< hint >}}
To order the color palette at the bottom of the canvas, the **`colorNumber(color)`** method has been used
that allows you to perform a conversion of the RGB code to a numeric value, and thus be able to place them in a nice order
harmonically to the eye.
{{< /hint >}}

```js
function colorNumber(c) {
    return 256*256*red(c) + 256*green(c) + blue(c);
}
```

{{< hint >}}
To obtain the distance between two colors, the Euclidean distance formula has been used, which allows to find the distance between two points in a space of n dimensions. In this case, it has been used to obtain the distance between two colors in RGB space in the **`colorDistance(c1, c2)`** function.
{{< /hint >}}

## Result

The final result is the following:

{{< hint warning >}}
**Warning:**

For some images, the processing may take time due to the path that is necessary to carry out, so it is recommended to use images of a reduced size. Also, delays may occur if the image has too many different colors.
{{< /hint >}}

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/palette.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>


{{< hint danger >}}
**Weaknesses:**

If there are many similar colors, depending on the tolerance value, not all important colors that could be displayed with human perception may be displayed, because the order of image processing causes the colors on top to have a higher priority.
{{< /hint >}}

## Full Code

{{< details title="Palette.js" open=false >}}
{{< highlight js >}}
let img;
let colors = [];
let canvasSize = 700;
let paletteHeight = 30;
let tolerance = 25;

let images = [
    'Landscape.jpg',
    'Canada.png',
    'Unal.png',
    'Rainbow.png',
    'Urus.jpg',
    'Colombia.jpg',
    'Cristales.jpeg'
];

function preload() {
  let index = floor(random(images.length));
  img = loadImage('/showcase/assets/' + images[index]);
}

function setup() {
  let canvasHeight = round(img.height*canvasSize/img.width)+paletteHeight+5;
  createCanvas(canvasSize, canvasHeight);
  image(img,  0, 0, canvasSize, canvasHeight-paletteHeight-5);
  extractColors();
  colors = colors.sort((b, a) => a[1] - b[1]);
  colors = colors.slice(0,7);
  colors = colors.sort((b, a) => colorNumber(a[0]) - colorNumber(b[0]));
  console.log(colors);
  showPalette();
}
function extractColors() {
  colors = [];
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = color(img.get(x, y));
      let found = false;
      for (let i = 0; i < colors.length; i++) {
        let existingColor = colors[i][0];
        if (colorDistance(existingColor, c) < tolerance) { // tolerance range
          found = true;
          colors[i][1]++;
          break;
        }
      }
      if (!found) {
        colors.push([c, 1]);
      }
    }
  }
}

function showPalette() {
  noStroke();
  let swatchSize = width / colors.length;
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i][0]);
    rect(i * swatchSize, height - paletteHeight, swatchSize, paletteHeight);
  }
}

function colorNumber(c) {
    return 256*256*red(c) + 256*green(c) + blue(c);
}

function colorDistance(c1, c2) {
  let rDiff = red(c1) - red(c2);
  let gDiff = green(c1) - green(c2);
  let bDiff = blue(c1) - blue(c2);
  return sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
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
