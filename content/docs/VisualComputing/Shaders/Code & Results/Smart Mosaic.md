---
weight: 4
---

# **Smart PhotoMosaic**

This program is a **super powered** version of the previous PhotoMosaic. It will let you appreciate the best things of each painting and with that, give a better visual result about the expected image.

The p5.js code provides the interactive interface and handles the image processing pipeline, but behind the scenes, the GLSL fragment shader does the heavy lifting.

## How does it works?
The fragment shader takes the original image and the palette of smaller images as inputs. For **every single pixel**, the shader calculates its *luma* value, that represent its brightness. And then, looks into the pixel's images palette the one that fits better with the light value of the pixel in the same position. This represent an improvement in the performance of the progam, and a better approach to the desired objetive.

Basically, this code takes the best of each image **excluding the selected to be plotted** (otherwise it will be the best fit), and create a new painting with a lot of parts from others. For instance, it could take the hole background from one pic, the face of a person from other one, and the rest of the body of a third one.

It allows to create a new paiting that also have an unique art style, and recreates images in a very advanced way. In fact, some artificial intelligence apply this [technique](https://www.tensorflow.org/tutorials/generative/style_transfer#:~:text=Neural%20style%20transfer%20is%20an,of%20the%20style%20reference%20image.) to create the images that provide us. [More info.](https://towardsdatascience.com/when-ai-meets-art-neural-style-transfer-with-magenta-js-ceb50e702730)

The difference with the previous one is that it takes each pixel, and not the image at all.

On the code, the differences are minimum, it just represent a change of the coords that are being used. There is a fragment of the coordinates that are used in the shader.

```js
vec4 texel = texture2D(original, texcoords2);
  
vec2 symbolCoord = texcoords2 * resolution;
vec2 stepCoord = floor(symbolCoord);

symbolCoord = symbolCoord - stepCoord;

vec2 adjustedCoords = symbolCoord * vec2(0.5/(float(n)/2.0), 1.0);

float closest = getCloser(texel, adjustedCoords);

adjustedCoords = adjustedCoords + closest*vec2(0.5/(float(n)/2.0), 0.0);

vec4 result = texture2D(pics, adjustedCoords);
```

## Result

{{< hint info >}}
Up to the left are located two sliders, the first one control the grid size, changuing the size of the tiles that are used. The second slider, set the number of images that will contain the palette, bewteen 1 and 10. 

There is also provided the UV coords visualization checkbox.
{{< /hint >}}

{{< hint info >}}
You can see how the quality of the image change when more images are added to the palette. But this program have awesome result with even just 2 images.

We recommend the result for *"The Starry Night - Vincent van Gogh"*.
{{< /hint >}}

{{< hint warning >}}
You can change the selected painting by pressing the 'r' key and get a new random one.
{{< /hint >}}

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js></script>
            <script src=/showcase/sketches/shaders/mosaics/smart.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint danger >}}
