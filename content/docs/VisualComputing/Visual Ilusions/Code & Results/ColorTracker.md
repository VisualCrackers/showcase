---
weight: 2
---

# **Color tracker**

The reduced ability to distinguish between certain colors due to a genetic defect such as [***color blindness***](https://en.wikipedia.org/wiki/Color_blindness), makes color an important variable when making any design; that is why it is important to try to reduce the inconveniences that this can cause. Additionally, this different or null perception of colors is not only a condition like things are seen, but it also affects the ability to *get information from the environment*.

Facing color blindness is a challenge that is not easy to assume, especially when a first approach is made since you do not have a clear idea of what the world of a colorblind person looks like. However, it is the people with this disability who usually have to accommodate to others and the confusion between colors can generate great frustration.

## What can be done?

In search of an alternative to reduce the inconveniences that this can cause, a script was created in P5.js that allows *monitoring of the colors* found on the screen, and in turn *identifies* them automatically in the names of the colors that have been established in the system.

### How does it work?

{{< hint >}}
To match the color that the user wants, you can do it in two ways:
1. Clicking on the color that you want to identify that is in the current video.
2. Entering the amount of red, green and blue (RGB Code) you want to identify in the current video.
{{< /hint >}}

Once the color has been selected, the name of the color that most closely matches the existing ones in the list is displayed provided by the library [**Name That Color**](https://chir.ag/projects/name-that-color/) and, additionally, the closest pixel to the origin that matches that color is tracked.

{{< hint info >}}
The script below details how the pixel matrix of the current video is traversed in search of the first instance that is similar, given a tolerance margin.
{{< /hint >}}

{{< details title="findColor" open=true >}}
{{< highlight js >}}
function findColor(input, color){

  let matchR = color[0];
  let matchG = color[1];
  let matchB = color[2];

  input.loadPixels();
  for(let y=0; y<input.height; y++){
    for(let x=0; x<input.width; x++){
      let index = (y*input.width+x)*4;
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];

      if(r >= matchR-tolerance && r <= matchR+tolerance &&
         g >= matchG-tolerance && g <= matchG+tolerance &&
         b >= matchB-tolerance && b <= matchB+tolerance){
          return createVector(x, y)
      }
    }
  }
}
{{< /highlight >}}
{{< /details >}}

Once the color is found, it is highlighted in the video and the screen shows the hexadecimal code of the closest color found with the [*ntc*](https://chir.ag/projects/ntc/) library and its respective name. At a lower level, the color code that was selected to search is shown, which should not be too far from the one already found.

{{< hint warning >}}
The following functions are used to perform conversions and code determinations:
{{< /hint >}}

``` js
function componentToHex(color) {
  let hex = color.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
  return "#" + componentToHex(color[0]) + componentToHex(color[1]) + componentToHex(color[2]);
}
```

Finally, it was decided to also carry out the color label in a much smaller spectrum, which allows a more general identification of the colors. The implementation of this utility was made from the HSL color code. For the best visualization of the color you are working with, there is a box at the bottom that is filled with the matching color.

## Result

{{< hint >}}
The final result is the following Sketch that allows real-time ColorTracking through the camera.
{{< /hint >}}

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/colorTracker.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

{{< hint info>}}
**Colors**

The opensource library [**Name That Color**](https://chir.ag/projects/ntc/) provides a list of colors that includes more than 1500 color names, with their respective RGB and Hexadecimal codes. Also, it contains embedded the code that calculates the closest color to the given color.

{{< /hint>}}

{{< hint danger>}}
**Color Tracker**

The tracking and identification of the colors that are selected will be greatly affected by the lighting in the environment or the quality of the camera.
{{< /hint>}}

<style>
    .sketch{
        width: 100%;
        height: 500px;
        display: flex;
    }
</style>