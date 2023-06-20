---
weight: 1
---

# **Color Blender**

One basic rendering application is the **mix of colors**. *[Blending colors](https://cglearn.codelight.eu/pub/computer-graphics/blending)* refers to the process of combining two or more colors to create a new one. The principal theory behind this sketch is manipulate the color components RGB of both colors and determining in which way they will interact.

This idea is applied in areas as Image Editing, Lighting and Shading, Color Interpolation and Color Correction. There are [several operations](https://en.wikipedia.org/wiki/Blend_modes) that allow to obtain different results, such as addition, multiplication, substraction, overlay, screen, darken, lighten and so more. For each *effect* exists equations to perform this operations mathematically, as you can see [here](https://imagineer.in/blog/math-behind-blend-modes/).

## How does it works?
The user select the desired colors, and brightness level. Until there, the application does not use shaders; but once an effect is chosen the colors are sent to the *Fragment Shader* and they are separated in each of their components: Red, Green and Blue. Depending to the effect, the operation change and it allows to get a new color. In the following code it is possible to examine some of the options listed and also a partial work of this file.

```js
void main() {

    float r1 = color1.r;
    float g1 = color1.g;
    float b1 = color1.b;
    float r2 = color2.r;
    float g2 = color2.g;
    float b2 = color2.b;

    vec3 result = vec3(0.0);

    if(mult){
        result = (color1*color2);
    }else if(screen){
        result = vec3(1.0-(1.0-r1)*(1.0-r2), 1.0-(1.0-g1)*(1.0-g2), 1.0-(1.0-b1)*(1.0-b2));
    }else if(darken){
        result = vec3(min(r1, r2), min(g1, g2), min(b1, b2));
    }

    gl_FragColor = vec4(brightness*result, 1.0);
}
```
## Result

The following sketch shows an example of two colors that can be mixed with the above operations and how modify the **brightness** changes the desired effect.

{{< hint info >}}
Up to the left is a list of possible operations to watch the effect that produces. Also the colors are eligible as well as the bright level through the slider.
{{< /hint >}}

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js></script>
            <script src=/showcase/sketches/shaders/blender/colorBlender.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint warning >}}
To start using the program, you should select first an effect, if not, the color or brightness change will not be applied.
{{< /hint >}}

The use of shaders here, gives facilities at the time of show the results, but mainly during the blending of the colors executing the operations. Those operations are not difficult, but the space change of RGB values from [0, 255] to [0.0, 1.0] allows to always stay in the correct range avoiding the math gimmicks needed in other cases.

## Full Code
{{< hint danger >}}
For the *Vertex Shader* we are implementing the Tree.color4 instance from the library ***[p5.treegl](https://github.com/VisualComputing/p5.treegl)*** developed by [Jean Pierre Charalambos](https://github.com/nakednous) and [Daniel Angulo](https://github.com/dangulos)
{{< /hint >}}

{{< details title="colorBlender.js" open=false >}}
{{< highlight js >}}
let colorShader;
let picker1;
let picker2;
let color1;
let color2;
let rectColor1;
let rectColor2;
let rectResult;
let offset;
let operations = ["mult", "sum", "sub", "overlay", "screen", "darken", "lighten"];
let effect;
let brightness;

function preload(){
  colorShader = readShader('colorBlender.frag',
                          {varyings: Tree.color4});
}

function setup() {
  createCanvas(600, 600, WEBGL);
  
  picker1 = createColorPicker('red');
  picker1.position(width/8, height/8);
  picker2 = createColorPicker('lightgreen');
  picker2.position(width*7/12, height/8);

  effect = createSelect();
  effect.position(10, 10);
  effect.option('effect');
  for(let i of operations) effect.option(i);
  effect.changed(changeEffect);
  colorShader.setUniform('mult', true);

  brightness = createSlider(0, 1, 0.5, 0);
  brightness.position(300-40, 260);
  brightness.style('width', '80px');
  
  rectColor1 = createGraphics(150, 150);
  rectColor2 = createGraphics(150, 150);
  rectResult = createGraphics(1, 1);
  
  color1 = picker1.value();
  color2 = picker2.value();
  
  offset = 40;
}

function draw() {
  background('#1E1E37');
  
  color1 = picker1.value();
  color2 = picker2.value();
  
  rectColor1.background(color1);
  rectColor2.background(color2);
  image(rectColor1, -width/2+offset*2, -height/2+offset*2);
  image(rectColor2, -width/2+offset*9, -height/2+offset*2);

  shader(colorShader);
  colorShader.setUniform('brightness', brightness.value());
  colorShader.setUniform('color1', normalized(color1));
  colorShader.setUniform('color2', normalized(color2));
  
  beginShape();
  vertex(-1/3, -2/3);
  vertex(1/3, -2/3);
  vertex(1/3, 0.0);
  vertex(-1/3, 0.0);
  endShape();
}

function normalized(color){
  const r = red(color)/255;
  const g = green(color)/255;
  const b = blue(color)/255;
  return [r,g,b];
}

function changeEffect(){
  effect.disable('effect');
  for(let i of operations) colorShader.setUniform(i, false);
  colorShader.setUniform(effect.value(), true);
}
{{< /highlight >}}
{{< /details >}}

<br>

{{< details title="colorBlender.frag" open=false >}}
{{< highlight js >}}
precision mediump float;

uniform vec3 color1;
uniform vec3 color2;

uniform float brightness;

uniform bool mult;
uniform bool sum;
uniform bool sub;
uniform bool overlay;
uniform bool screen;
uniform bool darken;
uniform bool lighten;


void main() {

    float r1 = color1.r;
    float g1 = color1.g;
    float b1 = color1.b;

    float r2 = color2.r;
    float g2 = color2.g;
    float b2 = color2.b;

    vec3 result = vec3(0.0);

    if(mult){
        result = (color1*color2);
    }else if(sum){
        result = (color1+color2);
    }else if(sub){
        result = (color1-color2);
    }else if(overlay){
        result = r1<=0.5 ? result+vec3(2.0*r1+r2, 0.0, 0.0) : result+vec3(1.0-2.0*(1.0-r1)*(1.0-r2), 0.0, 0.0);
        result = g1<=0.5 ? result+vec3(0.0, 2.0*g1+g2, 0.0) : result+vec3(0.0, 1.0-2.0*(1.0-g1)*(1.0-g2), 0.0);
        result = b1<=0.5 ? result+vec3(0.0, 0.0, 2.0*b1+b2) : result+vec3(0.0, 0.0, 1.0-2.0*(1.0-b1)*(1.0-b2));
    }else if(screen){
        result = vec3(1.0-(1.0-r1)*(1.0-r2), 1.0-(1.0-g1)*(1.0-g2), 1.0-(1.0-b1)*(1.0-b2));
    }else if(darken){
        result = vec3(min(r1, r2), min(g1, g2), min(b1, b2));
    }else if(lighten){
        result = vec3(max(r1, r2), max(g1, g2), max(b1, b2));
    }

    gl_FragColor = vec4(brightness*result, 1.0);
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