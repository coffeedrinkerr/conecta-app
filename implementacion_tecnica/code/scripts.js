document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const pageTitle = document.title; // Guardar el título original de la página

    const loadContent = (html, title) => {
        content.innerHTML = html;
        document.title = title ? `${title} | Conecta` : pageTitle;
    };

    const homeContent = `
        <h2>Bienvenido a Conecta Servicios</h2>
        <p>​​Tu plataforma confiable y eficiente que te conecta con profesionales de diversos servicios con clientes cerca de ti, facilitándote transacciones seguras y eficientes.​ </p>
        <p>Seleccione una opción de la barra de navegación.</p>
    `;

    const inscripcionContent = `
        <h2>Inscribirse como Empresa</h2>
        <p>Aquí va el formulario de inscripción...</p>
    `;

    const calificarContent = `
        <h2>Calificar Empresa</h2>
        <form id="calificar-form">
            <div class="form-group">
                <label for="servicio">Servicio:</label>
                <select id="servicio-calificacion" name="servicio-calificacion" required></select>
            </div>
            <div class="form-group">
                <label for="empresa">Empresa:</label>
                <select id="empresa-calificacion" name="empresa-calificacion" type="text" required></select>
            </div>
            <div class="form-group">
                <label for="calificacion">Calificación:</label>
                <input type="number" id="calificacion" name="calificacion" min="1" max="5" required>
            </div>
            <div class="form-group">
                <label for="comentarios">Comentarios:</label>
                <textarea id="comentarios" name="comentarios" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Enviar Calificación</button>
            </div>
        </form>
    `;

    const solicitarServiciosContent = `
        <h2>Solicitar Servicios</h2>
        <p>Aquí va el formulario para solicitar servicios...</p>
    `;

    const verCalificacionContent = `
        <h2>Ver Calificación de Empresa</h2>
        <p>Aquí va la lista de calificaciones de empresas...</p>
    `;

    const verEstadisticasContent = `
        <h2>Ver Estadísticas de Solicitudes</h2>
        <p>Aquí van las estadísticas de solicitudes...</p>
    `;

    loadContent(homeContent, 'Inicio');

    document.getElementById('home-link').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent(homeContent, 'Inicio');
    });

    document.getElementById('inscripcion-button').addEventListener('click', () => {
        loadContent(inscripcionContent, 'Inscribirse como Empresa');
    });

    document.getElementById('calificar-button').addEventListener('click', () => {
        loadContent(calificarContent, 'Calificar Empresa');
        document.getElementById('calificar-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const calificacionData = {
                servicio: formData.get('servicio'),
                empresa: formData.get('empresa'),
                calificacion: formData.get('calificacion'),
                comentarios: formData.get('comentarios')
            };
            console.log(calificacionData);
            alert('Calificación enviada con éxito');
        });
    });

    document.getElementById('solicitar-servicios-button').addEventListener('click', () => {
        loadContent(solicitarServiciosContent, 'Solicitar Servicios');
    });

    document.getElementById('ver-calificacion-button').addEventListener('click', () => {
        loadContent(verCalificacionContent, 'Ver Calificación de Empresa');
    });

    document.getElementById('ver-estadisticas-button').addEventListener('click', () => {
        loadContent(verEstadisticasContent, 'Ver Estadísticas de Solicitudes');
    });
    
    document.getElementById('cerrar-sesion-button').addEventListener('click', () => {
        window.location.href = 'Login.html';
    });
});
