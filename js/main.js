// Función para cambiar de vista (Single Page Application)
function cambiarPestana(idVistaObjetivo) {
    // 1. Escondemos todas las secciones que tengan la clase "vista"
    const todasLasVistas = document.querySelectorAll('.vista');
    todasLasVistas.forEach(vista => {
        vista.classList.add('oculto');
    });

    // 2. Mostramos solo la sección que el usuario clickeó
    const vistaMostrar = document.getElementById(idVistaObjetivo);
    vistaMostrar.classList.remove('oculto');

    // 3. Cambiamos el color rojo del menú para indicar dónde estamos
    const todosLosLinks = document.querySelectorAll('.nav-item');
    todosLosLinks.forEach(link => {
        link.classList.remove('activo');
    });

    // Buscamos el link que fue clickeado (usando un poco de magia para buscar por la función onclick)
    const linkClickeado = document.querySelector(`.nav-item[onclick="cambiarPestana('${idVistaObjetivo}')"]`);
    if (linkClickeado) {
        linkClickeado.classList.add('activo');
    }

    // 4. Subimos el scroll arriba del todo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}