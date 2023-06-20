---
title: Intro & Background
weight: 1
type: docs
---

# **Intro & Background**

# **Shaders**
Short programs that render graphics data.

## **Shaders? What is a shader?**
A shader is a <a href='https://en.wikipedia.org/wiki/Computer_program' target='_blank'>program</a> that takes advantage of parallelization running on a computer's GPU (Graphics Processing Unit), it is specifically designed to handle complex calculations involved in rendering, appling the appropiate levels of light, darkness or color in 2D or 3D models.

They are usually small and simple programs, but you should be carefull because the instructions are executed all at once for every single pixel on the screen *(Keep reading for more info)*.

## **Why use shaders?**
As was said before, **shaders** use GPU, executing a specific task on each pixel at same time. The principal, and major great difference with usuals programs that just use CPU, is the quantity of processors. While a CPU use some cores (<10), GPU operates with thousands.

Graphic applications require a lot of processing power. Every single pixel needs to be computed, and in order to give good performance to users, the display running is normally 60 frames per second. This means millions of calculations in short time, for that reason, its better to have many mini-processors (GPU) where each one is dedicated to just one pixel than a few group of high performance cores which should load and process all the pixels.

<a href='https://www.youtube.com/watch?v=-P28LKWTzrI' target='_blank'>Here</a> is an ilustrative representation of the comparative between CPU and GPU made by Mythbusters.

## **How does it works?**
Rendering or graphic pipeline describe certain sections of data flow to be programmable. There are five stages defined by <a href='https://www.opengl.org/' target='_blank'>OpenGL</a>:
- Vertex Shaders
- Tessellation Control and Evaluation Shaders
- Geometry Shaders
- Fragment Shaders
- Compute Shaders

Each of the named stages have a set of inputs and outputs, and them are passed from prior to the subsequent ones. The basic programmable stages setup for 2D and 3D rendering consist on 2 stages. We are going to specify about *Vertex* and *Fragment* Shaders.

### **Vector Shader** *(shader.vert)*
A Vertex Shader Program operates on each individual point of geometry, known as a **vertex**, within the input buffer. Its purpose is to carry out transformations by multiplying a vector with a matrix. By defining the vertex struct in a customized manner, you aim to align it with the data from the input assembler stages. Matrices are utilized to combine multiple transformations, allowing for the representation of scaling, rotation, and translation (SRT) within a single matrix. This consolidated matrix results in a vertex that undergoes the specified SRT operations. This matrix is commonly referred to as the model matrix. However, to achieve a three-dimensional effect, two additional matrices are necessary. The first is the view matrix, also known as the transformation of the virtual camera, and the second is the projection matrix, which further adjusts each vertex to conform to our perceptual understanding of perspective vision.

This file ends with setting the built in variable called **gl_Position** equal to our calculations, this ensures that we automatically can use these positions.

### **Fragment Shader** *(shader.frag)*
What is a fragment? 

A fragment can be described as a pixel in the making, but not every fragment will ultimately become a visible pixel on the screen. In this shader, the focus is usually on calculating lighting effects such as Lambert diffuse lighting or specular terms. This process is commonly referred to as per-fragment lighting or per-pixel lighting. Essentially, it involves performing vector dot and cross products to simulate the intensity of light on a pixel. Additionally, within this shader, you have the flexibility to incorporate various techniques such as blending multiple textures or creating the illusion of bumps through bump mapping.

Determining which calculated fragments actually become pixels depends on factors like anti-aliasing and the output merger stage. For instance, when rendering multiple cubes positioned in front of one another, the depth buffer comes into play. Each fragment carries a depth value, known as z, which provides depth information for every aspiring pixel. The depth buffer stores this z information to determine which elements should be drawn on top.

This file handles everything that has to do with the actual coloring of the pixels, and ends with setting the built in variable called **gl_FragColor** equal to a color.

## **Writing a basic shader**
The following code makes a gradient depending on the position of the pixel on your canvas using <a href='https://p5js.org/' target='_blank'>P5 JS</a>. 

Remembering the stept sequence: The .vert file is run first, and automatically passes the calculations we do with the geometry (shapes) on our canvas on to the .frag file. The fragment file then colors the pixels according to their positions!

