---
weight: 2
---

# **Board with Glitch Effect**
This sketch is an easy but interesting application of shaders. It is based on the decomposition of colors, showing the strokes made, but adding a glitch effect that separate the Red, Green and Blue colors that make up the white light.

The point here is to take each of the components and place them with some distance from the others.

## How does it works?
About the shader job, it involves to make a space transformation that gives a flip over the draws on the canvas. Later, it is created a noise vector that will "move" the components in the horizontal axis; with this offset, the Red color will be moved to the left, and the Blue color to the right, and to have a more attractive effect, it wil change randomly on every frame, making more or less notable the space in between.

{{< hint >}}
For the purpose of keep the code organized and have a good understanding over the variables that are being used, the board is an instance of ***[createGraphics]()*** which allows to keep the draws and have more control over it.
{{< /hint >}}

The next code fragment, shows how the components are separated in the *fragment shader*, and subsequently sent to the canvas when the shader is applied.

```js
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
```

## Result

The result sketch is the board, where you can draw whatever your mouse let you.<br>
This board looks like it presents an matrix error!

{{< hint info >}}
If your board is full, press the key 'r' to restart it and have more space for your drawings!
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

## Full Code

{{< details title="glitchBoard.js" open=false >}}
{{< highlight js >}}
let screen;
let effectShader;

function preload(){
  effectShader = loadShader('shader.vert', 'shader.frag');
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
<br>

{{< details title="shader.frag" open=false >}}
{{< highlight js >}}
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
<br>

{{< details title="shader.vert" open=false >}}
{{< highlight js >}}
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
<br>


<style>
    .sketch{
        width: 630px;
        height: 630px;
        display: flex;
    }
</style>