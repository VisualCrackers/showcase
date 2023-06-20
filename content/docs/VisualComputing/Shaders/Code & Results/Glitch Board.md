---
weight: 2
---

# **Board with Glitch Effect**

<a href='https://en.wikipedia.org/wiki/Glitch_art' target='_blank'>Glitch art</a> is a digital art form that embraces and celebrates imperfections, errors, and technical malfunctions as a creative aesthetic. It involves intentionally distorting or manipulating technology to produce unexpected visual or auditory effects. 

The following Glitch Board is a sketching tool that allows users to draw glitchy lines on a canvas using the mouse. It applies a custom shader effect to create a distorted and glitchy visual representation of the drawn lines.

## How does it work?

The Glitch Board program employs a combination of JavaScript and WebGL to achieve its glitch art functionality. Let's examine its code structure and highlight the essential sections.

1. **Preloading the Shader**
Before the program starts, it preloads a custom shader using the loadShader() function. This shader defines the visual effects applied to the canvas, forming the core of the glitch art style.

2. **Setting up the Canvas**
In the setup() function, the program creates a canvas using createCanvas(), specifying its size and enabling the WebGL mode. Additionally, it creates a graphics buffer called screen using createGraphics(). This buffer serves as a drawing surface for capturing and storing the glitchy lines.

```js
function setup() {
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height);
  screen.background('#1E1E37');
  screen.stroke(255);
  screen.strokeWeight(5);
  
  shader(effectShader);
}

```	

The shader() function is then used to apply the loaded effectShader to the canvas, setting the stage for the glitch effects to be rendered.

3. **Drawing Glitchy Lines**
The draw() function is responsible for handling the drawing of glitchy lines. When the mouse is pressed, the program detects the mouse positions and draws a line on the screen buffer. These lines become the input for the glitch effect.

```js
function draw() {
  if(mouseIsPressed){
    screen.line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  effectShader.setUniform('texture', screen);
  effectShader.setUniform('noise', getNoiseValue());
  
  rect(-width/2, -height/2, width, height);
}
```

To apply the glitch effect, the program uses effectShader.setUniform() to pass data to the shader. It assigns the screen buffer as the texture uniform and sets the noise uniform using a value obtained from the getNoiseValue() function, which adds randomness to the glitch effect.

Finally, the program renders a rectangle covering the entire canvas, triggering the shader to apply the glitch effects and produce the distorted visuals.

4. **Clearing the Canvas**
To provide a way to reset the canvas, the program implements the keyPressed() function. If the 'r' or 'R' key is pressed, the background of the screen buffer is set to its initial color, effectively clearing the canvas.

## Result

{{< hint info >}}
Use the mouse to draw glitchy lines on the canvas. Press ``'r'`` or ``'R'`` to reset the canvas.
{{< /hint >}}

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js></script>
            <script src=/showcase/sketches/shaders/board/glitchBoard.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint info >}}
**Possible improvements**
- User controls: Implementing a user interface with sliders, buttons, or other elements could allow users to adjust glitch parameters in real-time, enabling more experimentation and creativity.

- Different brush types: Offering different brush styles, sizes, or textures can provide users with more diverse drawing options, leading to more varied glitch art results.
{{< /hint >}}

Full code:

{{< details title="glitchBoard.js" open=false >}}
{{< highlight js >}}
let screen;
let effectShader;

function preload(){
  effectShader = loadShader('/showcase/sketches/shaders/board/shader.vert', '/showcase/sketches/shaders/board/shader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height);
  screen.background('#1E1E37');
  screen.stroke(255);
  screen.strokeWeight(5);
  
  shader(effectShader);
}

function draw() {
  if(mouseIsPressed){
    screen.line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  effectShader.setUniform('texture', screen);
  effectShader.setUniform('noise', getNoiseValue());
  
  rect(-width/2, -height/2, width, height);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    screen.background('#1E1E37');
  }
}

function getNoiseValue(){
  return random()/50;
}

{{< /highlight >}}
{{< /details >}}

{{< details title="shader.frag" open=false >}}
{{< highlight glsl >}}
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D texture;
uniform float noise;

void main(){
  
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  
  vec2 offset = vec2(noise, 0.0);
  
  vec3 col;
  col.r = texture2D(texture, uv + offset).r;
  col.g = texture2D(texture, uv).g;
  col.b = texture2D(texture, uv - offset).b;
    
  gl_FragColor = vec4(col, 1.0);
}
{{< /highlight >}}
{{< /details >}}

{{< details title="shader.vert" open=false >}}
{{< highlight glsl >}}

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main(){
  vTexCoord = aTexCoord;
  
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  gl_Position = positionVec4;
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