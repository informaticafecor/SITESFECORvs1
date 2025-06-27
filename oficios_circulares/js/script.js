// Variables para los filtros activos
let selectedYear = '';
let currentMonth = '';
//let showingAll = false;

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
        counter.textContent = `Mostrando ${visibleCards} de ${totalCards} oficios circulares`;
    }
}

// Seleccionar año y filtrar oficios
function selectYear(year) {
    selectedYear = year;
    currentMonth = '';

    // Resaltar solo el botón seleccionado
    document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + year).classList.add('active');

    // Mostrar sección de meses
    document.getElementById('monthGroup').style.display = 'flex';

    // Desactivar botones de mes
    document.querySelectorAll('#monthGroup .date-btn').forEach(btn => btn.classList.remove('active'));

    // Aplicar filtros
    applyFilters();
}

// Filtrar por mes
function filterMonth(month) {
    currentMonth = month;

    // Resaltar solo el botón seleccionado en la sección de meses
    document.querySelectorAll('#monthGroup .date-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + month).classList.add('active');

    // Aplicar filtros
    applyFilters();
}

// Función centralizada para aplicar todos los filtros
function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    document.querySelectorAll('.news-card').forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const code = card.querySelector('.office-code').textContent.toLowerCase();
        
        const matchesSearch = searchInput === '' || 
            title.includes(searchInput) || 
            description.includes(searchInput) || 
            code.includes(searchInput);
        
        const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
        const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);

        if (matchesSearch && matchesYear && matchesMonth) {
            card.style.display = 'block';
            card.classList.add('show');
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });

    updateResultsCounter();
}

// Búsqueda por texto
function searchOffices() {
    applyFilters();
}

// Limpiar todos los filtros
function clearAllFilters() {
    // Reiniciar variables
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    document.getElementById('monthGroup').style.display = 'none';

    // Limpiar el buscador
    document.getElementById('searchInput').value = '';

    // Mostrar solo las primeras tarjetas
    // showInitialCards();

    updateResultsCounter();
}

// Función para mostrar solo las primeras tarjetas al inicio
/*function showInitialCards() {
    const allCards = document.querySelectorAll('.news-card');
    allCards.forEach((card, index) => {
        if (index < 6) { // Mostrar solo las primeras 6
            card.style.display = 'block';
            card.classList.add('show');
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });
}*/

// Función para alternar Ver más/Ver menos

/*function toggleViewMore() {
    const allCards = document.querySelectorAll('.news-card');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    if (!showingAll) {
        // Mostrar todas las tarjetas
        allCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('show');
        });
        viewMoreBtn.textContent = 'Ver menos';
        showingAll = true;
    } else {
        // Mostrar solo las primeras 6
        showInitialCards();
        viewMoreBtn.textContent = 'Ver más';
        showingAll = false;
    }
    
    updateResultsCounter();
}*/

// Búsqueda con debounce mejorada
let searchTimeout;
function initializeSearch() {
    document.getElementById('searchInput').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchOffices, 300);
    });
}

// Inicialización al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    // Inicializar búsqueda con debounce
    initializeSearch();
    
    // Mostrar solo las primeras tarjetas al cargar
    //showInitialCards();
    
    // Animar las tarjetas al cargar
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Actualizar contador inicial
    updateResultsCounter();
});

// Soporte para navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        clearAllFilters();
    }
});
