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

/* =========================================
   SISTEMA DE PLANTILLA DINÁMICA (COMITÉS)
========================================== */
// Base de datos con la información de los comités
const datosComites = {
    "bioetica": {
        titulo: "Comité de Bioética",
        topico: "Creación de Órganos.",
        frase: '"No todo lo que es técnicamente posible es moralmente admisible." — Leon Kass.',
        descripcion: "<p>Ciencias como la bioingeniería y la medicina regenerativa nos colocan hoy ante una realidad inminente: la posibilidad de diseñar y cultivar órganos.</p><p>Este avance, que promete erradicar listas de espera y enfermedades incurables, también nos obliga a observar los límites de la mano humana. ¿Qué límites éticos estamos dispuestos a cruzar? ¿Cómo garantizamos que este poder no genere nuevas desigualdades o desdibuje lo que significa ser humano?</p><p>En este comité se llevará un debate de trascendencia que exige líderes con una profunda conciencia moral, voces que definirán el futuro de la medicina y la humanidad. Es deber establecer un marco ético global que regule la creación y el uso de órganos bioingenieriles; además, se van a discutir opciones para evitar la mercantilización del cuerpo humano y asegurar el acceso equitativo a estas innovaciones.</p>",
        modalidad: "Mixto - Individual"
    },
    "onu-mujeres": {
        titulo: "ONU Mujeres 1985 (Histórico)",
        topico: "De la Segunda a la Tercera Revolución Industrial: Un Impacto en la Vida de la Mujer",
        frase: '"El mundo no necesita mujeres que se parezcan a los hombres, necesita mujeres que, siendo mujeres, transformen el mundo." — Edith Stein',
        descripcion: "<p>El mundo se encuentra en una encrucijada tecnológica: el destello de la informática y nuevas formas de desarrollo científico, marcan el inicio de una era que promete libertad. La mujer, que durante décadas fue el motor silencioso de las fábricas textiles y pesadas, hoy se enfrenta a un ente transformador: la automatización.</p><p>¿Es el progreso técnico un aliado para la emancipación o una herramienta para desplazar a la fuerza laboral femenina hacia la invisibilidad? ¿Se permitirá que las mujeres lideren la ciencia del futuro o quedarán relegadas a ser simples usuarias de una tecnología? ¿Cómo puede el liderazgo femenino humanizar la industria?</p><p>Este comité de ONU Mujeres busca justicia en un mundo que cambia a la velocidad de la luz. De esta forma, deberán analizar cómo el salto tecnológico impacta los derechos laborales y la educación femenina.</p>",
        modalidad: "Mixta - Individual"
    },
    "fbi": {
        titulo: "Investigación (FBI)",
        topico: "El Escape de Alcatraz de 1962",
        frase: '"El crimen perfecto no existe; solo existen investigaciones incompletas."',
        descripcion: "<p>Expediente clasificado: Operación 'La Roca'. Es diciembre de 1962. La noche del 11 de junio del mismo año, el mito de la 'prisión inexpugnable' se hundió en las gélidas aguas de San Francisco.</p><p>Mientras el resto de los reclusos dormía bajo la vigilancia de guardias armados, tres hombres lograron lo imposible. Utilizando nada más que cucharas de metal, motores de ventiladores y cabezas de maniquí hechas de jabón, burlaron los muros de concreto de Alcatraz.</p><p>Como agentes especiales del FBI, su objetivo no es solo encontrar a tres hombres; es restaurar la integridad de la justicia estadounidense. Ustedes deberán sumergirse en el análisis de la escena, ¿Cómo pudo un sistema de 'máxima seguridad' fallar ante cucharas y astucia?</p>",
        modalidad: "Mixto - Individual (Comité Especializado)"
    },
    "usa-congress": {
        titulo: "USA Congress (2017)",
        topico: "Caso Hipotético - Mandato de Hillary Clinton.",
        frase: '"The future is not a gift, it is an achievement." — Hillary Clinton.',
        descripcion: "<p>What if history had taken a different turn in 2016? We transport ourselves to an alternative 2017 under the presidency of Hillary Clinton. As United States Senators, you hold the responsibility of legislating in a divided nation, where every amendment can alter the destiny of millions.</p><p>With a Senate composed of 50% Democrats, 40% Republicans, and 10% Independents, consensus is not an option—it is a battle. The House of Representatives has already sent a bill to the floor; now it is the Senate's turn to decide whether to approve it, transform it through additions and substitutions, or block it indefinitely.</p><p>How will you respond to the demands and real-world struggles of your constituents? Will partisan loyalty prevail, or the integrity of the nation? God bless the United States, and let the session begin.</p>",
        modalidad: "Mixed Modality - Individual (Special Committee in English)"
    },
    "miss-universe": {
        titulo: "Corte Miss Universe",
        topico: "Caso de Raúl Rocha.",
        frase: '"Donde termina la ley, empieza la tiranía." — John Locke.',
        descripcion: "<p>¿Qué sucede cuando el poder detrás del certamen de belleza más importante del mundo es cuestionado? Nos trasladamos al corazón de la Miss Universe Organization durante el mandato de Raúl Rocha. Tras una serie de acusaciones que sacuden los cimientos de la organización, se convoca a una Audiencia de Arbitraje de emergencia.</p><p>El Departamento de Cumplimiento deberá presentar pruebas de mala praxis o violaciones al código de ética. Asimismo, la defensa argumentará que las acusaciones son ataques políticos para desestabilizar la empresa y resaltar los logros de su mandato.</p><p>El proceso será acompañado por Jueces de Arbitraje, que escucharán a ambas partes, interrogarán a los testigos y votarán la resolución. El documento final podrá ordenar la destitución inmediata, la reestructuración total o la inocencia del acusado.</p>",
        modalidad: "Mixta Individual (Jueces) / Mixta Agencia (Fiscalía y Defensa)"
    },
    "crisis-catolica": {
        titulo: "Iglesia Católica (Cámara A)",
        topico: "La Reforma Protestante.",
        frase: '"Poco importa que la mayoría esté contra nosotros, si tenemos con nosotros a la verdad." — Tomás Moro.',
        descripcion: "<p>Estamos en 1534, la unidad milenaria de la cristiandad occidental colapsa. No es solo una disputa de fe; es una reconfiguración tectónica del poder, la ley y la identidad nacional.</p><p><strong>Su misión en la Cámara Católica:</strong> Tras la excomunión definitiva de los rebeldes, el Papa Paulo III asume el trono de San Pedro con una misión: la Contrarreforma. Cardenales, nuncios y líderes de las órdenes religiosas deben tomar decisiones clave. El objetivo es claro: recuperar las provincias perdidas y mantener la primacía universal de la Cátedra de Pedro.</p>",
        modalidad: "Mixta Individual (Comité Especializado Tricameral)"
    },
    "crisis-luterana": {
        titulo: "Iglesia Luterana (Cámara B)",
        topico: "La Reforma Protestante.",
        frase: '"Poco importa que la mayoría esté contra nosotros, si tenemos con nosotros a la verdad." — Tomás Moro.',
        descripcion: "<p>Estamos en 1534, la unidad milenaria de la cristiandad occidental colapsa. No es solo una disputa de fe; es una reconfiguración tectónica del poder, la ley y la identidad nacional.</p><p><strong>Su misión en la Cámara Luterana:</strong> La revolución de la conciencia bajo Martín Lutero es dominante. Ha lanzado su Biblia en alemán, arrebatando el monopolio de la verdad al Vaticano. Aquí, los príncipes electores y teólogos reformadores luchan por la supervivencia del luteranismo contra la presión imperial.</p>",
        modalidad: "Mixta Individual (Comité Especializado Tricameral)"
    },
    "crisis-anglicana": {
        titulo: "Iglesia Anglicana (Cámara C)",
        topico: "La Reforma Protestante.",
        frase: '"Poco importa que la mayoría esté contra nosotros, si tenemos con nosotros a la verdad." — Tomás Moro.',
        descripcion: "<p>Estamos en 1534, la unidad milenaria de la cristiandad occidental colapsa. No es solo una disputa de fe; es una reconfiguración tectónica del poder, la ley y la identidad nacional.</p><p><strong>Su misión en la Cámara Anglicana:</strong> Bajo el mandato de Enrique VIII, Inglaterra acaba de proclamar el <em>Acta de Supremacía</em>. Aquí, la política domina a la religión. Consejeros reales y obispos anglicanos deben consolidar una iglesia nacional, decidir el destino de los 'traidores' leales a Roma y financiar la nueva corona.</p>",
        modalidad: "Mixta Individual (Comité Especializado Tricameral)"
    },
    "prensa": {
        titulo: "Cuerpo de Prensa",
        topico: "Cobertura General del Modelo.",
        frase: '"En tiempos de crisis, la primera víctima suele ser la verdad; nuestro trabajo es rescatarla." — Walter Cronkite.',
        descripcion: "<p>El ejercicio periodístico constituye el pilar fundamental de la estructura social, actuando como un faro de integridad y verdad en un entorno saturado de información. Su función trasciende la mera difusión de hechos: el periodista es un custodio de la democracia, encargado de auditar el ejercicio del poder y salvaguardar la transparencia institucional.</p><p>Más que un relator, el corresponsal es un agente de cambio que educa y contextualiza la realidad, fomentando una opinión pública sólida y objetiva.</p><p>Dentro de este comité, asumirás el reto de reportar los acontecimientos en tiempo real, utilizando las plataformas digitales para capturar la esencia y el dinamismo de cada sesión. Tu capacidad para redactar crónicas, reportajes de profundidad y entrevistas exclusivas será lo que humanice la política y las posturas de los delegados.</p>",
        modalidad: "Mixta Individual"
    }
};

