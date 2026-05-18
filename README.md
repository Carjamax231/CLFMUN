# Documentación Técnica - Sesión de Desarrollo (CLFMUN)

Este documento detalla las implementaciones arquitectónicas, de diseño y de lógica de programación aplicadas en la interfaz de usuario (Front-end) del proyecto CLFMUN.

## 1. Implementación del Ticker Infinito (Marquesina de Patrocinantes)

Se desarrolló un componente de desplazamiento continuo sin interrupciones visuales mediante técnicas de CSS puro, evitando la sobrecarga del hilo principal con JavaScript.

*   **Estructura del DOM:** Se duplicó el nodo que contiene el grupo de imágenes dentro del contenedor `.ticker-track`. Esto es un requisito matemático para el bucle continuo.
*   **Animación CSS:** Se implementó la regla `@keyframes scrollTicker` que aplica un `transform: translateX(-50%)`. Al alcanzar exactamente la mitad del ancho total del contenedor (que equivale al final del primer grupo de imágenes), la animación se reinicia a `0%`. Dado que el segundo grupo es un clon exacto, el reinicio es imperceptible para el usuario.
*   **Difuminado de bordes:** Se utilizaron pseudoelementos (`::before` y `::after`) con `position: absolute` y `z-index: 2` sobre el contenedor principal. Se les aplicó un `linear-gradient` desde el color de fondo (`var(--gris-oscuro)`) hacia `transparent`, creando un efecto de máscara de desvanecimiento en los extremos.
*   **Filtros de imagen:** Para estandarizar los logos de diferentes fuentes, se implementaron propiedades de `filter` en CSS. Se definió un estado base con `grayscale(100%) opacity(0.6)` y un estado `:hover` que transiciona a `grayscale(0%) opacity(1)` combinado con `transform: scale(1.05)`.

## 2. Sistema de Cuadrícula y Componente de Tarjetas (CSS Grid)

Se construyó la vista del catálogo de comités utilizando un layout bidimensional nativo.

*   **Layout Fluido:** Se aplicó `display: grid` al contenedor `.grid-comites`. La regla fundamental utilizada fue `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`. 
    *   *Justificación técnica:* `auto-fit` instruye al navegador a crear tantas columnas como sea posible sin que ninguna baje de `300px`. El valor `1fr` asegura que el espacio sobrante se distribuya equitativamente. Esto elimina la necesidad de múltiples *Media Queries* para el layout de las tarjetas, haciendo el diseño intrínsecamente responsivo.
*   **Estructura Flexbox Interna:** Cada tarjeta (`.tarjeta-comite`) actúa internamente como un contenedor flex (`display: flex; flex-direction: column`). Se asignó `flex-grow: 1` a la descripción interna para asegurar que todas las tarjetas compartan la misma altura en una fila, independientemente de la longitud del texto.
*   **Microinteracciones:** Se implementó una transición en la propiedad `box-shadow` y `transform: translateY(-10px)` para proporcionar retroalimentación visual al estado `:hover`, simulando elevación sobre el eje Z.

## 3. Renderizado Dinámico y SPA (Single Page Application)

Para evitar la creación de múltiples archivos HTML estáticos para cada comité, se desarrolló un sistema de renderizado dinámico basado en una única plantilla (Template Pattern).

*   **Estructura de Datos:** Se creó una constante `datosComites` en JavaScript, estructurada como un objeto JSON. Cada clave (ej. `bioetica`, `onu-mujeres`) actúa como un identificador único que almacena los atributos del comité (`titulo`, `topico`, `descripcion`, `modalidad`, `mesaDirectiva`).
*   **Inyección en el DOM:** Se definió la función `mostrarDetalleComite(idComite)`. Esta función:
    1.  Recibe el identificador del comité como argumento al evento `onclick` de los botones.
    2.  Recupera el objeto correspondiente desde `datosComites`.
    3.  Accede a los nodos del DOM de la plantilla (ej. `document.getElementById('detalle-titulo')`) y actualiza su contenido usando propiedades como `innerText` (para texto plano) e `innerHTML` (para texto que contiene etiquetas HTML como `<p>` o `<strong>`).
    4.  Gestiona condicionalmente la existencia de propiedades opcionales (como `mesaDirectiva`), limpiando el nodo si la data no existe para evitar filtraciones del estado anterior.
