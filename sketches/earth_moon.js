function preload() {
    textura_tierra = loadImage('/showcase/assets/earth_texture.jpg');
    textura_luna = loadImage('/showcase/assets/moon_texture.jpg');
    textura_fondo_estrellas = loadImage('/showcase/assets/nocheHD.jpg')
}

function setup() {
    createCanvas(700, 700, WEBGL);
}

function draw() {
    background("black")
    
    noStroke() //No dibujar la malla de las esferas
    
    texture(textura_fondo_estrellas)
    sphere(800)

    for (let i = 0; i < 3; i++) {
         directionalLight(
              255, 255, 255 - i * 25,//Color
              -1, 1, -1 //Dirección
         );
    }

    orbitControl() //Controlar con el mouse la camara

    rotateZ(-0.3) //Inclinación de la tierra

    push()
    rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
    texture(textura_tierra); 
    sphere(100);
    pop()

    push()
    rotateY(-frameCount * 0.05 / 10);//Traslación de la luna al rededor de la tierra
    translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
    rotateY(-frameCount * 0.05);//Rotación del la luna sobre su propio eje
    texture(textura_luna);
    sphere(25);
    pop()
}