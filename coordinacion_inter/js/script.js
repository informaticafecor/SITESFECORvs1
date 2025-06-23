 /**
         * Abre un documento específico
         */
        function openDocument(documentType) {
            switch(documentType) {
                case 'convenio-cooperacion':
                    alert('📄 Descargando: Convenio de Cooperación Interinstitucional (EME)');
                    // Aquí puedes agregar la lógica para descargar el PDF real
                    // window.open('ruta/al/convenio-cooperacion.pdf', '_blank');
                    break;
                case 'cambio-designacion':
                    alert('🔄 Descargando: Cambio de Designación EME - Delitos Ambientales');
                    // window.open('ruta/al/cambio-designacion.pdf', '_blank');
                    break;
                default:
                    alert('📄 Documento no encontrado');
            }
        }

        // Inicialización simple
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Coordinaciones Interinstitucionales cargado');
        });


 /* SCRIPT DEL MNENU*/



// FUNCIONALIDAD DEL MENÚ FECCOR

// Toggle menú móvil
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Cerrar menú móvil al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
            }
        });
    });
});

// Resaltar página activa
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', setActiveLink);

// Cerrar dropdowns al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-item')) {
        document.querySelectorAll('.mega-dropdown').forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }
});

// Mejorar navegación con teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Cerrar menú móvil con Escape
        document.getElementById('navMenu').classList.remove('active');
        
        // Cerrar dropdowns con Escape
        document.querySelectorAll('.mega-dropdown').forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }
});
       