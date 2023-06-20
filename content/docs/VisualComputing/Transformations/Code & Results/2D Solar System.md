---
weight: 1
---

# **2D Solar System**

One way we can easily understand how these transformations work is by recreating a basic 2D solar system. In this model, we can see how objects move in relating to others by observing how the planets rotate around the sun, and how the moon rotates around the earth.

## How does it work?

First of all, we define the class Planet, which will be used to create the planets and the sun (we know it is not a planet, but for this example it works). This class has the following attributes:

```js
class Planet {
  constructor(name,color,dimension,distance,angle,speed){
  this.name = name;
    this.color = color;
    this.dimension = dimension;
    this.distance = distance;
    this.angle = angle;
    this.speed = speed;
  }
}
```

Then, we create the planets instances and define the attributes for each one of them. As for the sun's attributes, we use a speed of 0, because it should remain still in the center of the canvas.

We then define a function **`planetShow`** for each of the planets, which will be used to display them on the canvas. This function will be called in the **`draw`** function, which is executed continuously. Inside it, we also draw the orbit of each planet taking into account the distance attribute. Finnaly we update the angle attribute, which will be used to calculate the position of the planet in the next frame. Here we can see the code for the Earth:

{{< hint >}}
It is important to note the use of the **`push()`** and **`pop()`** functions. These functions are used to isolate the transformations applied inside them, so that they don't affect the rest of the code. In this case, we use them to isolate the transformations applied to each planet, so that they don't affect the rest of the model.
{{< /hint >}}

```js
function earthShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(1);
  stroke('grey');
  noFill();
  circle(0,0,earth.distance*2.8 + 3);
  //Draw this.Planet
  rotate(earth.angle);
  noStroke();
  fill(earth.color);
  circle(earth.distance,earth.distance,earth.dimension);
  //Moon
  fill('white');
  translate(earth.distance,earth.distance)
  rotate(-rotationMoon);
  circle(7,7,2);
  pop();   
  earth.angle += earth.speed; 
  rotationMoon += 12;
}
``` 
As you can see, we also draw the Moon inside it, using similar methods as for the planets but considering the Earth as the point of reference for it to rotate around. 

## Result

The resulting sketch is shown below. You can also find the full code in the bottom of the page.

<iframe id="palette" class="sketch" srcdoc="
        <!DOCTYPE html>
        <html>
          <head>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js></script>
            <script src=https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js></script>
            <script src=/showcase/sketches/2d_solar_system.js>
            </script>
          </head>
          <body>
          </body>
        </html>
      ">
</iframe>

## Full Code

{{< details title="2D_solar_system.js" open=false >}}
{{< highlight js >}}
class Planet {
  constructor(name,color,dimension,distance,angle,speed){
  this.name = name;
    this.color = color;
    this.dimension = dimension;
    this.distance = distance;
    this.angle = angle;
    this.speed = speed;
  }
}

let rotationMoon = 0;
let sun, mercury, venus, earth, mars, asteroidsOrbit, jupiter, saturn, uranus, neptune, pluto;

function setup(){
  createCanvas(700,700);
  angleMode(DEGREES);
  sun = new Planet('Sun','yellow',25,0,0,0);
  mercury = new Planet('Mercury','orange',3,18,random(360),0.479);
  venus = new Planet('Venus','#937D64',5,30,random(360),0.35);
  earth = new Planet('Earth','dodgerblue',5,50,random(360),0.29);
  mars = new Planet('Mars','red',4,65,random(360),0.24);
  asteroidsOrbit = new Planet('Asteroids Orbit','grey',5,80,0,0);
  jupiter = new Planet('Jupiter','pink',14,100,random(360),0.13);
  saturn = new Planet('Saturn','darkorange',9,130,random(360),0.097);
  uranus = new Planet('Uranus','lightgreen',8,160,random(360),0.068);
  neptune = new Planet('Neptune','cyan',7,190,random(360),0.054);
  pluto = new Planet('Pluto','gold',1.5,240,random(360),0.046);
}

