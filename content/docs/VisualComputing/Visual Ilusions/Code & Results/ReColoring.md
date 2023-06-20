---
weight: 3
---

# **Re-Coloring**

The possibility of changing the colors of a figure is one of the most interesting features of computer graphics, since it allows image transformations to be carried out in a simple and fast way. In this case, the **p5.js** library has been used to transform the colors of an image based on the change in the palette you are using.

Through the use of different color palettes, effects can be obtained in the image that can be implemented to help people with color blindness.For example, you can change the color palette of an image to make it easier for a visually impaired person to distinguish.

{{< hint info >}}
There are certain color palettes that are more suitable for people with color blindness, such as the [**IBM**](https://lospec.com/palette-list/ibm-color-blind-safe), [**Wong**](https://www.color-hex.com/color-palette/1018347), or [**Tol**](https://personal.sron.nl/~pault/).

For more information about color palettes for people with color blindness, you can consult the following [article](https://davidmathlogic.com/colorblind/) by [David Nichols](https://davidmathlogic.com/).
{{< /hint >}}

## How does it work?

The script is based on the extraction of the colors that appear in an image, and from the palette selected by the user, we proceed to change those of the original image. The fundamental point of the code is to find the distance between the colors in the palette and those in the image, and from there, the closest one is selected for replacement.

This code is shown below:

{{< details title="getPaletteColor" open=true >}}
{{< highlight js >}}
function getPaletteColor(imgColor) {
    let r = red(imgColor);
    let g = green(imgColor);
    let b = blue(imgColor);
    let minDist = Infinity;
    let color;
    for(let i = 0; i < currentPalette.length; i++) {
        let pColor = currentPalette[i];
        let d = dist(r, g, b, red(pColor), green(pColor), blue(pColor));
        if(d < minDist) {
            minDist = d;
            color = currentPalette[i];
        }
    }
    return color;
}
{{< /highlight >}}
{{< /details >}}

{{< hint info >}}
It is important to note that the palettes that are available do not represent a solution for all cases, since not all people with color blindness have the same problems and it depends largely on the colors that are in the original figure.
{{< /hint >}}

## Result

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/recoloring.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint danger >}}
Although a color blind palette can be used, it is not guaranteed that the person will be able to distinguish the colors in the image.
{{< /hint >}}


# Samples

## Ishihara Test 7
---

{{< columns >}}
## Unaltered View
![Ishihara original](https://i.ibb.co/xhkcw5v/74-Original.png "Ishihara original")

<--->

## View with Protanopia
![Ishihara protanopia](https://i.ibb.co/Cm162h0/74-Protanopia.png "Ishihara protanopia")

{{< /columns >}}

{{< columns >}}
## IBM Palette
![Ishihara paleta x](https://i.ibb.co/6R9R4MG/74IBM.png "Ishihara con paleta IBM")

<--->

## Palette #2

![Ishihara paleta y](https://i.ibb.co/gJT7t5w/74-Paleta2.png "Ishihara con paleta #2")

{{< /columns >}}

## Ishihara Test 4

---

{{< columns >}}
## Unaltered View
![Ishihara original](https://i.ibb.co/3TKJ5fQ/5-Original.png "Ishihara original")

<--->

## View with Protanopia
![Ishihara protanopia](https://i.ibb.co/SmKjtsH/5-Protanopia.png "Ishihara protanopia")

{{< /columns >}}

{{< columns >}}
## IBM Palette
![Ishihara paleta x](https://i.ibb.co/7ttF5zP/5IBM.png "Ishihara con paleta IBM")

<--->

## Palette #3

![Ishihara paleta y](https://i.ibb.co/F5Sv2fj/5Paleta3.png "Ishihara con paleta #3")

<--->

## Palette #2

![Ishihara paleta z](https://i.ibb.co/64ThknP/5Paleta2.png "Ishihara con paleta #2")

{{< /columns >}}

## Full Code

{{< details title="ReColoring.js" open=false >}}
{{< highlight js >}}
let img;
let currentPalette = [];
let y = 0;
let canvasSize = 700;

let images = [
    'Landscape.jpg',
    'Ishihara_01.jpg',
    'Ishihara_02.jpg',
    'Ishihara_03.jpg',
    'Ishihara_05.jpg',
    'Ishihara_06.jpg',
    'Ishihara_08.jpg',
    'Ishihara_10.jpg',
];

function preload() {
  let index = floor(random(images.length));
  img = loadImage('/showcase/assets/' + images[index]);
}

function setup() {
  createCanvas(canvasSize, round(img.height*canvasSize/img.width));

  ibm = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];

  wong = ['#000000', '#E69F00', '#56B4E9', '#009E73', '#F0E442',
                '#0072B2', '#D55E00', '#CC79A7'];

  tol = ['#332288', '#117733', '#44AA99', '#88CCEE', '#DDCC77',
                '#CC6677', '#AA4499', '#882255'];

  palette1 = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

  palette2 = ["#FFFFFF", "#000000", "#FFC0CB", "#008000", "#FFD700"];

  palette3 = ['#F5793A', '#A95AA1', '#85C0F9', '#0F2080', '#FDFC33'];

  currentPalette = ibm;

  paletteSel = createSelect();
  paletteSel.position(10, 10);
  paletteSel.option('Paleta IBM');
  paletteSel.option('Paleta Wong');
  paletteSel.option('Paleta Tol');
  paletteSel.option('Paleta 1');
  paletteSel.option('Paleta 2');
  paletteSel.option('Paleta 3');
  paletteSel.changed(changePalette);

  img.resize(width, height);
  image(img, 0, 0);
}

function changePalette() {
    let selected = paletteSel.value();
    if(selected === 'Paleta 1') currentPalette = palette1;
    else if(selected === 'Paleta 2') currentPalette = palette2;
    else if(selected === 'Paleta 3') currentPalette = palette3;
    else if(selected === 'Paleta IBM') currentPalette = ibm;
    else if(selected === 'Paleta Wong') currentPalette = wong;
    else if(selected === 'Paleta Tol') currentPalette = tol;
    y = 0;
    loop();
    image(img, 0, 0);
    redraw();
}

function draw() {
    for(let x = 0; x < width; x++) {
        let imgColor = img.get(x, y);
        let paletteColor = getPaletteColor(imgColor);
        stroke(paletteColor);
        point(x, y);
    }
    y+=2;
    if(y>=height) noLoop();

}

function getPaletteColor(imgColor) {
    let r = red(imgColor);
    let g = green(imgColor);
    let b = blue(imgColor);
    let minDist = Infinity;
    let color;
    for(let i = 0; i < currentPalette.length; i++) {
        let pColor = currentPalette[i];
        let d = dist(r, g, b, red(pColor), green(pColor), blue(pColor));
        if(d < minDist) {
            minDist = d;
            color = currentPalette[i];
        }
    }
    return color;
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
    setTimeout(adjustIframeSize, 150); // retrasar la ejecución en 0.1 segundos
  }, { passive: true });
</script>