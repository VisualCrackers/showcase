let img;
let palette = [];
let y = 0;
let canvasSize = 700;

let images = [
    'https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/2560px-Flag_of_Canada_%28Pantone%29.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Escudo_de_la_Universidad_Nacional_de_Colombia_%282016%29.svg/1200px-Escudo_de_la_Universidad_Nacional_de_Colombia_%282016%29.svg.png',
    'https://historiadelavida.editorialaces.com/wp-content/uploads/2019/02/De-donde-viene-el-arcoiris-PORTADA.png',
    'https://images7.alphacoders.com/532/532603.jpg',
    'https://elturismoencolombia.com/wp-content/uploads/2021/12/bandera-colombia-turismo.jpg',
    'https://www.colorlitelens.com/images/Ishihara/Ishihara_01.jpg',
    'https://www.colorlitelens.com/images/Ishihara/Ishihara_04.jpg'
];

function preload() {
  let index = floor(random(images.length));
  img = loadImage(images[index]);
}

function setup() {
  createCanvas(canvasSize, round(img.height*canvasSize/img.width));
  palette = ['#264653', '#2a9d8f',
   '#e9c46a', '#f4a261',
   '#e76f51'
  ];

  palette1 = ['#648FFF', '#785EF0', '#DC267F', '#FE6100', '#FFB000'];

  palette2 = ['#000000', '#E69F00', '#56B4E9', '#009E73', '#F0E442',
                '#0072B2', '#D55E00', '#CC79A7'];

  palette3 = ['#332288', '#117733', '#44AA99', '#88CCEE', '#DDCC77',
                '#CC6677', '#AA4499', '#882255'];

  img.resize(width, height);
  image(img, 0, 0);
}


//Function draw in testing.js
function draw() {
    for(let x = 0; x < width; x++) {
        let imgColor = img.get(x, y);
        let paletteColor = getPaletteColor(imgColor);
        stroke(paletteColor);
        point(x, y);
    }
    y++;
    if(y>=height) noLoop();

}

function getPaletteColor(imgColor) {
    let r = red(imgColor);
    let g = green(imgColor);
    let b = blue(imgColor);
    let minDist = Infinity;
    let color;
    for(let i = 0; i < palette.length; i++) {
        let pColor = palette[i];
        let d = dist(r, g, b, red(pColor), green(pColor), blue(pColor));
        if(d < minDist) {
            minDist = d;
            color = palette[i];
        }
    }
    return color;
}