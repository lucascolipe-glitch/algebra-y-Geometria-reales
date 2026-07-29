# Álgebra y Geometría I · Números Reales

Proyecto web interactivo listo para publicar en **Glitch**. Reúne teoría, ejemplos guiados y práctica sobre:

- conjuntos numéricos y propiedades de los números reales;
- ecuaciones cuadráticas, bicuadradas, exponenciales, radicales, racionales y logarítmicas;
- orden, intervalos, unión, intersección y complemento;
- inecuaciones polinómicas y racionales;
- condiciones iniciales y conjunto de existencia;
- valor absoluto;
- logaritmos;
- problemas de modelización tomados del Trabajo Práctico N.º 1.

## Cómo subirlo a Glitch

1. Crear un proyecto nuevo en Glitch con la opción **Import from GitHub** o **Hello Node**.
2. Reemplazar los archivos del proyecto por el contenido de esta carpeta.
3. Glitch ejecutará automáticamente `npm start`.
4. Abrir **Preview → Preview in a new window**.

No requiere dependencias externas de Node. La notación matemática se renderiza con MathJax desde CDN y los videos se cargan desde YouTube solo cuando el estudiante pulsa **Cargar video**.

## Estructura

```text
.
├── package.json
├── server.js
├── README.md
└── public
    ├── index.html
    ├── styles.css
    ├── content.js
    ├── app.js
    ├── manifest.webmanifest
    └── assets
        └── favicon.svg
```

## Funciones pedagógicas

- navegación por módulos;
- progreso guardado en `localStorage`;
- resoluciones paso a paso con botones **Anterior**, **Siguiente** y **Reiniciar**;
- constructor de intervalos con recta numérica;
- actividades autocorregibles con retroalimentación;
- explorador de valor absoluto con deslizador;
- simuladores de problemas contextualizados;
- autoevaluación final aleatoria;
- impresión de la guía y de las respuestas del estudiante.

## Revisión matemática de las fuentes

El sitio mantiene la organización y los ejercicios de los materiales provistos, pero verifica cada resultado antes de mostrarlo. En el archivo de resolución original aparecen algunas erratas tipográficas o de signos. Entre ellas:

- en la ecuación `sqrt(x) - 2/sqrt(x) = 1`, la única solución real es `x = 4`;
- en la verificación de `sqrt(3x-2)=4`, debe obtenerse `sqrt(16)=4`;
- para `(2x-5)/(x+3) <= 0`, la solución es `(-3, 5/2]`;
- para `x(x+1)/(x-1) <= x`, la condición inicial es `x != 1` y la solución es `[0,1)`;
- en el problema de temperatura se incorpora la restricción física `x >= 0`.

Estas correcciones se presentan como parte de una lectura crítica y no cambian el sentido didáctico del material.

## Personalización rápida

- Colores: variables CSS al comienzo de `public/styles.css`.
- Contenidos y preguntas: `public/content.js`.
- Textos y estructura: `public/index.html`.
- Comportamientos: `public/app.js`.

## Licencia

Material educativo distribuido bajo licencia **CC BY-NC-SA 4.0**, salvo los videos externos, que conservan las condiciones de sus respectivos autores y plataformas.
