---
weight: 1
---
{{< hint info >}}
# Palette Generator
{{< /hint >}}

A la hora de crear cualquier tipo de software, diseño, o herramienta, es importante considerar que no todos los 
usuarios tienen la misma capacidad de percepción. Los colores son variables que realmente afectan sobre la interacción
de los consumidores con el producto, por lo que realizar una *selección de la paleta apropiada* es una tarea que debe
contemplarse debidamente, y aún más cuando se procura que el producto sea **accesible** para todos.

{{< hint >}}
Obtener la paleta de colores que aparecen con más frecuencia de una imágen va a permitir que el diseñador pueda
evidenciar si los colores que ha seleccionado son los más adecuados para el producto, o si por el contrario, es necesario
realizar un cambio en la misma. También, a través de un generador de paletas de colores, se pueden investigar sobre
*combinaciones que son menos propensas a causar problemas de confusión* de colores para las personas con ***daltonismo***.
{{< /hint >}}

{{< hint info >}}
## ¿Cómo funciona?
{{< /hint >}}

El script se basa en la extracción de los colores que aparecen en una imágen, y la obtención de la frecuencia
de cada uno de ellos. Para ello, se ha utilizado el método **`loadPixels()`** de la librería P5.js, que permite obtener la 
información de cada uno de los pixeles de la imágen, y así poder realizar el conteo de los colores al recorrer la
pieza gráfica. Se guarda en un arreglo la información de cada color, y la frecuencia con la que aparece en la imágen,
teniendo en cuenta también una tolerancia para no hacer excesivamente grande la estructura de datos.

Una vez que se ha obtenido la información de los colores, se procede a ordenarlos de mayor a menor frecuencia,
tomando los primeros 7 colores de esta la lista, y mostrándolos en la parte inferior del canvas.

{{< hint warning >}}
El código para la extracción de los colores se muestra a continuación:
{{< /hint >}}

{{< details title="extractColors" open=true >}}
{{< highlight js >}}
function extractColors() {
  colors = [];
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = color(img.get(x, y));
      let found = false;
      for (let i = 0; i < colors.length; i++) {
        let existingColor = colors[i][0];
        if (colorDistance(existingColor, c) < tolerance) { // tolerance range
          found = true;
          colors[i][1]++;
          break;
        }
      }
      if (!found) {
        colors.push([c, 1]);
      }
    }
  }
}
{{< /highlight >}}
{{< /details >}}

{{< hint info >}}
Para ordenar la paleta de colores en la parte inferior del canvas se ha utilizado el método **`colorNumber(color)`** 
que permite realizar una conversión del código RGB a un valor numérico, y así poder colocarlos en un orden agradable 
armonicamente para la vista.
{{< /hint >}}

```js
function colorNumber(c) {
    return 256*256*red(c) + 256*green(c) + blue(c);
}
```

{{< hint info >}}
Para obtener la distancia entre dos colores se ha utilizado la fórmula de la distancia euclidiana, que permite
obtener la distancia entre dos puntos en un espacio de n dimensiones. En este caso, se ha utilizado para obtener
la distancia entre dos colores en el espacio RGB en la función **`colorDistance(c1, c2)`**.
{{< /hint >}}

El resultado final es el siguiente:
{{< hint warning >}}
**Advertencia:**

Para algunas imágenes el procesamiento puede ser tardado debido al recorrido que es necesario realizar, por lo que
se recomienda utilizar imágenes de un tamaño reducido, asi como también se puede presentar demoras en caso que la
imágen tenga demasiados colores distintos.
{{< /hint >}}

{{< p5-iframe sketch="/showcase/sketches/palette.js" width="735" height="600" >}}

{{< hint danger >}}
**Debilidades:**

Si existen muchos colores parecidos, segun el valor de la tolerancia, puede que no se muestren todos los colores 
importantes que se podrian visualizar con la percepción humana, ya que el orden de procesamiento de la imágen hace
que los colores en la parte superior tengan mayor prioridad.
{{< /hint >}}