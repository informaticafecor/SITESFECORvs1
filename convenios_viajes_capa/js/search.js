/* ===================================
   SISTEMA DE BÚSQUEDA - CAPACITACIÓN
   =================================== */

   /*
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
}*/

/* ===================================
   SISTEMA DE BÚSQUEDA CORREGIDO - CAPACITACIÓN
   =================================== */

// Función para búsqueda en tiempo real
function searchNews() {
    console.log('Ejecutando búsqueda...');
    applyFilters(); // Usar la función de filtros mejorada
}

// Configurar el sistema de búsqueda con debounce mejorado
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        console.error('No se encontró el campo de búsqueda');
        return;
    }
    
    let searchTimeout;
    
    // Evento principal de búsqueda con debounce
    searchInput.addEventListener('input', function(e) {
        const searchText = e.target.value;
        console.log('Búsqueda:', searchText);
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchNews();
        }, 300); // Esperar 300ms después de que el usuario deje de escribir
    });

    // También responder a eventos de tecla para mayor compatibilidad
    searchInput.addEventListener('keyup', function(e) {
        // Si presiona Enter, buscar inmediatamente
        if (e.key === 'Enter') {
            clearTimeout(searchTimeout);
            searchNews();
        }
    });

    // Limpiar búsqueda con Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.target.value = '';
            searchNews();
        }
    });
    
    console.log('Sistema de búsqueda inicializado correctamente');
}

// Función para resaltar texto encontrado (opcional)
function highlightSearchText(text, searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Función para búsqueda avanzada (opcional)
function advancedSearch(searchTerm) {
    const terms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 1);
    
    document.querySelectorAll('.news-card').forEach(card => {
        const title = card.querySelector('h2')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const fullText = `${title} ${description}`;
        
        // Verificar si TODOS los términos están presentes
        const matchesAllTerms = terms.every(term => fullText.includes(term));
        
        if (matchesAllTerms || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}