*   **Gestión del Estado de las Vistas:** La navegación interna se basa en la manipulación de la clase utilitaria `.oculto` (`display: none !important`). La función itera sobre la colección de nodos `.vista`, aplica `.oculto` a todos, y luego lo remueve exclusivamente de la vista objetivo.

## 4. Barra de Navegación Inteligente (Scroll Event)

Se programó un comportamiento de *Smart Navbar* para optimizar el área de visualización (viewport), especialmente crítico en dispositivos móviles.

*   **Lógica de Estado en JS:** Se declaró una variable global `ubicacionPrincipal` para almacenar la posición inicial en el eje Y (`window.scrollY`).
*   **Event Listener (`scroll`):** El algoritmo compara la posición anterior (`ubicacionPrincipal`) con la posición actual tras el desplazamiento (`desplazamientoActual`).
    *   Si `ubicacionPrincipal >= desplazamientoActual` (el usuario hace scroll hacia arriba), o si el usuario está en el umbral superior (`< 50px`), se remueve la clase `.navbar-oculta`.
    *   Si el usuario hace scroll hacia abajo, se añade `.navbar-oculta`.
*   **Manejo CSS:** La clase `.navbar-oculta` aplica `transform: translateY(-100%)`. Combinado con una propiedad `transition: transform 0.3s ease` en la clase base `.navbar`, se logra un desplazamiento fuera del viewport acelerado por hardware (GPU), garantizando un rendimiento de 60fps.

## 5. Optimización Móvil (Media Queries)

Se aplicaron reglas de diseño responsivo mediante `@media (max-width: 768px)` para reestructurar la interfaz en pantallas pequeñas.

*   **Refactorización de la Navegación:** El contenedor principal `.navbar` mutó de una orientación horizontal a `flex-direction: column`. Se redujeron parámetros como `padding` y `gap` para minimizar el impacto del menú en el espacio vertical de la pantalla.
*   **Ajuste Tipográfico:** Se disminuyeron valores en unidades relativas (`rem`) en clases como `.titulo-seccion` y `.frase-celebre` para prevenir el desbordamiento horizontal y el quiebre antiestético de palabras largas.
*   **Dimensiones de Contenedores:** Se ajustó la altura fija del bloque reservado para imágenes (`.detalle-imagen-placeholder`) de `400px` a `250px`, adaptando la proporción de aspecto al formato vertical de los terminales móviles.

## 6. Configuración de Metadatos

*   **Favicon:** Se integró la etiqueta `<link rel="icon" type="image/png" href="...">` en la sección `<head>` del HTML. Este recurso vincula la identidad gráfica del proyecto a la pestaña del navegador web, estandarizando la apariencia institucional del sitio.

## 7. Rediseño del Hero (Arquitectura "Bento Box") y Temporizador Dinámico

Se reemplazó el contenedor introductorio tradicional por una estructura modular de tarjetas asimétricas conocida como "Bento Box", optimizando el espacio para múltiples llamados a la acción (CTAs) y datos clave.

*   **Maquetación Bento Box:** Se implementó un contenedor Flexbox (`.bento-container`) con una separación (`gap`) amplia en resoluciones de escritorio para permitir la visibilidad de la imagen de fondo central. Las tarjetas internas (`.bento-card`) fueron limitadas mediante `max-width` para lograr un diseño compacto y evitar el desbordamiento.
*   **Lógica del Countdown:** Se desarrolló una función asíncrona en Vanilla JS (`iniciarCountdown`) que utiliza `setInterval` para ejecutarse cada 1000 milisegundos. El algoritmo calcula la diferencia matemática entre el *Timestamp* actual y una fecha objetivo estática, transformando el remanente en días, horas, minutos y segundos antes de inyectarlo en los nodos del DOM correspondientes.
*   **Seamless UI (Interfaz sin fisuras):** Se ajustaron los márgenes y rellenos (`padding-bottom: 0`, `margin-top: 0`) entre la sección `.hero` y `.patrocinantes-wrapper`, forzando además un `min-height: 85vh` en el Hero. Esto garantiza una colisión perfecta entre el fondo fotográfico y la franja inferior oscura.

