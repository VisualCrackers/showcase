---
weight: 2
---
{{< hint info >}}
# Color tracker
{{< /hint >}}

La capacidad reducida de distinguir entre ciertos colores debido a un defecto genético como lo es
el [***daltonismo***](https://es.wikipedia.org/wiki/Daltonismo), hace que el color sea una variable importante a la hora de realizar cualquier diseño;
es por ello que es importante intentar reducir los inconvenientes que esto puede ocasionar. 
Adicionalmente, esta percepción  distinta o nula sobre los colores no solo es una afección a como 
se ven las cosas, sino que también afecta en la capacidad de *obtener información del entorno*.

Enfrentarse al daltonismo es un reto que no es fácil de asumir, en especial cuando se realiza un primer acercamiento
ya que no se tiene una idea clara de como se ve el mundo de una persona daltonica. Sin embargo, son las personas con
esta discapacidad las que usualmente tienen que acomodarse a los demás, y las confusiones entre colores pueden generar
una gran frustración.

---
{{< hint info >}}
## ¿Y que se puede hacer?
{{< /hint >}}

En busca de una alternativa para reducir los inconvenientes que esto puede ocasionar, se realizó un script en P5.js que
permite realizar un *seguimiento de los colores* que se encuentran en la pantalla, y a su vez los *identifica* de manera automática
en los nombres de los colores que han sido establecidos en el sistema.

{{< hint info >}}
### ¿Cómo funciona?
{{< /hint >}}

{{< hint >}}
Para realizar el match del color que el usuario desea, puede hacerlo de dos maneras:
1. Dando click sobre el color que desea identificar que se encuentra en el video actual.
2. Ingresando la cantidad de rojo, verde y azul (Codigo RGB) que desea identificar en el video actual.
{{< /hint >}}

Una vez que se ha seleccionado el color, se muestra el nombre del color que más se asemeja entre los existentes de la lista
proporcionada por [**Name That Color**](https://chir.ag/projects/name-that-color/) y, adicionalmente, se realiza el seguimiento del pixel más cercano al origen que concuerde
con dicho color.

{{< hint warning >}}
El script a continuación detalla como se recorre la matriz de pixeles del video actual en búsqueda de la primera instancia
que sea similar contando con un margen de tolerancia.
{{< /hint >}}

{{< details title="findColor" open=true >}}
{{< highlight js >}}
function findColor(input, color){

  let matchR = color[0];
  let matchG = color[1];
  let matchB = color[2];

  input.loadPixels();
  for(let y=0; y<input.height; y++){
    for(let x=0; x<input.width; x++){
      let index = (y*input.width+x)*4;
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];

      if(r >= matchR-tolerance && r <= matchR+tolerance &&
         g >= matchG-tolerance && g <= matchG+tolerance &&
         b >= matchB-tolerance && b <= matchB+tolerance){
          return createVector(x, y)
      }
    }
  }
}
{{< /highlight >}}
{{< /details >}}

Una vez encontrado el color, este se resalta en el video a la vez que se muestra el codigo hexadecimal del color
mas cercano encontrado con la libreria [*ntc*](https://chir.ag/projects/ntc/) y su respectivo nombre. En un nivel inferior se muestra el codigo del color
que fue seleccionado a buscar, el cual no debe ser muy distante del ya encontrado.

{{< hint warning >}}
Para realizar las conversiones y determinaciones de códigos se utilizaron las siguientes funciones:
{{< /hint >}}

``` js
function componentToHex(color) {
  let hex = color.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
  return "#" + componentToHex(color[0]) + componentToHex(color[1]) + componentToHex(color[2]);
}
```

Por ultimo, se decidió realizar también la etiqueta de color en un espectro mucho más reducido, pero que permite
una identificación más general de los colores; la implementación de esta utilidad se realizo a partir del codigo de color HSL.
Para la mejor visualización del color con el que se está trabajando,
existe un cuadro en la parte inferior que se rellena con el color del matching.

{{< hint >}}
El resultado final es el siguiente Sketch que permite realizar un ColorTracking en tiempo real a través de la cámara.
{{< /hint >}}

{{< p5-iframe sketch="/showcase/sketches/colorTracker.js" width="735" height="525" >}}

{{< hint info>}}
**Colores**

La libreria de opensource [**Name That Color**](https://chir.ag/projects/ntc/) proporciona una lista de colores
que incluye más de 1500 nombres de colores, con sus respectivos códigos RGB y Hexadecimales.
También, contiene inmerso el código que calcula el color más cercano al color dado.
{{< /hint>}}

{{< hint danger>}}
**ColorTracker**

El seguimiento e identificación de los colores que sean seleccionados se verá bastante afectado por la iluminación del ambiente,
al igual que la calidad de la cámara.
{{< /hint>}}