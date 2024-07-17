document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const pageTitle = document.title; // Guardar el título original de la página

    window.loadContent = (html, title) => { // Asegúrate de que loadContent está definido en el ámbito global
        content.innerHTML = html;
        document.title = title ? `${title} | Conecta` : pageTitle;
    };

    const homeContent = `
        <h2>Bienvenido a Conecta Servicios</h2>
        <p>​​Tu plataforma confiable y eficiente que te conecta con profesionales de diversos servicios con clientes cerca de ti, facilitándote transacciones seguras y eficientes.​ </p>
        <p>Seleccione una opción de la barra de navegación.</p>
    `;

    window.inscripcionContent = `
        <h2>Inscribirse como Empresa</h2>
        <p>Aquí va el formulario de inscripción...</p>
    `;

    window.calificarContent = `
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

    window.solicitarServiciosContent = `
        <h2>Solicitar Servicios</h2>
        <div class="container_rav">
            <h3>Portal de selecciones para su necesidad…</h3>
            <div class="search-container_rav">
                <h2>Búsqueda de Servicios</h2>
                <select id="category">
                    <option value="">Seleccionar Categoría</option>
                    <option value="Plomería">Plomería</option>
                    <option value="Electricidad">Electricidad</option>
                    <option value="Carpintería">Carpintería</option>
                    <option value="Albañileria">Albañileria</option>
                </select>
                <button onclick="searchServices()">Buscar</button>
            </div>
            <div class="filter-container_rav">
                <h2>Filtrado por Calificaciones</h2>
                <select id="rating">
                    <option value="">Seleccionar Calificación</option>
                    <option value="5">5 Estrellas</option>
                    <option value="4">4 Estrellas</option>
                    <option value="3">3 Estrellas</option>
                    <option value="2">2 Estrellas</option>
                    <option value="1">1 Estrella</option>
                </select>
                <button onclick="filterByRating()">Filtrar</button>
            </div>
            <div class="profile-container_rav">
                <h2>Perfiles de Profesionales</h2>
                <div id="profiles"></div>
            </div>
            <div class="detail-container_rav">
                <h2>Detalle del Profesional</h2>
                <div id="professionalDetail" class="profile"></div>
            </div>
            <div class="reservation-container_rav">
                <h2>Reserva de Servicios</h2>
                <div id="reservationForm">
                    <input type="date" id="serviceDate" placeholder="Seleccionar Fecha">
                    <input type="time" id="serviceTime" placeholder="Seleccionar Hora">
                    <button onclick="reserveService()">Reservar</button>
                </div>
                <div id="confirmation">
                    <p id="confirmationMessage"></p>
                    <button onclick="showPayment()">Continuar con el Pago</button>
                </div>
                <div id="payment-section">
                    <h3>Pago</h3>
                    <input type="text" placeholder="Nombre en la Tarjeta">
                    <input type="text" placeholder="Número de la Tarjeta">
                    <button onclick="confirmPayment()">Confirmar Pago</button>
                </div>
                <div id="modify-cancel">
                    <button onclick="modifyReservation()">Modificar Reserva</button>
                    <button onclick="cancelReservation()">Cancelar Reserva</button>
                </div>
            </div>
        </div>
    `;

    window.verCalificacionContent = `
        <h2>Ver Calificación de Empresa</h2>
        <p>Aquí va la lista de calificaciones de empresas...</p>
    `;

    window.verEstadisticasContent = `
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
        window.location.href = '/auth/logout';
    });

    const professionals = [
        { id: 1, name: 'Plomeria Pérez', category: 'Plomería', rating: 5, services: 'Reparaciones de tuberías, Instalaciones de sanitarios', details: 'Juan tiene más de 10 años de experiencia en plomería. Ha trabajado en múltiples proyectos residenciales y comerciales.' },
        { id: 2, name: 'Elecronica García', category: 'Electricidad', rating: 4, services: 'Instalaciones eléctricas, Reparaciones de cortocircuitos', details: 'María es una electricista certificada con 8 años de experiencia. Es conocida por su atención al detalle y seguridad en el trabajo.' },
        { id: 3, name: 'Carpinteria López', category: 'Carpintería', rating: 5, services: 'Fabricación de muebles, Reparaciones de puertas', details: 'Carlos es un maestro carpintero con más de 15 años de experiencia. Sus trabajos son altamente valorados por su precisión y calidad.' },
        { id: 4, name: 'Albañileria Manuel', category: 'Albañileria', rating: 4, services: 'Pisos paredes losas cercas de concreto para todo publico', details: 'Julian es un maestro de obras de construccion con más de 17 años de experiencia. Sus trabajos son altamente valorados y garantizados por su precisión y calidad.' },
    ];

    window.searchServices = function searchServices() {
        const category = document.getElementById('category').value;
        const profilesDiv = document.getElementById('profiles');
        profilesDiv.innerHTML = '';
        const filteredProfessionals = professionals.filter(professional => professional.category === category);
        filteredProfessionals.forEach(professional => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <p><strong>Empresa:</strong> ${professional.name}</p>
                <p><strong>Calificación:</strong> ${professional.rating} Estrellas</p>
                <p><strong>Servicios:</strong> ${professional.services}</p>
                <button onclick="viewProfile(${professional.id})">Ver Perfil</button>
            `;
            profilesDiv.appendChild(div);
        });
    }

    window.filterByRating = function filterByRating() {
        const rating = document.getElementById('rating').value;
        const profilesDiv = document.getElementById('profiles');
        profilesDiv.innerHTML = '';
        const filteredProfessionals = professionals.filter(professional => professional.rating == rating);
        filteredProfessionals.forEach(professional => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <p><strong>Empresa:</strong> ${professional.name}</p>
                <p><strong>Calificación:</strong> ${professional.rating} Estrellas</p>
                <p><strong>Servicios:</strong> ${professional.services}</p>
                <button onclick="viewProfile(${professional.id})">Ver Perfil</button>
            `;
            profilesDiv.appendChild(div);
        });
    }

    window.viewProfile = function viewProfile(id) {
        const professional = professionals.find(pro => pro.id === id);
        const profileDiv = document.getElementById('professionalDetail');
        profileDiv.innerHTML = `
            <p><strong>Empresa:</strong> ${professional.name}</p>
            <p><strong>Categoría:</strong> ${professional.category}</p>
            <p><strong>Calificación:</strong> ${professional.rating} Estrellas</p>
            <p><strong>Servicios:</strong> ${professional.services}</p>
            <p><strong>Detalles:</strong> ${professional.details}</p>
        `;
        profileDiv.style.display = 'block';
    }

    window.reserveService = function reserveService() {
        const date = document.getElementById('serviceDate').value;
        const time = document.getElementById('serviceTime').value;
        if (date && time) {
            const confirmationMessage = `
                Reserva confirmada:<br>
                <strong>Fecha:</strong> ${date}<br>
                <strong>Hora:</strong> ${time}
            `;
            document.getElementById('confirmationMessage').innerHTML = confirmationMessage;
            document.getElementById('confirmation').style.display = 'block';
            document.getElementById('reservationForm').style.display = 'none';
            document.getElementById('modify-cancel').style.display = 'block';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    window.showPayment = function showPayment() {
        document.getElementById('payment-section').style.display = 'block';
    }

    window.confirmPayment = function confirmPayment() {
        alert('Pago confirmado. Gracias por su reserva.');
    }

    window.modifyReservation = function modifyReservation() {
        document.getElementById('confirmation').style.display = 'none';
        document.getElementById('reservationForm').style.display = 'block';
        document.getElementById('modify-cancel').style.display = 'none';
    }

    window.cancelReservation = function cancelReservation() {
        if (confirm('¿Estás seguro de que quieres cancelar la reserva?')) {
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('reservationForm').style.display = 'block';
            document.getElementById('modify-cancel').style.display = 'none';
            alert('Reserva cancelada.');
        }
    }
});
