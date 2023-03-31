let img;
let currentPalette = [];
let y = 0;
let canvasSize = 700;

let images = [
    'Landscape.jpg',
    'Ishihara_01.jpg',
    'Ishihara_02.jpg',
    'Ishihara_03.jpg',
    'Ishihara_05.jpg',
    'Ishihara_06.jpg',
    'Ishihara_08.jpg',
    'Ishihara_10.jpg',
];

function preload() {
  let index = floor(random(images.length));
  img = loadImage('/showcase/assets/' + images[index]);
}

function setup() {
  createCanvas(canvasSize, round(img.height*canvasSize/img.width));

  ibm = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];

  wong = ['#000000', '#E69F00', '#56B4E9', '#009E73', '#F0E442',
                '#0072B2', '#D55E00', '#CC79A7'];

  tol = ['#332288', '#117733', '#44AA99', '#88CCEE', '#DDCC77',
                '#CC6677', '#AA4499', '#882255'];

  palette1 = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

  palette2 = ["#FFFFFF", "#000000", "#FFC0CB", "#008000", "#FFD700"];

  palette3 = ['#F5793A', '#A95AA1', '#85C0F9', '#0F2080', '#FDFC33'];

  currentPalette = ibm;

  paletteSel = createSelect();
  paletteSel.position(10, 10);
  paletteSel.option('Paleta IBM');
  paletteSel.option('Paleta Wong');
  paletteSel.option('Paleta Tol');
  paletteSel.option('Paleta 1');
  paletteSel.option('Paleta 2');
  paletteSel.option('Paleta 3');
  paletteSel.changed(changePalette);

  img.resize(width, height);
  image(img, 0, 0);
}

function changePalette() {
    let selected = paletteSel.value();
    if(selected === 'Paleta 1') currentPalette = palette1;
    else if(selected === 'Paleta 2') currentPalette = palette2;
    else if(selected === 'Paleta 3') currentPalette = palette3;
    else if(selected === 'Paleta IBM') currentPalette = ibm;
    else if(selected === 'Paleta Wong') currentPalette = wong;
    else if(selected === 'Paleta Tol') currentPalette = tol;
    y = 0;
    loop();
    image(img, 0, 0);
    redraw();
}

function draw() {
    for(let x = 0; x < width; x++) {
        let imgColor = img.get(x, y);
        let paletteColor = getPaletteColor(imgColor);
        stroke(paletteColor);
        point(x, y);
    }
    y+=2;
    if(y>=height) noLoop();

}

function getPaletteColor(imgColor) {
    let r = red(imgColor);
    let g = green(imgColor);
    let b = blue(imgColor);
    let minDist = Infinity;
    let color;
    for(let i = 0; i < currentPalette.length; i++) {
        let pColor = currentPalette[i];
        let d = dist(r, g, b, red(pColor), green(pColor), blue(pColor));
        if(d < minDist) {
            minDist = d;
            color = currentPalette[i];
        }
    }
    return color;
}