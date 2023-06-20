---
weight: 3
---

# **PhotoMosaic**

This program utilizes the power of shaders to create captivating [photomosaic](https://en.wikipedia.org/wiki/Photographic_mosaic) effects. By analyzing the luminance of each pixel in an original image, the program intelligently selects smaller images from a palette to replace the pixels, resulting in a visually stunning composition of smaller images that form the larger picture.

Each tile is replaced with a carefully chosen image from a collection of smaller images, creating a mosaic-like representation of the original.

## How does it works?
The fragment shader code performs intricate calculations to determine the closest match between the luminance values of the original image pixels and the images in the palette. It adjusts the texture coordinates and retrieves the corresponding images to seamlessly blend them into the mosaic. The shader also provides the option to visualize the UV coordinates to understand better the contribution from each tile.

Inside the *main()* function of the *fragment shader*, it calculates the luminance (brightness) of the current texel from the original image using the luma() function implemented with [Component average](https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color). Then, the shader proceeds to find the closest match from the palette of smaller images iterating over each image in the palette and comparing the luminance values.

```js
float luma(vec4 texel) {
  // alpha channel (texel.a) is just discarded
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}
```

```js
float getCloser(vec4 texel, vec2 coord){
  
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
```

Once the closest match is determined, the shader adjusts the texture coordinates to correspond to the position within the selected image in the palette, it is because GLSL does not accept an array of images or sampler2D, and the solution we used was to create a "large" image where we display all the pictures.

```js
adjustedCoords = adjustedCoords + closest*vec2(0.5/(float(n)/2.0), 0.0);
vec4 result = texture2D(pics, adjustedCoords);
```

## Result

The bellow sketch shows the implementation of th **photomosaic** with a palette of 30 paintings that are used to paint as a group, one of them. With the slider it is possible to change the number of tiles that are used to paint the selected image. Naturally, with a big number of tiles, the result is better; the maximum number of paintings that are set is 300x300. 

{{< hint info >}}
You can change the selected painting by pressing the 'r' key and get a new random one.
{{< /hint >}}

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js></script>
            <script src=/showcase/sketches/shaders/mosaics/normal.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint danger >}}
There are some paintings that does not look quite good. It is due to the palette used, probably the *luma* of them dont cover all the posibilities and the match is not as good as it could be.
{{< /hint >}}

## Full Code

{{< hint danger >}}
For the *Vertex Shader* we are implementing the **Tree.texcoords2** instance from the library ***[p5.treegl](https://github.com/VisualComputing/p5.treegl)*** developed by [Jean Pierre Charalambos](https://github.com/nakednous) and [Daniel Angulo](https://github.com/dangulos)
{{< /hint >}}

{{< details title="photoMosaic.js" open=false >}}
{{< highlight js >}}
let n, selected;
let mosaic;
let uv;
let palette;
let pics;
let resolution, quantity;

function preload() {
  mosaic = readShader('normalMosaic.frag', { varyings: Tree.texcoords2 });
  pics = [];
  n = 30;
  for(let i=0; i<n; i++) pics.push(loadImage(`pic${i}.png`));
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  
  shader(mosaic);
  
  resolution = createSlider(1, 300, 1, 1);
  resolution.position(10, 15);
  resolution.style('width', '80px');
  resolution.input(() => {
    mosaic.setUniform('resolution', resolution.value());
  });
  
  uv = createCheckbox('uv visualization', false);
  uv.style('color', 'magenta');
  uv.changed(() => mosaic.setUniform('uv', uv.checked()));
  uv.position(10, 40);
  
  mosaic.setUniform('n', n-1);
  mosaic.setUniform('resolution', resolution.value());
  mosaic.setUniform('uv', false);
  
  selected = floor(random() * pics.length);
  generatePalette();
  
}

function generatePalette(){
  palette = createGraphics(128*(n-1),128); //Object with images to shader
  
  for(let i=0; i<n; i++){
    palette.image(pics[i], 128*i, 0, 128, 128);
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
{{< /highlight >}}
{{< /details >}}
<br>

{{< details title="photoMosaic.frag" open=false >}}
{{< highlight js >}}
precision mediump float;

// palette is sent by the sketch and comprises the video
const int maxNum = 29;
uniform int n;
uniform sampler2D original;
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

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  
  vec2 symbolCoord = texcoords2 * resolution;
  vec2 stepCoord = floor(symbolCoord);
  symbolCoord = symbolCoord - stepCoord;
  
  vec4 texel = texture2D(original, stepCoord/vec2(resolution));
  
  vec2 adjustedCoords = symbolCoord * vec2(0.5/(float(n)/2.0), 1.0);
  
  float closest = getCloser(texel, vec2(0.5/(float(n)/2.0), 1.0));
  
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