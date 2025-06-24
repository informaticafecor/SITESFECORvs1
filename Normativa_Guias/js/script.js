// Variables para los filtros activos
let selectedType = '';
let selectedYear = '';
let currentMonth = '';

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
        counter.textContent = `Mostrando ${visibleCards} de ${totalCards} documentos`;
    }
}

/*
// Filtrar por tipo
function filterType(type) {
    selectedType = type;

    // Resaltar solo el botón seleccionado
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.classList.contains('clear-filters')) return; // Excluir el botón de limpiar
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + type).classList.add('active');

    // Aplicar filtros
    applyFilters();
}*/

// Filtrar por tipo
function filterType(type) {
    selectedType = type;

    // Resaltar solo el botón seleccionado
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.classList.contains('clear-filters')) return;
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + type).classList.add('active');

    // Aplicar filtros
    applyFilters();
}


// Seleccionar año
function selectYear(year) {
    selectedYear = year;
    currentMonth = '';

    // Resaltar solo el botón seleccionado
    document.querySelectorAll('[id^="btn-2024"], [id^="btn-2025"]').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + year).classList.add('active');

    // Mostrar sección de meses
    document.getElementById('monthGroup').style.display = 'flex';

    // Desactivar botones de mes
    document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]').forEach(btn => btn.classList.remove('active'));

    // Aplicar filtros
    applyFilters();
}

// Filtrar por mes
function filterMonth(month) {
    currentMonth = month;

    // Resaltar solo el botón seleccionado
    document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + month).classList.add('active');

    // Aplicar filtros
    applyFilters();
}

/*
// Función centralizada para aplicar todos los filtros
function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    document.querySelectorAll('.news-card').forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const matchesSearch = searchInput === '' || title.includes(searchInput) || description.includes(searchInput);
        const matchesType = selectedType === '' || card.classList.contains(selectedType);
        const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
        const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);

        if (matchesSearch && matchesType && matchesYear && matchesMonth) {
            card.style.display = 'block';
            card.classList.add('show');
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });

    updateResultsCounter();
}*/


// Función centralizada para aplicar todos los filtros
function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    document.querySelectorAll('.news-card').forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
        const matchesSearch = searchInput === '' || title.includes(searchInput) || description.includes(searchInput);
        
        // CORREGIR: Verificar si la tarjeta tiene la clase del tipo seleccionado
        const matchesType = selectedType === '' || card.classList.contains(selectedType);
        const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
        const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);

        if (matchesSearch && matchesType && matchesYear && matchesMonth) {
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
function searchNews() {
    applyFilters();
}


/*
// Limpiar todos los filtros
function clearAllFilters() {
    // Reiniciar variables
    selectedType = '';
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.tab-btn, .date-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    document.getElementById('monthGroup').style.display = 'none';

    // Limpiar el buscador
    document.getElementById('searchInput').value = '';

    // Mostrar todas las tarjetas
    document.querySelectorAll('.news-card').forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });

    updateResultsCounter();
}*/

// Limpiar todos los filtros
function clearAllFilters() {
    // Reiniciar variables
    selectedType = '';
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.tab-btn, .date-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    document.getElementById('monthGroup').style.display = 'none';

    // Limpiar el buscador
    document.getElementById('searchInput').value = '';

    // Mostrar solo las primeras 6 tarjetas
    showInitialCards();
}



// Mejorar la experiencia de búsqueda con debounce
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(searchNews, 300);
});

/*
// Inicialización
window.addEventListener('DOMContentLoaded', function() {
    // Limpiar todos los filtros al cargar
    clearAllFilters();
    
    // Animar las tarjetas al cargar
    document.querySelectorAll('.news-card').forEach((card, normativa_guias) => {
        card.style.animationDelay = `${normativa_guias * 0.1}s`;
    });
});*/

// Inicialización
window.addEventListener('DOMContentLoaded', function() {
    // Mostrar solo las primeras 6 tarjetas por defecto
    showInitialCards();
    
    // Animar las tarjetas al cargar
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Nueva función para mostrar solo algunas tarjetas inicialmente
function showInitialCards() {
    const allCards = document.querySelectorAll('.news-card');
    
    allCards.forEach((card, index) => {
        if (index < 6) {  // Mostrar solo las primeras 6
            card.style.display = 'block';
            card.classList.add('show');
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });
    
    updateResultsCounter();
}



// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        clearAllFilters();
    }
});

// Función para mostrar todas las tarjetas
function showAllCards() {
    // Limpiar filtros activos
    selectedType = '';
    selectedYear = '';
    currentMonth = '';
    
    // Quitar clases activas
    document.querySelectorAll('.tab-btn, .date-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar botón "Ver Todos"
    document.getElementById('btn-todos').classList.add('active');
    
    // Mostrar todas las tarjetas
    document.querySelectorAll('.news-card').forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });

    updateResultsCounter();
}

