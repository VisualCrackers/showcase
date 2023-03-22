let img;
let cnv;


function preload(){
  img = loadImage('assets/Mora-cantante.jpg');
}

function setup() {
  cnv = createCanvas(img.width, img.height);
  //print(img.width, img.height);
  let newCanvasX = (windowWidth - img.width)/2;
  let newCanvasY = (windowHeight - img.height)/2;
  cnv.position(newCanvasX, newCanvasY);
  for(let col = 0; col < img.width; col+=5){
    for(let row = 0; row < img.height; row+=5){
      let xPos = col;
      let yPos = row;
      let c = img.get(xPos, yPos);
      push();
      //translate(xPos, yPos);
      //noFill();
      fill(color(c));
      //strokeWeight(random(5));
      //point(col, row);
      rect(col, row, 10, 5);
      pop();
    }
  }
}