function draw(){
  background('#000000');
  translate(width/2,height/2);

  sunShow();
  mercuryShow();
  venusShow();
  earthShow();
  marsShow();
  asteroidsShow();
  jupiterShow();
  saturnShow();
  uranusShow();
  neptuneShow();
  plutoShow();
  
}
function sunShow(){
  noStroke();
  fill(sun.color);
  circle(sun.distance,sun.distance,sun.dimension);  
}
function mercuryShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,mercury.distance*2.8);
  //Draw this.Planet
  rotate(mercury.angle);
  noStroke();
  fill(mercury.color);
  circle(mercury.distance,mercury.distance,mercury.dimension);
  pop(); 
  mercury.angle += mercury.speed;
}
function venusShow(){
  push();
    //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,venus.distance*2.8 + 1);
    //Draw this.Planet
  rotate(venus.angle);
  noStroke();
  fill(venus.color);
  circle(venus.distance,venus.distance,venus.dimension);
  pop(); 
  venus.angle += venus.speed;
}
function earthShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(1);
  stroke('grey');
  noFill();
  circle(0,0,earth.distance*2.8 + 3);
  //Draw this.Planet
  rotate(earth.angle);
  noStroke();
  fill(earth.color);
  circle(earth.distance,earth.distance,earth.dimension);
  //Moon
  fill('white');
  translate(earth.distance,earth.distance)
  rotate(-rotationMoon);
  circle(7,7,2);
  pop();   
  earth.angle += earth.speed; 
  rotationMoon += 12;
}
function marsShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,mars.distance*2.8 + 3);
  //Draw this.Planet
  rotate(mars.angle);
  noStroke();
  fill(mars.color);
  circle(mars.distance,mars.distance,mars.dimension);
  pop();   
  mars.angle += mars.speed;  
}
function asteroidsShow(){
  push();
  let randomAngle;
  let randomOffset;
  for (let i = 0; i < 100; i++) {
    randomAngle = random(0,360);
    randomOffset = random(0,10);
    rotate(randomAngle);
    circle(asteroidsOrbit.distance+ randomOffset,asteroidsOrbit.distance + randomOffset,0.8)
  }
  pop();    
}
function jupiterShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,jupiter.distance*2.8 + 6);
  //Draw this.Planet
  rotate(jupiter.angle);
  noStroke();
  fill(jupiter.color);
  circle(jupiter.distance,jupiter.distance,jupiter.dimension);
  pop();   
  jupiter.angle += jupiter.speed;  
}
function saturnShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,saturn.distance*2.8 + 6);
  //Draw this.Planet
  rotate(saturn.angle);
  noStroke();
  fill(saturn.color);
  circle(saturn.distance,saturn.distance,saturn.dimension);
  //Draw Saturn Ring
  noFill();
  strokeWeight(3);
  stroke('grey');
  circle(saturn.distance,saturn.distance,18);
  pop();   
  saturn.angle += saturn.speed;  
}
function uranusShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,uranus.distance*2.8 + 6);
  //Draw this.Planet
  rotate(uranus.angle);
  noStroke();
  fill(uranus.color);
  circle(uranus.distance,uranus.distance,uranus.dimension);
  pop(); 
  uranus.angle += uranus.speed;
}
function neptuneShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,neptune.distance*2.8 + 6);
  //Draw this.Planet
  rotate(neptune.angle);
  noStroke();
  fill(neptune.color);
  circle(neptune.distance,neptune.distance,neptune.dimension);
  pop(); 
  neptune.angle += neptune.speed;
}
function plutoShow(){
  push();
  //Draw this.Planet orbit
  strokeWeight(0.5);
  stroke('grey');
  noFill();
  circle(0,0,pluto.distance*2.8 + 6);
  //Draw this.Planet
  rotate(pluto.angle);
  noStroke();
  fill(pluto.color);
  circle(pluto.distance,pluto.distance,pluto.dimension);
  pop(); 
  pluto.angle += pluto.speed;
}

{{< /highlight >}}
{{< /details >}}



<style>
    .sketch{
        width: 730px;
        height: 730px;
        display: flex;
    }
</style>