// Función para inyectar los datos y mostrar la plantilla
function mostrarDetalleComite(idComite) {
    const data = datosComites[idComite];
    
    // Si no encuentra el comité (ej. los que faltan por agregar), no hace nada
    if(!data) {
        alert("Información del comité en construcción.");
        return;
    }

    // 1. Inyectamos los datos en el HTML
    document.getElementById('detalle-titulo').innerText = data.titulo;
    document.getElementById('detalle-topico').innerHTML = `<strong>Tópico:</strong> ${data.topico}`;
    document.getElementById('detalle-frase').innerText = data.frase;
    document.getElementById('detalle-descripcion').innerHTML = data.descripcion;
    document.getElementById('detalle-modalidad').innerHTML = `<strong>Modalidad:</strong> ${data.modalidad}`;

    // 2. Ocultamos todas las vistas
    document.querySelectorAll('.vista').forEach(vista => {
        vista.classList.add('oculto');
    });

    // 3. Mostramos la plantilla de detalle
    document.getElementById('detalle-comite').classList.remove('oculto');

    // 4. Subimos el scroll arriba del todo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para regresar a la cuadrícula de comités
function volverAComites() {
    document.getElementById('detalle-comite').classList.add('oculto');
    document.getElementById('comites').classList.remove('oculto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}