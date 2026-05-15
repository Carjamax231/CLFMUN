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
