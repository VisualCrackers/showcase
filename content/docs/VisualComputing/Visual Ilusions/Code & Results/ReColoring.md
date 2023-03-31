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
    var sketchImageHeight = sketchImage.height+ 20;

    // Establecer la altura y ancho del iframe en consecuencia
    var p5Iframe = document.getElementById('palette');
    p5Iframe.style.height = sketchImageHeight + 'px';
  }

  window.addEventListener('load', function () {
    setTimeout(adjustIframeSize, 100); // retrasar la ejecución en 0.1 segundos
  }, { passive: true });
</script>