// Variable para controlar si estamos en modo búsqueda
        let isSearching = false;

        // Función para mostrar la sección seleccionada
        function showSection(sectionName) {
            // Limpiar búsqueda primero
            document.getElementById('searchInput').value = '';
            isSearching = false;
            
            // Ocultar todas las secciones
            document.querySelectorAll('.peritaje-section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Remover clase active de todos los enlaces de navegación
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            const targetSection = document.getElementById('section-' + sectionName);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }
            
            // Activar el enlace correspondiente
            const targetNav = document.getElementById('nav-' + sectionName);
            if (targetNav) {
                targetNav.classList.add('active');
            }
            
            // Prevenir comportamiento por defecto del enlace
            return false;
        }

        // Función de búsqueda
        function searchContent() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Si no hay búsqueda, volver a mostrar solo la sección activa
                isSearching = false;
                document.querySelectorAll('.peritaje-section').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('search-result');
                });
                
                // Mostrar solo la sección que está activa en la navegación
                const activeNav = document.querySelector('.nav-link.active');
                if (activeNav) {
                    const sectionName = activeNav.id.replace('nav-', '');
                    const activeSection = document.getElementById('section-' + sectionName);
                    if (activeSection) {
                        activeSection.style.display = 'block';
                    }
                }
                return;
            }
            
            isSearching = true;
            let foundResults = false;
            
            // Buscar en todas las secciones
            document.querySelectorAll('.peritaje-section').forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                
                if (sectionText.includes(searchTerm)) {
                    section.style.display = 'block';
                    section.classList.add('search-result');
                    foundResults = true;
                } else {
                    section.style.display = 'none';
                    section.classList.remove('search-result');
                }
            });
            
            // Mostrar mensaje si no se encontraron resultados
            if (!foundResults) {
                console.log('No se encontraron resultados para: ' + searchTerm);
                // Podrías agregar aquí un mensaje visual de "sin resultados"
            }
        }

        // Limpiar búsqueda al hacer Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.getElementById('searchInput').value = '';
                searchContent(); // Esto limpiará la búsqueda y volverá a la navegación normal
            }
        });

        // Mejorar experiencia de búsqueda con debounce
        let searchTimeout;
        document.getElementById('searchInput').addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchContent, 300);
        });

        // Inicialización
        window.addEventListener('DOMContentLoaded', function() {
            // Asegurar que solo la primera sección esté visible
            showSection('acustica');
        });

        // Agregar event listeners a los enlaces de navegación
        document.addEventListener('DOMContentLoaded', function() {
            // Agregar eventos de clic a todos los enlaces de navegación
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevenir comportamiento por defecto
                    const sectionName = this.id.replace('nav-', '');
                    showSection(sectionName);
                });
            });
        });



        /* ============================================
        DIRECTORIO PERITOS FECCOR - FUNCIONES SIMPLES
        ============================================ */

        // URL del directorio (CAMBIA ESTA URL POR LA TUYA)
        const DIRECTORIO_URL = "https://drive.google.com/file/d/1Zgp4f2Dfe5itVzZx7ph8mpjClaoZqdjz/view";

        // Función para redirigir al directorio
        function redirectToDirectory() {
            // Cambiar la URL por la tuya
            window.open(DIRECTORIO_URL, '_blank');
            
            // Mostrar notificación opcional
            showDirectoryNotification('Abriendo Directorio Peritos FECCOR...', 'info');
        }

        // Función simple para mostrar notificaciones
        function showDirectoryNotification(message, type = 'info') {
            // Remover notificación existente
            const existing = document.querySelector('.directory-notification');
            if (existing) existing.remove();

            const notification = document.createElement('div');
            notification.className = 'directory-notification';
            
            const bgColor = type === 'success' ? '#4caf50' : 
                        type === 'warning' ? '#ff9800' : '#2196f3';
            const icon = type === 'success' ? '✅' : 
                        type === 'warning' ? '⚠️' : 'ℹ️';
            
            notification.innerHTML = `
                <span>${icon}</span>
                <span>${message}</span>
                <button onclick="this.parentElement.remove()">×</button>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${bgColor};
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                animation: slideIn 0.3s ease-out;
            `;
            
            // Estilo del botón cerrar
            const closeBtn = notification.querySelector('button');
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.2em;
                cursor: pointer;
                padding: 0 5px;
                border-radius: 3px;
                transition: background 0.2s;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(255,255,255,0.2)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'none';
            });
            
            document.body.appendChild(notification);
            
            // Auto-remover después de 3 segundos
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOut 0.3s ease-out';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 3000);
        }

        // Agregar animaciones para las notificaciones
        if (!document.querySelector('#directory-animations')) {
            const style = document.createElement('style');
            style.id = 'directory-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Funciones opcionales para los iconos (si quieres que también sean clicables)
        document.addEventListener('DOMContentLoaded', function() {
            // Hacer los iconos clicables también
            const phoneIcon = document.querySelector('.phone-icon');
            const emailIcon = document.querySelector('.email-icon');
            
            if (phoneIcon) {
                phoneIcon.addEventListener('click', function() {
                    window.open('tel:+51920044344', '_self');
                    showDirectoryNotification('Llamando a FECCOR...', 'info');
                });
            }
            
            if (emailIcon) {
                emailIcon.addEventListener('click', function() {
                    window.open('mailto:peritajes.feccor@mpfn.gob.pe', '_self');
                    showDirectoryNotification('Abriendo correo...', 'info');
                });
            }
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
