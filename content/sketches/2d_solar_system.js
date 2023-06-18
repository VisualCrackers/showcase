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

const sun = new Planet('Sun','yellow',25,0,0,0);
const mercury = new Planet('Mercury','orange',3,30,1,1);
const venus = new Planet('Venus','#937D64',5,50,1,0.5);
const earth = new Planet('Earth','dodgerblue',5,75,1,0.75);
const mars = new Planet('Mars','red',4,90,1,0.60);
const asteroidsOrbit = new Planet('Asteroids Orbit','grey',5,100,0,0);
const jupiter = new Planet('Jupiter','pink',14,130,1,0.30);
const saturn = new Planet('Saturn','darkorange',9,160,1,0.25);
const uranus = new Planet('Uranus','lightgreen',8,180,1,0.15);
const neptune = new Planet('Neptune','cyan',7,200,1,0.1);
const pluto = new Planet('Pluto','gold',1.5,220,1,0.05);
let rotationMoon = 0;
let generalSpeed = 1;

function setup(){
  createCanvas(700,700);
  angleMode(DEGREES);
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