/* ===================================
   SISTEMA DE BÚSQUEDA - CAPACITACIÓN
   =================================== */

// Función para actualizar el contador de resultados
function updateResultsCounter() {
    const visibleCards = document.querySelectorAll('.news-card[style*="block"], .news-card:not([style*="none"])').length;
    const totalCards = document.querySelectorAll('.news-card').length;
    const counter = document.getElementById('resultsCounter');
    const noResults = document.getElementById('noResults');
    
    if (visibleCards === 0) {
        counter.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        counter.style.display = 'block';
        noResults.style.display = 'none';
        counter.textContent = `Mostrando ${visibleCards} de ${totalCards} resultados`;
    }
}

// Búsqueda por texto
function searchNews() {
    applyFilters();
}

// Configurar el sistema de búsqueda con debounce
function initializeSearch() {
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    
    // Mejorar la experiencia de búsqueda con debounce
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchNews, 300);
    });

    // También mantener compatibilidad con eventos keyup
    searchInput.addEventListener('keyup', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchNews, 100);
    });
}