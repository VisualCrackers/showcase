---
weight: 1
---

# **Color Blender**

One basic rendering application is the **mix of colors**. *[Blending colors](https://cglearn.codelight.eu/pub/computer-graphics/blending)* refers to the process of combining two or more colors to create a new one. The principal theory behind this sketch is manipulate the color components RGB of both colors and determining in which way they will interact.

This idea is applied in areas as Image Editing, Lighting and Shading, Color Interpolation and Color Correction. There are several operations that allow to obtain different results, such as addition, multiplication, substraction, overlay, screen, darken, lighten and so more. For each *effect* exists equations to perform this operations mathematically.

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

The use of shaders here, gives facilities at the time of show the results, but mainly during the blending of the colors executing the operations. Those operations are not difficult, but the space change of RGB values from [0, 255] to [0.0, 1.0] allows to always stay in the correct range avoiding the math gimmicks needed in other cases.


<style>
    .sketch{
        width: 630px;
        height: 630px;
        display: flex;
    }
</style>