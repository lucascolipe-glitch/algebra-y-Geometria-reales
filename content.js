/* Contenido matemático editable del proyecto. */
window.APP_CONTENT = {
  guidedExamples: {
    quadratic: {
      title: 'Ecuación cuadrática con \(\pi\)',
      source: 'TP 1 · Ejercicio 1.a',
      statement: String.raw`\[x^2-2\pi x-3\pi^2=0\]`,
      steps: [
        {
          label: 'Reconocer la estructura',
          html: String.raw`La ecuación tiene la forma \(ax^2+bx+c=0\), con \(a=1\), \(b=-2\pi\) y \(c=-3\pi^2\). Podemos factorizar o aplicar la fórmula general.`
        },
        {
          label: 'Buscar una factorización',
          html: String.raw`Necesitamos dos términos cuyo producto sea \(-3\pi^2\) y cuya suma sea \(-2\pi\): \(-3\pi\) y \(\pi\).`
        },
        {
          label: 'Factorizar',
          html: String.raw`\[x^2-2\pi x-3\pi^2=(x-3\pi)(x+\pi)\]`
        },
        {
          label: 'Usar producto nulo',
          html: String.raw`\[(x-3\pi)(x+\pi)=0\iff x-3\pi=0\ \vee\ x+\pi=0\]`
        },
        {
          label: 'Conjunto solución',
          html: String.raw`\[x=3\pi\quad\text{o}\quad x=-\pi\qquad S=\{-\pi,3\pi\}\]`
        },
        {
          label: 'Verificar',
          html: String.raw`Al reemplazar \(x=3\pi\) o \(x=-\pi\) en la ecuación original, el primer miembro vale \(0\). Ambas soluciones son válidas.`
        }
      ]
    },
    biquadratic: {
      title: 'Ecuación bicuadrada',
      source: 'TP 1 · Ejercicio 1.b',
      statement: String.raw`\[x^4-10x^2+9=0\]`,
      steps: [
        {
          label: 'Detectar la forma',
          html: String.raw`Solo aparecen \(x^4\), \(x^2\) y un término independiente. Conviene hacer el cambio \(y=x^2\).`
        },
        {
          label: 'Cambiar de variable',
          html: String.raw`\[y^2-10y+9=0\]`
        },
        {
          label: 'Resolver en \(y\)',
          html: String.raw`\[y^2-10y+9=(y-1)(y-9)=0\]Por lo tanto, \(y=1\) o \(y=9\).`
        },
        {
          label: 'Volver a \(x\)',
          html: String.raw`Como \(y=x^2\), tenemos \(x^2=1\) o \(x^2=9\).`
        },
        {
          label: 'Extraer las raíces',
          html: String.raw`\[x=\pm1\quad\text{o}\quad x=\pm3\]`
        },
        {
          label: 'Conjunto solución',
          html: String.raw`\[S=\{-3,-1,1,3\}\]`
        }
      ]
    },
    radical: {
      title: 'Ecuación radical y condición inicial',
      source: 'TP 1 · Ejercicio 1.d',
      statement: String.raw`\[\sqrt{x}-\frac{2}{\sqrt{x}}=1\]`,
      steps: [
        {
          label: 'Condición inicial',
          html: String.raw`Debe existir \(\sqrt{x}\) y además no puede ser cero: \(x\ge 0\) y \(x\ne0\). Por lo tanto, \(x\gt 0\).`
        },
        {
          label: 'Elegir una sustitución segura',
          html: String.raw`Sea \(t=\sqrt{x}\). Por la condición inicial, \(t\gt 0\). La ecuación queda \[t-\frac{2}{t}=1.\]`
        },
        {
          label: 'Eliminar el denominador',
          html: String.raw`Multiplicamos por \(t\gt 0\): \[t^2-2=t.\]`
        },
        {
          label: 'Resolver la cuadrática',
          html: String.raw`\[t^2-t-2=0\iff(t-2)(t+1)=0\]Entonces \(t=2\) o \(t=-1\).`
        },
        {
          label: 'Aplicar la restricción',
          html: String.raw`Como \(t=\sqrt{x}\gt 0\), descartamos \(t=-1\). Queda \(\sqrt{x}=2\), luego \(x=4\).`
        },
        {
          label: 'Verificar en la original',
          html: String.raw`\[\sqrt4-\frac{2}{\sqrt4}=2-1=1\]Por lo tanto, \(S=\{4\}\).`
        }
      ]
    },
    rationalEquation: {
      title: 'Ecuación racional',
      source: 'TP 1 · Ejercicio 1.f',
      statement: String.raw`\[\frac{x+2}{x-2}=\frac{x+3}{x-3}+\frac{2}{x^2-5x+6}\]`,
      steps: [
        {
          label: 'Condiciones iniciales',
          html: String.raw`Factorizamos \(x^2-5x+6=(x-2)(x-3)\). Los denominadores exigen \(x\ne2\) y \(x\ne3\).`
        },
        {
          label: 'Elegir el denominador común',
          html: String.raw`El mínimo común denominador es \((x-2)(x-3)\). Multiplicamos toda la ecuación por ese producto.`
        },
        {
          label: 'Cancelar factores',
          html: String.raw`\[(x+2)(x-3)=(x+3)(x-2)+2\]`
        },
        {
          label: 'Desarrollar',
          html: String.raw`\[x^2-x-6=x^2+x-6+2\]`
        },
        {
          label: 'Despejar',
          html: String.raw`\[-x-6=x-4\iff -2=2x\iff x=-1\]`
        },
        {
          label: 'Controlar y verificar',
          html: String.raw`\(-1\) no viola las condiciones iniciales. Al sustituir, ambos miembros valen \(-\frac13\). Entonces \(S=\{-1\}\).`
        }
      ]
    },
    logarithmicEquation: {
      title: 'Ecuación logarítmica con radicales',
      source: 'TP 1 · Ejercicio 1.h',
      statement: String.raw`\[\log_3\sqrt{x-5}+\log_3\sqrt{2x-3}=1\]`,
      steps: [
        {
          label: 'Condiciones iniciales',
          html: String.raw`Los argumentos de los logaritmos deben ser positivos: \(\sqrt{x-5}\gt 0\) y \(\sqrt{2x-3}\gt 0\). Esto exige \(x\gt 5\).`
        },
        {
          label: 'Unir los logaritmos',
          html: String.raw`\[\log_3\!\left(\sqrt{x-5}\sqrt{2x-3}\right)=1\]`
        },
        {
          label: 'Usar la definición',
          html: String.raw`\[\sqrt{(x-5)(2x-3)}=3^1=3\]`
        },
        {
          label: 'Elevar al cuadrado',
          html: String.raw`Como ambos lados son no negativos, \[(x-5)(2x-3)=9.\]`
        },
        {
          label: 'Resolver la cuadrática',
          html: String.raw`\[2x^2-13x+6=0\]Sus raíces son \(x=6\) y \(x=\frac12\).`
        },
        {
          label: 'Filtrar con la condición inicial',
          html: String.raw`Solo \(x=6\) cumple \(x\gt 5\). Por lo tanto, \(S=\{6\}\).`
        },
        {
          label: 'Verificar',
          html: String.raw`\[\log_3(1)+\log_3(3)=0+1=1\]`
        }
      ]
    },
    productInequality: {
      title: 'Inecuación producto',
      source: 'TP 1 · Ejercicio 3.a',
      statement: String.raw`\[(-2x+4)x\ge0\]`,
      steps: [
        {
          label: 'Encontrar puntos críticos',
          html: String.raw`Los factores se anulan en \(x=0\) y \(x=2\). Estos puntos dividen la recta en \(( -\infty,0)\), \((0,2)\) y \((2,+\infty)\).`
        },
        {
          label: 'Analizar el primer intervalo',
          html: String.raw`Si \(x\lt 0\), entonces \(-2x+4\gt 0\) y \(x\lt 0\). El producto es negativo.`
        },
        {
          label: 'Analizar el intervalo central',
          html: String.raw`Si \(0\lt x\lt 2\), ambos factores son positivos. El producto es positivo.`
        },
        {
          label: 'Analizar el último intervalo',
          html: String.raw`Si \(x\gt 2\), \(-2x+4\lt 0\) y \(x\gt 0\). El producto es negativo.`
        },
        {
          label: 'Incluir los ceros',
          html: String.raw`La desigualdad es \(\ge0\), por lo que se incluyen \(0\) y \(2\).`
        },
        {
          label: 'Conjunto solución',
          html: String.raw`\[S=[0,2]\]`
        }
      ]
    },
    rationalInequality: {
      title: 'Inecuación racional con tabla de signos',
      source: 'TP 1 · Ejercicio 3.d',
      statement: String.raw`\[\frac{2x-5}{x+3}\le0\]`,
      steps: [
        {
          label: 'Condición inicial',
          html: String.raw`El denominador no puede anularse: \(x\ne-3\). Ese punto nunca se incluye.`
        },
        {
          label: 'Cero del numerador',
          html: String.raw`\(2x-5=0\) cuando \(x=\frac52\). Como se pide \(\le0\), este punto sí puede incluirse.`
        },
        {
          label: 'Dividir la recta',
          html: String.raw`Analizamos \(( -\infty,-3)\), \((-3,\frac52)\) y \((\frac52,+\infty)\).`
        },
        {
          label: 'Determinar signos',
          html: String.raw`La fracción es positiva en \(( -\infty,-3)\), negativa en \((-3,\frac52)\) y positiva en \((\frac52,+\infty)\).`
        },
        {
          label: 'Seleccionar lo pedido',
          html: String.raw`Buscamos valores negativos o cero. Tomamos el intervalo central e incluimos el cero del numerador.`
        },
        {
          label: 'Conjunto solución',
          html: String.raw`\[S=\left(-3,\frac52\right]\]`
        },
        {
          label: 'Lectura crítica de la fuente',
          html: String.raw`Esta conclusión se verificó con puntos de prueba. En una versión del archivo de resolución aparece el intervalo complementario por una errata de signos.`
        }
      ]
    },
    absoluteInequality: {
      title: 'Inecuación con valor absoluto',
      source: 'TP 1 · Ejercicio 11.d',
      statement: String.raw`\[|3x-6|\le4\]`,
      steps: [
        {
          label: 'Interpretar como distancia',
          html: String.raw`\(|3x-6|\le4\) significa que \(3x-6\) está a distancia no mayor que \(4\) del cero.`
        },
        {
          label: 'Usar la propiedad del menor',
          html: String.raw`\[-4\le3x-6\le4\]`
        },
        {
          label: 'Sumar 6 en los tres miembros',
          html: String.raw`\[2\le3x\le10\]`
        },
        {
          label: 'Dividir por 3',
          html: String.raw`Como \(3\gt 0\), el sentido de las desigualdades no cambia: \[\frac23\le x\le\frac{10}{3}.\]`
        },
        {
          label: 'Conjunto solución',
          html: String.raw`\[S=\left[\frac23,\frac{10}{3}\right]\]`
        }
      ]
    },
    boxModel: {
      title: 'Modelización: caja sin tapa',
      source: 'TP 1 · Ejercicio 5',
      statement: String.raw`De una hoja cuadrada de lado \(x\) se recortan cuadrados de \(9\,\text{cm}\) en las esquinas. La caja debe tener volumen \(144\,\text{cm}^3\).`,
      steps: [
        {
          label: 'Identificar las dimensiones',
          html: String.raw`La altura de la caja es \(9\,\text{cm}\). Cada lado de la base mide \(x-18\), porque se quitan \(9\,\text{cm}\) a cada extremo.`
        },
        {
          label: 'Plantear el volumen',
          html: String.raw`\[V=\text{área de base}\cdot\text{altura}=9(x-18)^2\]`
        },
        {
          label: 'Usar el dato',
          html: String.raw`\[9(x-18)^2=144\iff(x-18)^2=16\]`
        },
        {
          label: 'Resolver el valor absoluto',
          html: String.raw`\[|x-18|=4\iff x-18=4\ \vee\ x-18=-4\]Entonces \(x=22\) o \(x=14\).`
        },
        {
          label: 'Interpretar la condición física',
          html: String.raw`Debe cumplirse \(x\gt 18\) para poder recortar dos cuadrados de \(9\,\text{cm}\) sobre cada lado. Se descarta \(x=14\).`
        },
        {
          label: 'Respuesta',
          html: String.raw`La hoja debe medir \(22\,\text{cm}\times22\,\text{cm}\). La caja resultante tiene base \(4\,\text{cm}\times4\,\text{cm}\) y altura \(9\,\text{cm}\).`
        }
      ]
    }
  },

  quizQuestions: [
    {
      module: 'Conjuntos',
      prompt: String.raw`¿Cuál es el conjunto numérico más pequeño que contiene a \(-7\)?`,
      options: [String.raw`\(\mathbb N\)`, String.raw`\(\mathbb Z\)`, String.raw`\(\mathbb Q\setminus\mathbb Z\)`, String.raw`\(\mathbb I\)`],
      answer: 1,
      feedback: String.raw`\(-7\) es un número entero; también es racional y real, pero \(\mathbb Z\) es el conjunto más pequeño de la lista.`
    },
    {
      module: 'Propiedades',
      prompt: String.raw`La afirmación “todo real no nulo tiene inverso multiplicativo” se escribe:`,
      options: [
        String.raw`\(\forall a\in\mathbb R\;\exists a^{-1}\)`,
        String.raw`\(\forall a\in\mathbb R,\ a\ne0\;\exists a^{-1}\in\mathbb R:\ aa^{-1}=1\)`,
        String.raw`\(\exists a\in\mathbb R:\ a\cdot0=1\)`,
        String.raw`\(\forall a\in\mathbb R:\ a+a^{-1}=0\)`
      ],
      answer: 1,
      feedback: 'La condición \(a\ne0\) es indispensable.'
    },
    {
      module: 'Ecuaciones',
      prompt: String.raw`El conjunto solución de \(x^4-10x^2+9=0\) es:`,
      options: [String.raw`\(\{-3,3\}\)`, String.raw`\(\{-1,1\}\)`, String.raw`\(\{-3,-1,1,3\}\)`, String.raw`\(\{1,9\}\)`],
      answer: 2,
      feedback: 'Con \(y=x^2\) se obtiene \(y=1\) o \(y=9\), y luego cuatro valores de \(x\).'
    },
    {
      module: 'Ecuaciones',
      prompt: String.raw`¿Cuál es la condición inicial de \(\sqrt{x}-\frac2{\sqrt{x}}=1\)?`,
      options: [String.raw`\(x\ge0\)`, String.raw`\(x\gt 0\)`, String.raw`\(x\ne0\)`, String.raw`\(x\in\mathbb R\)`],
      answer: 1,
      feedback: 'La raíz exige \(x\ge0\) y el denominador exige \(\sqrt{x}\ne0\); juntas dan \(x\gt 0\).'
    },
    {
      module: 'Intervalos',
      prompt: String.raw`La desigualdad \(-2 \lt x\le 5\) se escribe:`,
      options: [String.raw`\([-2,5]\)`, String.raw`\((-2,5]\)`, String.raw`\([-2,5)\)`, String.raw`\((-2,5)\)`],
      answer: 1,
      feedback: 'El extremo \(-2\) no se incluye y \(5\) sí.'
    },
    {
      module: 'Intervalos',
      prompt: String.raw`Si \(A=(-2,2]\) y \(B=[0,6)\), entonces \(A\cap B\) es:`,
      options: [String.raw`\((-2,6)\)`, String.raw`\([0,2]\)`, String.raw`\((-2,0)\)`, String.raw`\(\varnothing\)`],
      answer: 1,
      feedback: 'La intersección contiene los puntos que pertenecen simultáneamente a ambos intervalos.'
    },
    {
      module: 'Inecuaciones',
      prompt: String.raw`El conjunto solución de \((-2x+4)x\ge0\) es:`,
      options: [String.raw`\(( -\infty,0]\cup[2,+\infty)\)`, String.raw`\([0,2]\)`, String.raw`\((0,2)\)`, String.raw`\(\mathbb R\)`],
      answer: 1,
      feedback: 'El producto es no negativo entre sus ceros, incluyendo ambos.'
    },
    {
      module: 'Inecuaciones',
      prompt: String.raw`La solución de \(\frac{2x-5}{x+3}\le0\) es:`,
      options: [String.raw`\(( -\infty,-3)\cup[\frac52,+\infty)\)`, String.raw`\((-3,\frac52]\)`, String.raw`\([-3,\frac52]\)`, String.raw`\(( -\infty,\frac52]\)`],
      answer: 1,
      feedback: 'El denominador excluye \(-3\), y el cero del numerador \(\frac52\) se incluye.'
    },
    {
      module: 'Dominio',
      prompt: String.raw`¿Para qué valores es real \(\frac1{x^2-9}\)?`,
      options: [String.raw`\(x\ne3\)`, String.raw`\(x\ne-3\)`, String.raw`\(x\in\mathbb R\setminus\{-3,3\}\)`, String.raw`\(|x|\ge3\)`],
      answer: 2,
      feedback: 'El denominador se anula en \(x=\pm3\), y solo esos valores se excluyen.'
    },
    {
      module: 'Dominio',
      prompt: String.raw`La raíz cúbica \(\sqrt[3]{x-\frac54}\) es real para:`,
      options: [String.raw`\(x\ge\frac54\)`, String.raw`\(x\gt \frac54\)`, String.raw`\(x\le\frac54\)`, String.raw`todo \(x\in\mathbb R\)`],
      answer: 3,
      feedback: 'Las raíces de índice impar admiten cualquier radicando real.'
    },
    {
      module: 'Valor absoluto',
      prompt: String.raw`La igualdad \(|u|=d\), con \(d\gt 0\), equivale a:`,
      options: [String.raw`\(u=d\)`, String.raw`\(-d\le u\le d\)`, String.raw`\(u=d\ \vee\ u=-d\)`, String.raw`\(u \lt -d\ \vee\ u\gt d\)`],
      answer: 2,
      feedback: 'Dos números están a distancia \(d\) del cero: \(d\) y \(-d\).'
    },
    {
      module: 'Valor absoluto',
      prompt: String.raw`El conjunto solución de \(|3x-6|\le4\) es:`,
      options: [String.raw`\(( -\infty,\frac23]\cup[\frac{10}3,+\infty)\)`, String.raw`\([\frac23,\frac{10}3]\)`, String.raw`\((-4,4)\)`, String.raw`\([2,10]\)`],
      answer: 1,
      feedback: 'Se resuelve la doble desigualdad \(-4\le3x-6\le4\).'
    },
    {
      module: 'Logaritmos',
      prompt: String.raw`Por definición, \(\log_b a=x\) equivale a:`,
      options: [String.raw`\(a^x=b\)`, String.raw`\(b^x=a\)`, String.raw`\(x^b=a\)`, String.raw`\(b^a=x\)`],
      answer: 1,
      feedback: 'El logaritmo es el exponente al que se eleva la base para obtener el argumento.'
    },
    {
      module: 'Logaritmos',
      prompt: String.raw`¿Cuál es el valor de \(\log_3\frac19\)?`,
      options: [String.raw`\(-2\)`, String.raw`\(-1\)`, String.raw`\(2\)`, String.raw`\(\frac12\)`],
      answer: 0,
      feedback: String.raw`\(3^{-2}=\frac19\).`
    },
    {
      module: 'Logaritmos',
      prompt: String.raw`Para que \(\log(x+5)\) exista, debe cumplirse:`,
      options: [String.raw`\(x+5\ge0\)`, String.raw`\(x+5\gt 0\)`, String.raw`\(x+5\ne0\)`, String.raw`\(x\gt 5\)`],
      answer: 1,
      feedback: 'El argumento de un logaritmo real debe ser estrictamente positivo.'
    },
    {
      module: 'Modelización',
      prompt: String.raw`En la caja del TP, si la hoja tiene lado \(x\) y se recortan cuadrados de \(9\) cm, el volumen es:`,
      options: [String.raw`\(9x^2\)`, String.raw`\((x-9)^2\)`, String.raw`\(9(x-18)^2\)`, String.raw`\(18(x-9)^2\)`],
      answer: 2,
      feedback: 'La altura es 9 y cada lado de la base pierde 18 cm.'
    },
    {
      module: 'Pensamiento crítico',
      prompt: String.raw`Si \(a\lt b\), ¿siempre se cumple \(ac\lt bc\)?`,
      options: [String.raw`Sí, para todo real \(c\).`, String.raw`Solo si \(c\gt 0\).`, String.raw`Solo si \(c\lt 0\).`, 'Nunca.'],
      answer: 1,
      feedback: 'Si \(c\lt 0\), el sentido se invierte; si \(c=0\), ambos productos son iguales.'
    },
    {
      module: 'Pensamiento crítico',
      prompt: String.raw`Si \(a\lt b\), ¿siempre se cumple \(a^2\lt b^2\)?`,
      options: ['Sí.', String.raw`No; por ejemplo, \(-3\lt -2\) pero \(9\gt 4\).`, 'Solo cuando ambos son negativos.', String.raw`Solo si \(a=0\).`],
      answer: 1,
      feedback: 'Elevar al cuadrado no conserva el orden en todo \(\mathbb R\).'
    },
    {
      module: 'Ecuaciones',
      prompt: String.raw`La ecuación \(|-4x-16|=-2\) tiene:`,
      options: ['Una solución', 'Dos soluciones', 'Infinitas soluciones', 'Ninguna solución real'],
      answer: 3,
      feedback: 'Todo valor absoluto es mayor o igual que cero.'
    },
    {
      module: 'Ecuaciones',
      prompt: String.raw`Al elevar al cuadrado una ecuación radical, ¿qué control es imprescindible?`,
      options: ['Cambiar el signo de igualdad.', 'Verificar las soluciones en la ecuación original.', 'Eliminar las condiciones iniciales.', 'Tomar solo raíces negativas.'],
      answer: 1,
      feedback: 'Elevar al cuadrado puede introducir soluciones extrañas.'
    }
  ]
};
