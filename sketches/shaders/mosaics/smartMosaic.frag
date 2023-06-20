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