## 8. Refactorización del Ticker de Patrocinantes

Se reestructuró el componente de la marquesina para resolver inconsistencias en las proporciones visuales derivadas de las diferentes resoluciones de los logotipos de origen.

*   **Contenedores Flexibles Estrictos:** Se reemplazó la renderización directa de etiquetas `<img>` por contenedores envolventes (`.ticker-item`). A estos contenedores se les asignaron dimensiones explícitas (`width: 150px`, `height: 60px`) y propiedades de alineación de Flexbox (`align-items: center`, `justify-content: center`).
*   **Normalización de Activos:** A las imágenes internas se les aplicó la propiedad `object-fit: contain` junto con restricciones de ancho y alto máximo del 100%. Esto delega al motor de renderizado del navegador la responsabilidad de escalar el logotipo sin deformarlo, respetando siempre la caja delimitadora del contenedor padre.

## 9. Layout Editorial y Carrusel Scroll-Snap (Sección Kids)

Se diseñó una vista con enfoque en retención de lectura y manipulación táctil nativa.

*   **Arquitectura de Cuadrícula:** El texto introductorio se maquetó utilizando `display: grid` con `grid-template-columns: 1fr 1fr`. Se balanceó el peso visual de los contenedores y se aplicó `text-align: justify` con un `line-height: 1.6` para emular un estilo editorial y reducir la fatiga visual.
*   **Scroll-Snap Horizontal:** Se implementó un carrusel de imágenes utilizando `display: flex` y `overflow-x: auto`. La fricción y anclaje estilo aplicación nativa se logró mediante la propiedad `scroll-snap-type: x mandatory` en el contenedor padre y `scroll-snap-align: center` en los elementos hijos.
*   **Ocultamiento de UI Nativa:** Para salvaguardar la estética premium de la interfaz, se ocultó la barra de desplazamiento horizontal nativa de los navegadores utilizando pseudo-elementos específicos del motor WebKit (`::-webkit-scrollbar { display: none; }`) y su equivalente estandarizado (`scrollbar-width: none`).

## 10. Integración de Activos Gráficos y Efectos Premium en Comités

Se dotó de contenido multimedia a la cuadrícula de comités y a las vistas de detalle mediante la extensión del sistema de renderizado dinámico.

*   **Expansión del Modelo de Datos:** Se incorporó una nueva clave `imagen` al objeto maestro JSON (`datosComites`) con la ruta estática de la fotografía correspondiente a cada comité.
*   **Manipulación del DOM (Imágenes):** En la función `mostrarDetalleComite`, se añadió una línea de ejecución que captura el nodo `#detalle-imagen-comite` y muta dinámicamente el valor de su atributo `src` con base en el comité seleccionado.
*   **Recorte y Proporción (Object-Fit):** Para evitar distorsiones en imágenes insertadas dentro de contenedores de altura fija, se aplicó `object-fit: cover`. En las tarjetas del catálogo, se sincronizó el radio del borde superior de la imagen (`border-radius: 20px 20px 0 0`) con el contenedor padre para evitar el escape de pixeles en las esquinas.
*   **Microinteracciones Aceleradas:** Se programó un efecto de escalado interior (`transform: scale(1.05)`) y alteración lumínica (`filter: brightness(1.05)`) en estado `:hover`, proporcionando dinamismo interactivo.

## 11. Refinamientos de Experiencia de Usuario (UX)

*   **Enrutamiento Global:** Se vinculó un evento `onclick` a la clase `.logo-nav` de la barra de navegación superior, apuntando a la función centralizada de enrutamiento SPA (`cambiarPestana('inicio')`). Para indicar la interactividad del elemento, se le asignó la regla CSS `cursor: pointer`.
