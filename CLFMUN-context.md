# 🏛️ DOCUMENTO DE CONTEXTO MAESTRO: PROYECTO CLFMUN 2026

## 1. RESUMEN DEL PROYECTO
* **Nombre:** CLFMUN (Modelo de Naciones Unidas del Colegio Las Fuentes).
* **Estado:** Fase de Desarrollo Inicial (Cimentación de Arquitectura).
* **Naturaleza:** Sitio web informativo e institucional para una delegación de MUN.
* **Objetivo:** Migrar de una web antigua (Google Pages) a una plataforma moderna, rápida y estética que sirva como hub para comités, reglamentos, inscripciones y patrocinantes.

## 2. PERFIL DEL USUARIO FINAL (PSICOLOGÍA Y UX)
* **Target:** Adolescentes de 5to año de bachillerato, zona este de Barquisimeto (Venezuela).
* **Expectativa Visual:** Estética "Aesthetic", refinada y "premium". Consumidoras de contenido en iPhone de alta gama.
* **Regla de Diseño:** Si el sitio parece una página de gobierno vieja, falla. Debe sentirse como una App moderna, fluida y visualmente costosa.

## 3. STACK TECNOLÓGICO Y ARQUITECTURA
* **Enfoque:** Vanilla SPA (Single Page Application) construida con HTML5, CSS3 y JavaScript puro.
* **Decisión Técnica:** Se rechazó WordPress para evitar el "bloat" y problemas de caché. Se eligió Vanilla JS para practicar manipulación del DOM y garantizar velocidad relámpago.
* **Sistema de Navegación:** Lógica de visualización dinámica. Todas las secciones viven en un único `index.html`. JavaScript gestiona la visibilidad de las capas (`sections`) mediante clases `.oculto` y `.activo`, eliminando recargas de página.
* **Hosting/Despliegue:** Repositorio en GitHub (`carjamax231/CLFMUN`) sincronizado con GitHub Desktop para posterior despliegue en Vercel o GitHub Pages.

## 4. SISTEMA DE DISEÑO (AESTHETIC & INSTITUTIONAL)
* **Inspiración:** Estructura de Pavimun, pero con estética de "Ivy League" / ONU.
* **Paleta de Colores:**
    * Fondo Principal: Crema (`#FAF5ED`).
    * Acento Primario: Vinotinto (`#880908`).
    * Textos: Gris muy oscuro / Negro suave (`#2c2c2c`).
* **Tipografía:**
    * Títulos (H1, H2): `Playfair Display` (Serif de alto contraste).
    * Cuerpo/UI: `Montserrat` o `Lato` (Sans-serif limpia).
* **UI Elements:**
    * Bordes redondeados (`border-radius: 30px` para botones, `12-16px` para tarjetas).
    * Sombras suaves y difuminadas (`box-shadow` tipo "Soft UI") para efecto flotante.
    * Transiciones suaves (`0.3s ease`) en todos los estados `:hover` y cambios de vista.

## 5. ESTRUCTURA DE LA INFORMACIÓN (MAPA DEL SITIO)
* **Inicio:** Hero section con lema "Agentes del Cambio", bienvenida y Ticker de patrocinantes.
* **Modelos:** Información de la I Edición (Comités, Baremos, Matrices, Guías Académicas).
* **Kids:** Sección dedicada a la formación de las delegadas más pequeñas.
* **Nosotros:** Staff organizador y visión/misión de la delegación.
* **Biblioteca:** Galería histórica y premios.
* **Inscripciones:** Enlace directo a Google Forms.

## 6. HITOS Y AVANCES ACTUALES
* ✅ Repositorio configurado y estructura de carpetas aplanada (`assets/`, `css/`, `js/`).
* ✅ Assets (Logos) normalizados: nombres en minúsculas y formato web-friendly.
* ✅ Skeleton SPA funcional: Menú de navegación con lógica JS para cambio de pestañas sin recarga.
* ✅ Estilos base aplicados: Variables CSS, fuentes de Google y estilos de botones "Aesthetic".

## 7. PRÓXIMOS PASOS (EL NORTE)
1.  **Implementación del Ticker:** Reutilizar y adaptar la lógica de "Marquesina infinita" de proyectos anteriores para los logos de patrocinantes.
2.  **Maquetación de Comités:** Crear tarjetas dinámicas para los 8 comités (Bioética, ONU Mujeres, etc.) basados en el PDF de matrices.
3.  **Sección de Documentos:** Configurar botones de descarga para reglamentos y guías académicas.
4.  **Optimización Mobile:** Asegurar que la experiencia en iPhone sea impecable (Responsive Design extremo).