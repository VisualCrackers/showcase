---
weight: 3
---

# **PhotoMosaic**

This program utilizes the power of shaders to create captivating photomosaic effects. By analyzing the luminance of each pixel in an original image, the program intelligently selects smaller images from a palette to replace the pixels, resulting in a visually stunning composition of smaller images that form the larger picture.

Each tile is replaced with a carefully chosen image from a collection of smaller images, creating a mosaic-like representation of the original.

## How does it works?
The fragment shader code performs intricate calculations to determine the closest match between the luminance values of the original image pixels and the images in the palette. It adjusts the texture coordinates and retrieves the corresponding images to seamlessly blend them into the mosaic. The shader also provides the option to visualize the UV coordinates to understand better the contribution from each tile.

Inside the main() function of the *fragment shader*, it calculates the luminance (brightness) of the current texel from the original image using the luma() function implemented with [Component average](https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color). Then, the shader proceeds to find the closest match from the palette of smaller images iterating over each image in the palette and comparing the luminance values.

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



<style>
    .sketch{
        width: 630px;
        height: 630px;
        display: flex;
    }
</style>