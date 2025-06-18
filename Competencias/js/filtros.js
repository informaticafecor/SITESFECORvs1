/* ===================================
   SISTEMA DE FILTROS - COMPETENCIAS
   =================================== */
/*
// Variables para los filtros activos
let selectedType = '';
let selectedYear = '';
let currentMonth = '';

// Filtrar por tipo
function filterType(type) {
    // Toggle: si ya está seleccionado, lo deselecciona
    if (selectedType === type) {
        selectedType = '';
        document.getElementById('btn-' + type).classList.remove('active');
    } else {
        // Limpiar selección anterior
        if (selectedType) {
            document.getElementById('btn-' + selectedType).classList.remove('active');
        }
        selectedType = type;
        document.getElementById('btn-' + type).classList.add('active');
    }

    applyFilters();
}

// Seleccionar año
function selectYear(year) {
    // Toggle: si ya está seleccionado, lo deselecciona
    if (selectedYear === year) {
        selectedYear = '';
        currentMonth = '';
        document.getElementById('btn-' + year).classList.remove('active');
        document.getElementById('monthGroup').style.display = 'none';
        // Limpiar selección de meses
        document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]').forEach(btn => {
            btn.classList.remove('active');
        });
    } else {
        // Limpiar selección anterior
        if (selectedYear) {
            document.getElementById('btn-' + selectedYear).classList.remove('active');
        }
        selectedYear = year;
        document.getElementById('btn-' + year).classList.add('active');
        document.getElementById('monthGroup').style.display = 'block';
    }

    applyFilters();
}

// Filtrar por mes
function filterMonth(month) {
    // Toggle: si ya está seleccionado, lo deselecciona
    if (currentMonth === month) {
        currentMonth = '';
        document.getElementById('btn-' + month).classList.remove('active');
    } else {
        // Limpiar selección anterior
        if (currentMonth) {
            document.getElementById('btn-' + currentMonth).classList.remove('active');
        }
        currentMonth = month;
        document.getElementById('btn-' + month).classList.add('active');
    }

    applyFilters();
}

// Función centralizada para aplicar todos los filtros
function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    document.querySelectorAll('.competencia-card').forEach(card => {
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
}

// Limpiar todos los filtros
function clearAllFilters() {
    // Reiniciar variables
    selectedType = '';
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    document.getElementById('monthGroup').style.display = 'none';

    // Limpiar el buscador
    document.getElementById('searchInput').value = '';

    // Mostrar todas las competencias
    document.querySelectorAll('.competencia-card').forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });

    updateResultsCounter();
}*/

/* ===================================
   SISTEMA DE FILTROS - COMPETENCIAS CORREGIDO
   =================================== */

/* ===================================
   SISTEMA DE FILTROS - COMPETENCIAS CORREGIDO
   =================================== */

// Variables para los filtros activos
let selectedType = '';
let selectedYear = '';
let currentMonth = '';

// Filtrar por tipo
function filterType(type) {
    console.log(`Filtro clickeado: ${type}`); // Debug
    
    // Toggle: si ya está seleccionado, lo deselecciona
    if (selectedType === type) {
        selectedType = '';
        document.getElementById('btn-' + type).classList.remove('active');
    } else {
        // Limpiar selección anterior
        if (selectedType) {
            document.getElementById('btn-' + selectedType).classList.remove('active');
        }
        selectedType = type;
        document.getElementById('btn-' + type).classList.add('active');
    }

    console.log(`Tipo seleccionado: ${selectedType}`); // Debug
    applyFilters();
}

// Seleccionar año
function selectYear(year) {
    // Toggle: si ya está seleccionado, lo deselecciona
    if (selectedYear === year) {
        selectedYear = '';
        currentMonth = '';
        document.getElementById('btn-' + year).classList.remove('active');
        document.getElementById('monthGroup').style.display = 'none';
        // Limpiar selección de meses
        document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]').forEach(btn => {
            btn.classList.remove('active');
        });
    } else {
        // Limpiar selección anterior
        if (selectedYear) {
            document.getElementById('btn-' + selectedYear).classList.remove('active');
        }
        selectedYear = year;
        document.getElementById('btn-' + year).classList.add('active');
        document.getElementById('monthGroup').style.display = 'block';
    }

    applyFilters();
}

// Filtrar por mes
function filterMonth(month) {
    // Toggle: si ya está seleccionado, lo deselecciona
    if (currentMonth === month) {
        currentMonth = '';
        document.getElementById('btn-' + month).classList.remove('active');
    } else {
        // Limpiar selección anterior
        if (currentMonth) {
            document.getElementById('btn-' + currentMonth).classList.remove('active');
        }
        currentMonth = month;
        document.getElementById('btn-' + month).classList.add('active');
    }

    applyFilters();
}

// Función centralizada para aplicar todos los filtros - CORREGIDA
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;
    
    console.log('Aplicando filtros:', { 
        tipo: selectedType, 
        año: selectedYear, 
        mes: currentMonth, 
        busqueda: searchQuery 
    });
    
    document.querySelectorAll('.competencia-card').forEach((card, index) => {
        const titleElement = card.querySelector('h2');
        const descriptionElement = card.querySelector('p');
        
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';
        
        // Verificar cada condición por separado
        const matchesSearch = searchQuery === '' || 
                             title.includes(searchQuery) || 
                             description.includes(searchQuery);
        
        const matchesType = selectedType === '' || card.classList.contains(selectedType);
        const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
        const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);

        // Debug detallado para búsqueda
        if (searchQuery !== '' && searchQuery.length > 2) {
            console.log(`Tarjeta ${index + 1}:`, {
                titulo: title.substring(0, 40) + '...',
                busquedaEnTitulo: title.includes(searchQuery),
                busquedaEnDesc: description.includes(searchQuery),
                matchesSearch: matchesSearch,
                searchQuery: searchQuery
            });
        }

        // Mostrar u ocultar la tarjeta
        if (matchesSearch && matchesType && matchesYear && matchesMonth) {
            card.style.display = 'block';
            card.classList.add('show');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('show');
        }
    });

    console.log(`Tarjetas visibles: ${visibleCount}`);
    updateResultsCounter();
}

// Limpiar todos los filtros
function clearAllFilters() {
    console.log('Limpiando todos los filtros'); // Debug
    
    // Reiniciar variables
    selectedType = '';
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    document.getElementById('monthGroup').style.display = 'none';

    // Limpiar el buscador
    document.getElementById('searchInput').value = '';

    // Mostrar todas las competencias
    document.querySelectorAll('.competencia-card').forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });

    updateResultsCounter();
}

// Función de debug específica para filtros
function debugFilterType(type) {
    console.clear();
    console.log(`=== DEBUG FILTRO: ${type} ===`);
    
    const cards = document.querySelectorAll('.competencia-card');
    const filteredCards = document.querySelectorAll(`.competencia-card.${type}`);
    
    console.log(`Total de tarjetas: ${cards.length}`);
    console.log(`Tarjetas con clase "${type}": ${filteredCards.length}`);
    
    console.log('\nTarjetas que deberían mostrarse:');
    filteredCards.forEach((card, index) => {
        const titulo = card.querySelector('h2').textContent;
        console.log(`${index + 1}. ${titulo}`);
    });
    
    // Simular el filtro
    selectedType = type;
    applyFilters();
}

// Nueva función: Mostrar todas las competencias
function showAllCompetencias() {
    document.querySelectorAll('.competencia-card').forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });

    updateResultsCounter();
}