The only thing we are going to do in the .vert file, is to pass on the position of every pixel on the geometry on to the .frag file.
In p5 the pixel must know where on the canvas it belongs. That attribute is *aPosition*, and has the position information of x, y and z values. The clip space to use should be assigned to *gl_Position*, a reserved variable that expects a vec4. For that reason, we take the aPosition array, and add a w parameter, it is normally setted as 1.0 .
```
//shader.vert
precision mediump float;
vec3 aPosition;

void main() {

  // Copy the position data into a vec4, adding 1.0 as the w parameter
  gl_Position = vec4(aPosition, 1.0);

}
```

On the fragment shader, we will create a *color* variable, which is going to be the background of our scene. The RGB colors in shaders goes from 0.0 - 1.0. For this case, we are going to use "Magenta" where the color values are (255, 0, 255) or in shaders (1.0, 0.0, 1.0). This one will be the color apply to every pixel that we define in the canvas.

The key variable *gl_FragColor* expects the format vec4 (r,g,b,a), so we put in 1.0 as our alpha, meaning no transparency. 

```
//shader.frag
precision mediump float;

void main() {

    // Make a blue color. 
    // In shaders, the RGB color goes from 0 - 1 instead of 0 - 255
    vec3 color = vec3(1.0, 0.0, 1.0);   

    gl_FragColor = vec4(color, 1.0);

}
```

Finally, this is the result applying the shader to a rectangle that occupies all the space.

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js></script>
            <script src=/showcase/sketches/shaders/shaderExample.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>



<style>
    .sketch{
        width: 400px;
        height: 400px;
        display: flex;
        align: center;
    }
</style>



## **Applications**

- Realistic Lighting: Shaders are commonly used to calculate lighting effects. They enable the creation of realistic lighting models that enhance the visual quality of 3D scenes in applications like video games, architectural visualization, and film production.

- Material Shading and Texturing: Shaders allow for the application of complex material properties to 3D objects. By combining shaders with texture mapping techniques, it becomes possible to simulate various surface characteristics, including reflections, transparency, and bump mapping. This is widely used in game development, virtual reality (VR) experiences, and computer-generated imagery (CGI) rendering.

- Post-processing Effects: Shaders can be utilized for real-time image post-processing effects. These effects include depth of field, motion blur, bloom, color grading, and various filters. Post-processing shaders are commonly employed in video games, film and video editing, and augmented reality (AR) applications to enhance visual aesthetics and create specific atmospheric effects.

- Special Effects: Shaders enable the creation of a wide range of special effects, such as particle systems, fire and water simulations, explosions, and realistic weather phenomena. These effects add dynamism and visual impact to games, animations, and visual effects in movies.

- Cross-Platform Compatibility: Shaders can be shared and used across different platforms, including desktop, mobile, and web, with minimal code changes. This allows developers to leverage shader effects across multiple devices and target a broader audience. It simplifies the process of porting graphics-intensive applications and games between platforms, reducing development time and effort.

## **Key points**

- It is important to remember that using shaders, you are using a lot of cores. That means a big amount of actions at the same time. So, you should be careful with the instructions and the actions executed in order to do not crash the application or decrease the performance doing repetitive directives.

- Floats are heavely used for the operations in shaders. Be sure to use always them correctly, it is a common error to write in your code "5" and not "5.0" as it should be.

- Usually thinking in what you want to do with just one pixel is usefull to understand better which is the best way to create the modifications that you are trying to do.

- Debugging and error handling is dificult. Do not stress when something is not working how you expected, keep things easy and be sure to follow correctly the data flow. *(Are you using float numbers?)*

# **References**
- Ferriss, A. (n.d.). p5.js shaders. P5.js shaders. https://itp-xstory.github.io/p5js-shaders/#/ 
- Gonzalez Vivo, P. (2015). The book of shaders. The Book of Shaders. https://thebookofshaders.com/ 
- Tukalo, A. (2022, July 28). Introduction to shaders. LightningChart. https://lightningchart.com/blog/introduction-to-shaders/ 
- Charalambos, J. P. (n.d.). Introduction. Introduction | Visual Computing. https://visualcomputing.github.io/ 