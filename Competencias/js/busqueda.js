/* ===================================
   SISTEMA DE BÚSQUEDA - COMPETENCIAS
   =================================== */
/*
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
}*/

/* ===================================
   SISTEMA DE BÚSQUEDA - COMPETENCIAS CORREGIDO
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

// Búsqueda por texto - CORREGIDA
function searchCompetencias() {
    console.log('Ejecutando búsqueda...'); // Debug
    applyFilters(); // Usar la función centralizada de filtros
}

// Variable para el timeout de búsqueda
let searchTimeout;

// Configurar el evento de búsqueda con debounce - CORREGIDO
function setupSearchListeners() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        console.error('❌ No se encontró el elemento searchInput');
        return;
    }
    
    console.log('✅ Configurando listeners de búsqueda');
    
    // Evento input (mientras escribe)
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;
        console.log(`Búsqueda input: "${query}"`); // Debug
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchCompetencias();
        }, 150); // Reducido el tiempo para respuesta más rápida
    });
    
    // Evento keyup para compatibilidad
    searchInput.addEventListener('keyup', function(e) {
        const query = e.target.value;
        console.log(`Búsqueda keyup: "${query}"`); // Debug
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchCompetencias();
        }, 150);
    });
    
    // Evento change como respaldo
    searchInput.addEventListener('change', function(e) {
        console.log(`Búsqueda change: "${e.target.value}"`);
        clearTimeout(searchTimeout);
        searchCompetencias();
    });
}

// Función para testear la búsqueda
function testBusqueda(termino) {
    console.log(`\n=== TEST BÚSQUEDA: "${termino}" ===`);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.value = termino;
    
    // Simular el evento
    const event = new Event('input', { bubbles: true });
    searchInput.dispatchEvent(event);
    
    setTimeout(() => {
        const visibles = document.querySelectorAll('.competencia-card[style*="block"], .competencia-card:not([style*="none"])');
        console.log(`Resultados para "${termino}": ${visibles.length} tarjetas`);
        
        visibles.forEach((card, index) => {
            const titulo = card.querySelector('h2').textContent.trim();
            console.log(`  ${index + 1}. ${titulo.substring(0, 50)}...`);
        });
    }, 200);
}

// Función para debug de búsqueda
function debugBusqueda() {
    console.clear();
    console.log('=== DEBUG SISTEMA DE BÚSQUEDA ===');
    
    const searchInput = document.getElementById('searchInput');
    console.log('Input de búsqueda:', searchInput);
    console.log('Valor actual:', searchInput ? searchInput.value : 'NO ENCONTRADO');
    
    // Probar algunos términos comunes
    const terminos = ['ley', 'resolucion', 'fiscalia', 'competencia', 'crimen'];
    
    console.log('\nProbando términos de búsqueda:');
    terminos.forEach(termino => {
        const cards = document.querySelectorAll('.competencia-card');
        let coincidencias = 0;
        
        cards.forEach(card => {
            const titulo = card.querySelector('h2').textContent.toLowerCase();
            const descripcion = card.querySelector('p');
            const desc = descripcion ? descripcion.textContent.toLowerCase() : '';
            
            if (titulo.includes(termino.toLowerCase()) || desc.includes(termino.toLowerCase())) {
                coincidencias++;
            }
        });
        
        console.log(`"${termino}": ${coincidencias} coincidencias potenciales`);
    });
}