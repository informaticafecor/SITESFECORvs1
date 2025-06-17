/* ===================================
   SISTEMA DE BÚSQUEDA - COMPETENCIAS
   =================================== */

// Función para actualizar el contador de resultados
function updateResultsCounter() {
    const visibleCards = document.querySelectorAll('.competencia-card[style*="block"], .competencia-card:not([style*="none"])').length;
    const totalCards = document.querySelectorAll('.competencia-card').length;
    const counter = document.getElementById('resultsCounter');
    const noResults = document.getElementById('noResults');
    
    if (visibleCards === 0) {
        counter.style.display = 'none';
        noResults.style.display = 'block';
        document.getElementById('competenciasContainer').style.opacity = '0.3';
    } else {
        counter.style.display = 'block';
        noResults.style.display = 'none';
        document.getElementById('competenciasContainer').style.opacity = '1';
        counter.textContent = `Mostrando ${visibleCards} de ${totalCards} competencias`;
    }
}

// Búsqueda por texto
function searchCompetencias() {
    applyFilters();
}

// Mejorar la experiencia de búsqueda con debounce
let searchTimeout;

// Configurar el evento de búsqueda con debounce
function setupSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchCompetencias, 300);
    });
    
    // También manejar el evento keyup para compatibilidad
    searchInput.addEventListener('keyup', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchCompetencias, 300);
    });
}