This sketch could crash if there is selected a large amount of tiles and the user starts to change rapidly the number of images used on the palette. It is because depending the number of images, the buffer palette change, and it should be reset and made again; this takes a high computational cost and can do the webpage to stop. Please dont try it :(
{{< /hint >}}

## Full Code

{{< hint danger >}}
For the *Vertex Shader* we are implementing the **Tree.texcoords2** instance from the library ***[p5.treegl](https://github.com/VisualComputing/p5.treegl)*** developed by [Jean Pierre Charalambos](https://github.com/nakednous) and [Daniel Angulo](https://github.com/dangulos)
{{< /hint >}}

{{< details title="smartMosaic.js" open=false >}}
{{< highlight js >}}
let n, selected;
let mosaic;
let uv;
let palette;
let pics;
let resolution, quantity;

function preload() {
  mosaic = readShader('smartMosaic.frag', { varyings: Tree.texcoords2 });
  pics = [];
  for(let i=0; i<10; i++) pics.push(loadImage(`pic${i}.png`));
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  
  shader(mosaic);
  
  resolution = createSlider(1, 50, 1, 1);
  resolution.position(10, 15);
  resolution.style('width', '80px');
  resolution.input(() => {
    mosaic.setUniform('resolution', resolution.value());
  });
  
  quantity = createSlider(2, 10, 3, 1);
  quantity.position(10, 35);
  quantity.style('width', '80px');
  quantity.input(() => {
    generatePalette();
    mosaic.setUniform('n', quantity.value()-1);
  });
  
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'magenta');
  uv.changed(() => mosaic.setUniform('uv', uv.checked()));
  uv.position(10, 60);
  
  mosaic.setUniform('n', quantity.value()-1);
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('uv', false);
  
  selected = floor(random() * pics.length);
  generatePalette();
  
}

function generatePalette(){
  n = quantity.value();
  palette = createGraphics(720*(n-1),720); //Object with images to shader
  offset = 0;
  
  for(let i=0; i<n; i++){
    if(i!=selected){ //Avoid incluying the selected image
      palette.image(pics[i], 720*offset, 0, 720, 720);
      offset++;
    } 
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    selected = floor(random() * pics.length);
    generatePalette();
  }
}

function draw() {
  background(120);
  mosaic.setUniform('original', pics[selected]);
  mosaic.setUniform('pics', palette);
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

function luma(img) {
  let sum = 0;
  
  // Iterate over each pixel
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Get the pixel color
      let pixelColor = img.get(x, y);
      
      // Extract the red, green, and blue channels
      let r = red(pixelColor);
      let g = green(pixelColor);
      let b = blue(pixelColor);
      
      // Calculate the luma using the formula: Y = 0.299R + 0.587G + 0.114B
      let luma = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Accumulate the luma value
      sum += luma;
    }
  }
  
  // Calculate the average luma by dividing the sum by the total number of pixels
  let averageLuma = sum / (img.width * img.height);
  
  return averageLuma;
}
{{< /highlight >}}
{{< /details >}}
<br>

{{< details title="smartMosaic.frag" open=false >}}
{{< highlight js >}}
precision mediump float;

const int maxNum = 9;
uniform int n;
// target image to paint
uniform sampler2D original;
// pics is a the palette sent by the sketch
uniform sampler2D pics;
// target horizontal & vertical resolution
uniform float resolution;
// uv visualization
uniform bool uv;

// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)

float luma(vec4 texel) {
  // alpha channel (texel.a) is just discarded
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float getCloser(vec4 texel, vec2 coord){
  //Function to find the closer luma image to the original
  
  float distancia = 999999.9;
  float lumaOriginal = luma(texel);
  vec4 temp;
  float lumaTemp;
  
  float closest = 0.0;
  
  for(int i=0; i<maxNum; i++){
    if(i<n){
      temp = texture2D(pics, coord + float(i)*vec2(0.5/(float(n)/2.0), 0.0));
      lumaTemp = luma(temp);
      if(abs(lumaOriginal-lumaTemp) < distancia){
        distancia = abs(lumaOriginal-lumaTemp);
        closest = float(i);
      }
    }
  }
  
  return closest;
}

void main() {
  
  vec4 texel = texture2D(original, texcoords2);
  
  vec2 symbolCoord = texcoords2 * resolution;
  vec2 stepCoord = floor(symbolCoord);
  
  symbolCoord = symbolCoord - stepCoord;
  
  vec2 adjustedCoords = symbolCoord * vec2(0.5/(float(n)/2.0), 1.0);
  
  float closest = getCloser(texel, adjustedCoords);
  
  adjustedCoords = adjustedCoords + closest*vec2(0.5/(float(n)/2.0), 0.0);
  
  vec4 result = texture2D(pics, adjustedCoords);
  
  gl_FragColor = uv ? vec4(adjustedCoords.st, 0.0, 1.0) : result;
}
{{< /highlight >}}
{{< /details >}}

<style>
    .sketch{
        width: 630px;
        height: 630px;
        display: flex;
    }
</style>