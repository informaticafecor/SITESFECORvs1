/* ===================================
   ARCHIVO PRINCIPAL - CAPACITACIÓN
   =================================== */

   /*
// Inicialización cuando el DOM está listo
window.addEventListener('DOMContentLoaded', function() {
    // Inicializar el sistema de búsqueda
    initializeSearch();
    
    // Limpiar todos los filtros al cargar
    clearAllFilters();
    
    // Animar las tarjetas al cargar
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Configurar el contador inicial
    updateResultsCounter();
});

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        clearAllFilters();
    }
});

// Función para optimizar el rendimiento en scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mejorar rendimiento en redimensionado de ventana
window.addEventListener('resize', debounce(() => {
    // Reajustar elementos si es necesario
    updateResultsCounter();
}, 250));

// Utilidades adicionales
const CapacitacionUtils = {
    // Función para hacer smooth scroll hacia el top
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Función para obtener estadísticas de tarjetas
    getCardStats: function() {
        const cards = document.querySelectorAll('.news-card');
        const stats = {
            total: cards.length,
            capacitacion: document.querySelectorAll('.news-card.capacitacion').length,
            convenios: document.querySelectorAll('.news-card.convenios').length,
            viajes: document.querySelectorAll('.news-card.viajes').length,
            year2024: document.querySelectorAll('.news-card.2024').length,
            year2025: document.querySelectorAll('.news-card.2025').length
        };
        return stats;
    },

    // Función para exportar datos visibles
    getVisibleData: function() {
        const visibleCards = document.querySelectorAll('.news-card[style*="block"], .news-card:not([style*="none"])');
        const data = [];
        
        visibleCards.forEach(card => {
            data.push({
                title: card.querySelector('h2').textContent,
                description: card.querySelector('p').textContent,
                link: card.querySelector('a').href,
                type: card.classList.contains('capacitacion') ? 'Capacitación' :
                      card.classList.contains('convenios') ? 'Convenios' : 'Viajes'
            });
        });
        
        return data;
    }
};

// Hacer las utilidades disponibles globalmente
window.CapacitacionUtils = CapacitacionUtils;*/


/* ===================================
   ARCHIVO PRINCIPAL MODIFICADO - CAPACITACIÓN
   =================================== */

// Inicialización cuando el DOM está listo
window.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación con vista compacta
    initializeApp();
});

// Función de inicialización principal
function initializeApp() {
    // Inicializar el sistema de búsqueda
    initializeSearch();
    
    // Mostrar vista inicial compacta
    showInitialView();
    
    // Animar las tarjetas al cargar
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    console.log('✅ Aplicación inicializada con vista compacta');
}

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        clearAllFilters(); // Esto ahora vuelve a la vista inicial
    }
});

// Función para optimizar el rendimiento en scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mejorar rendimiento en redimensionado de ventana
window.addEventListener('resize', debounce(() => {
    updateResultsCounter();
}, 250));

// Utilidades adicionales
const CapacitacionUtils = {
    // Función para hacer smooth scroll hacia el top
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Función para obtener estadísticas de tarjetas
    getCardStats: function() {
        const cards = document.querySelectorAll('.news-card');
        const stats = {
            total: cards.length,
            capacitacion: document.querySelectorAll('.news-card.capacitacion').length,
            convenios: document.querySelectorAll('.news-card.convenios').length,
            viajes: document.querySelectorAll('.news-card.viajes').length,
            year2024: document.querySelectorAll('.news-card.2024').length,
            year2025: document.querySelectorAll('.news-card.2025').length,
            visible: document.querySelectorAll('.news-card[style*="block"]').length
        };
        console.log('📊 Estadísticas de tarjetas:', stats);
        return stats;
    },

    // Función para exportar datos visibles
    getVisibleData: function() {
        const visibleCards = document.querySelectorAll('.news-card[style*="block"], .news-card:not([style*="none"])');
        const data = [];
        
        visibleCards.forEach(card => {
            data.push({
                title: card.querySelector('h2').textContent,
                description: card.querySelector('p')?.textContent || '',
                link: card.querySelector('a').href,
                type: card.classList.contains('capacitacion') ? 'Capacitación' :
                      card.classList.contains('convenios') ? 'Convenios' : 'Viajes'
            });
        });
        
        return data;
    },

    // Función para cambiar a vista inicial
    resetToInitialView: function() {
        showInitialView();
    },

    // Función para mostrar todas las tarjetas
    showAll: function() {
        showAllCards();
    }
};

// Hacer las utilidades disponibles globalmente
window.CapacitacionUtils = CapacitacionUtils;


/* SCRIPT DEL MNENU*/


// FUNCIONALIDAD DEL MENÚ FECCOR

// Toggle menú móvil
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    
    // Cerrar todos los dropdowns cuando se cierra el menú
    if (!navMenu.classList.contains('active')) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
}

// Toggle dropdown en móvil
function toggleDropdown(element, event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        event.stopPropagation();
        
        const navItem = element.closest('.nav-item');
        const isCurrentlyOpen = navItem.classList.contains('mobile-open');
        
        // Cerrar todos los dropdowns primero
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
        
        // Si no estaba abierto, abrirlo
        if (!isCurrentlyOpen) {
            navItem.classList.add('mobile-open');
        }
    }
}

// Cerrar menú móvil al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('mobile-open');
                });
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

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.main-navbar');
    if (!navbar.contains(event.target)) {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});