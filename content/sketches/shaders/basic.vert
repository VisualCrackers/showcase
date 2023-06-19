precision mediump float;

attribute vec3 aPosition;
varying vec2 vTexCoord;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);

  gl_Position = positionVec4;
}
