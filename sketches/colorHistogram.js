let red_arr = new Array(256);
let green_arr = new Array(256);
let blue_arr = new Array(256);

let colors = new Array(3);
let img,img1,img2,img3, img4;
let leftM = 180;
let upM = 15;

let canvasWidth = 700;
let canvasHeight = 550; 

function preload() {
img1 = loadImage("/showcase/assets/Cristales.jpeg");
img2 = loadImage("/showcase/assets/Rainbow.png");
img3 = loadImage("/showcase/assets/Landscape.jpg");
img4 = loadImage("/showcase/assets/Colombia.jpg");
}

function getIndex(x, y) {
    return (x + y * img.width) * 4;
}

function setup() {
    img = img1;
    img.resize(canvasWidth/2, canvasHeight/2.2);
    createCanvas(canvasWidth, canvasHeight);  

    for (let i = 0; i < 256; i++) {
        red_arr[i] = green_arr[i] = blue_arr[i] = 0;
    }

    loadPixels();
    img.loadPixels();
    filtered = createImage(img.width, img.height);
    filtered.loadPixels();

    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let idx = getIndex(i, j);
            let r = img.pixels[idx + 0];
            let g = img.pixels[idx + 1];
            let b = img.pixels[idx + 2];
            red_arr[r]++;
            green_arr[g]++;
            blue_arr[b]++;
        }
    }

    colors[0] = red_arr;
    colors[1] = green_arr;
    colors[2] = blue_arr;

    img.updatePixels();
    filtered.updatePixels();
    updatePixels();

    // Crea el selector desplegable de imágenes
    imageSelector = createSelect();
    imageSelector.position(620, 10);
    imageSelector.option("Image 1");
    imageSelector.option("Image 2");
    imageSelector.option("Image 3");
    imageSelector.option("Image 4");
    imageSelector.selected("Image 1");
    imageSelector.changed(updateSelectedImage);
}

function updateSelectedImage() {
    let selectedImage = imageSelector.value();
    if (selectedImage == "Image 1") {
        img = img1;
    } else if (selectedImage == "Image 2") {
        img = img2;
    } else if (selectedImage == "Image 3") {
        img = img3;
    } else if (selectedImage == "Image 4") {
        img = img4;
    }
    img.resize(canvasWidth/2, canvasHeight/2.2);
    calculateHistogram(img);
}

function calculateHistogram(imagen) {
    for (let i = 0; i < 256; i++) {
        red_arr[i] = green_arr[i] = blue_arr[i] = 0;
    }

    loadPixels();
    imagen.loadPixels();
    filtered.loadPixels();

    for (let i = 0; i < imagen.width; i++) {
        for (let j = 0; j < imagen.height; j++) {
            let idx = getIndex(i, j);
            let r = imagen.pixels[idx + 0];
            let g = imagen.pixels[idx + 1];
            let b = imagen.pixels[idx + 2];
            let a = imagen.pixels[idx + 3];
            red_arr[r]++;
            green_arr[g]++;
            blue_arr[b]++;
        }
    }

    colors[0] = red_arr;
    colors[1] = green_arr;
    colors[2] = blue_arr;

    imagen.updatePixels();
    updatePixels();
}

function draw() {
    background(255);
    image(img, 180, 10);
    stroke(0);
    push();
    paint(color('rgba(255,0,0,0.1)'), colors[0]);
    paint(color('rgba(0,255,0,0.1)'), colors[1]);
    paint(color('rgba(0,0,255,0.1)'), colors[2]);
    pop();
    graph();
}

function graph() {
    push();
    textAlign(CENTER);
    textSize(14);

    text('RGB color values (0 - 255) ', leftM + img.width / 2, 2 * img.height + 2 * upM);
    let angle2 = radians(270);
    translate(leftM / 2, (3 / 2) * img.height);
    rotate(angle2);
    text("Frequency", 0, -40);
    pop();
}

function paint(color, array) {
    push();
    stroke(color);
    for (let i = 1; i < 256; i++) {
        xPos = map(i, 0, 256, leftM - img.width/3, leftM + img.width*1.3)
        xPrev = map(i - 1, 0, 256, leftM- img.width/3, leftM + img.width*1.3)
        yPos = map(array[i], 0, max(array), 2 * img.height, img.height + 50)
        yPrev = map(array[i - 1], 0, max(array), 2 * img.height, img.height + 50)
        line(xPrev, yPrev, xPos, yPos)
        line(xPos, 2 * img.height, xPos, yPos)
    }
    pop();
}