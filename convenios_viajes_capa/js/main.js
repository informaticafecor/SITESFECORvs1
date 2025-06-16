/* ===================================
   ARCHIVO PRINCIPAL - CAPACITACIÓN
   =================================== */

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
window.CapacitacionUtils = CapacitacionUtils;