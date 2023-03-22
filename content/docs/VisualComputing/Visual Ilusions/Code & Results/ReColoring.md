---
weight: 3
---
{{< hint info >}}
# Re-Coloring
{{< /hint >}}

La posibilidad de cambiar los colores de una figura es una de las características más interesantes de la 
computación gráfica, ya que permite realizar transformaciones de una imagen de una manera sencilla y rápida. 
En este caso, se ha utilizado la librería **p5.js** para efectuar la transformación de colores de una imágen a
partir del cambio de la paleta que está utilizando.

A través del uso de distintas paletas de colores se pueden obtener efectos en la imágen que pueden ser
implementados para ayudar a las personas con daltonismo; por ejemplo, se puede cambiar la paleta de colores
de una imágen para que sea más fácil de distinguir para una persona con problemas visuales.

{{< hint >}}
Existen ciertas paletas de colores que son más adecuadas para personas con daltonismo, como la paleta de
colores [**IBM**](https://lospec.com/palette-list/ibm-color-blind-safe),
[**Wong**](https://www.color-hex.com/color-palette/1018347), o [**Tol**](https://personal.sron.nl/~pault/).
{{< /hint >}}

{{< hint warning >}}
Para mayor información acerca de las paletas de colores para personas con daltonismo, se puede consultar el
siguiente [artículo](https://davidmathlogic.com/colorblind/) por [David Nichols](https://davidmathlogic.com/).
{{< /hint >}}

{{< hint info >}}
## ¿Cómo funciona?
{{< /hint >}}

El script se basa en la extracción de los colores que aparecen en una imágen, y a partir de la paleta seleccionada
por el usuario, se procede a cambiar los de la imágen original. El punto fundamental del código es encontrar
la distancia entre los colores de la paleta y los de la imágen, y a partir de ahí, se selecciona el más cercano
para realizar el reemplazo.

Este código se muestra a continuación:

{{< details title="getPaletteColor" open=true >}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

{{< hint info >}}
Es importante destacar que las paletas con las que se cuentan no representan una solución para todos los casos,
ya que no todas las personas con daltonismo tienen los mismos problemas y depende en gran parte de los colores
que se tengan en la figura original.
{{< /hint >}}

{{< p5-iframe sketch="/showcase/sketches/recoloring.js" width="735" height="525" >}}

{{< hint danger >}}
Aunque se puede utilizar una paleta de colores para personas con daltonismo, 
no se garantiza que la persona pueda distinguir los colores de la imágen.
{{< /hint >}}

{{< hint info >}}
# Muestras
{{< /hint >}}

## Ishihara Test 7
---

{{< columns >}}
## Vista sin alteraciones
![Ishihara original](https://i.ibb.co/xhkcw5v/74-Original.png "Ishihara original")

<--->

## Vista con Protanopia
![Ishihara protanopia](https://i.ibb.co/Cm162h0/74-Protanopia.png "Ishihara protanopia")

{{< /columns >}}

{{< columns >}}
## Paleta IBM
![Ishihara paleta x](https://i.ibb.co/6R9R4MG/74IBM.png "Ishihara con paleta IBM")

<--->

## Paleta #2

![Ishihara paleta y](https://i.ibb.co/gJT7t5w/74-Paleta2.png "Ishihara con paleta #2")

{{< /columns >}}

## Ishihara Test 4

---

{{< columns >}}
## Vista sin alteraciones
![Ishihara original](https://i.ibb.co/3TKJ5fQ/5-Original.png "Ishihara original")

<--->

## Vista con Protanopia
![Ishihara protanopia](https://i.ibb.co/SmKjtsH/5-Protanopia.png "Ishihara protanopia")

{{< /columns >}}

{{< columns >}}
## Paleta IBM
![Ishihara paleta x](https://i.ibb.co/7ttF5zP/5IBM.png "Ishihara con paleta IBM")

<--->

## Paleta #3

![Ishihara paleta y](https://i.ibb.co/F5Sv2fj/5Paleta3.png "Ishihara con paleta #3")

<--->

## Paleta #2

![Ishihara paleta z](https://i.ibb.co/64ThknP/5Paleta2.png "Ishihara con paleta #2")

{{< /columns >}}