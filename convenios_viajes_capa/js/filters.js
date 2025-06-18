/* ===================================
   SISTEMA DE FILTROS - CAPACITACIÓN
   =================================== */

// Variables para los filtros activos
/*
let selectedType = '';
let selectedYear = '';
let currentMonth = '';

// Filtrar por tipo
function filterType(type) {
    selectedType = type;

    // Resaltar solo el botón seleccionado
    document.querySelectorAll('[id^="btn-capacitacion"], [id^="btn-convenios"], [id^="btn-viajes"]').forEach(btn => btn.classList.remove('active'));
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

    // Mostrar todas las tarjetas
    document.querySelectorAll('.news-card').forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });

    updateResultsCounter();
}*/

/* ===================================
   SISTEMA DE FILTROS CORREGIDO - CAPACITACIÓN
   =================================== */

// Variables para los filtros activos
let selectedType = '';
let selectedYear = '';
let currentMonth = '';

// Filtrar por tipo
function filterType(type) {
    selectedType = type;

    // Remover clase activa de todos los botones de tipo
    document.querySelectorAll('[id^="btn-capacitacion"], [id^="btn-convenios"], [id^="btn-viajes"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase activa al botón seleccionado
    const selectedBtn = document.getElementById('btn-' + type);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Aplicar filtros
    applyFilters();
}

// Seleccionar año
function selectYear(year) {
    selectedYear = year;
    currentMonth = ''; // Limpiar selección de mes

    // Remover clase activa de todos los botones de año
    document.querySelectorAll('[id^="btn-2024"], [id^="btn-2025"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase activa al año seleccionado
    const selectedBtn = document.getElementById('btn-' + year);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Mostrar sección de meses
    const monthGroup = document.getElementById('monthGroup');
    if (monthGroup) {
        monthGroup.style.display = 'flex';
    }

    // Limpiar selección de meses
    document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]').forEach(btn => {
        btn.classList.remove('active');
    });

    // Aplicar filtros
    applyFilters();
}

// Filtrar por mes
function filterMonth(month) {
    currentMonth = month;

    // Remover clase activa de todos los botones de mes
    document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase activa al mes seleccionado
    const selectedBtn = document.getElementById('btn-' + month);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Aplicar filtros
    applyFilters();
}

// Función mejorada para aplicar todos los filtros
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    console.log('Aplicando filtros:', {
        searchText,
        selectedType,
        selectedYear,
        currentMonth
    });
    
    let visibleCount = 0;
    
    document.querySelectorAll('.news-card').forEach(card => {
        // Obtener texto para búsqueda
        const title = card.querySelector('h2')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        // Verificar coincidencia de búsqueda
        const matchesSearch = searchText === '' || 
            title.includes(searchText) || 
            description.includes(searchText);
        
        // Verificar tipo (capacitacion, convenios, viajes)
        const matchesType = selectedType === '' || card.classList.contains(selectedType);
        
        // Verificar año (2024, 2025)
        const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
        
        // Verificar mes (enero, febrero, etc.)
        const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);
        
        // Mostrar/ocultar tarjeta según todos los criterios
        if (matchesSearch && matchesType && matchesYear && matchesMonth) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }
    });
    
    console.log(`Tarjetas visibles: ${visibleCount}`);
    updateResultsCounter();
}

// Limpiar todos los filtros
function clearAllFilters() {
    console.log('Limpiando todos los filtros');
    
    // Reiniciar variables
    selectedType = '';
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    const monthGroup = document.getElementById('monthGroup');
    if (monthGroup) {
        monthGroup.style.display = 'none';
    }

    // Limpiar el buscador
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    // Mostrar todas las tarjetas con animación
    document.querySelectorAll('.news-card').forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });

    updateResultsCounter();
}

// Función mejorada para actualizar contador de resultados
function updateResultsCounter() {
    const allCards = document.querySelectorAll('.news-card');
    const visibleCards = Array.from(allCards).filter(card => 
        card.style.display !== 'none' && 
        getComputedStyle(card).display !== 'none'
    );
    
    const visibleCount = visibleCards.length;
    const totalCount = allCards.length;
    
    const counter = document.getElementById('resultsCounter');
    const noResults = document.getElementById('noResults');
    
    if (visibleCount === 0) {
        if (counter) counter.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
    } else {
        if (counter) {
            counter.style.display = 'block';
            counter.textContent = `Mostrando ${visibleCount} de ${totalCount} resultados`;
        }
        if (noResults) noResults.style.display = 'none';
    }
    
    console.log(`Contador actualizado: ${visibleCount}/${totalCount}`);
}

// Función para depurar - ver qué clases tienen las tarjetas
function debugCards() {
    document.querySelectorAll('.news-card').forEach((card, index) => {
        console.log(`Tarjeta ${index + 1}:`, {
            clases: Array.from(card.classList),
            titulo: card.querySelector('h2')?.textContent?.substring(0, 50) + '...'
        });
    });
}

/* ===================================
   VISTA INICIAL COMPACTA - CAPACITACIÓN
   =================================== */

// Función para mostrar solo algunos contenedores al inicio
function showInitialView() {
    console.log('Configurando vista inicial compacta...');
    
    const cards = document.querySelectorAll('.news-card');
    
    // Ocultar todas las tarjetas primero
    cards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('show');
    });
    
    // Mostrar solo las más recientes de cada tipo (últimas 6)
    const recentCards = Array.from(cards)
        .filter(card => card.classList.contains('2025')) // Solo las de 2025
        .slice(0, 6); // Solo las primeras 6
    
    recentCards.forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });
    
    console.log(`Vista inicial: Mostrando ${recentCards.length} de ${cards.length} tarjetas`);
    
    // Actualizar contador
    updateResultsCounter();
    
    // Limpiar filtros activos visualmente
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ocultar los filtros de meses
    const monthGroup = document.getElementById('monthGroup');
    if (monthGroup) {
        monthGroup.style.display = 'none';
    }
    
    // Limpiar el buscador
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reiniciar variables de filtros
    selectedType = '';
    selectedYear = '';
    currentMonth = '';
}

// Función mejorada para aplicar filtros con vista inicial
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    console.log('Aplicando filtros:', {
        searchText,
        selectedType,
        selectedYear,
        currentMonth
    });
    
    let visibleCount = 0;
    
    document.querySelectorAll('.news-card').forEach(card => {
        // Obtener texto para búsqueda
        const title = card.querySelector('h2')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        // Verificar coincidencia de búsqueda
        const matchesSearch = searchText === '' || 
            title.includes(searchText) || 
            description.includes(searchText);
        
        // Verificar tipo (capacitacion, convenios, viajes)
        const matchesType = selectedType === '' || card.classList.contains(selectedType);
        
        // Verificar año (2024, 2025)
        const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
        
        // Verificar mes (enero, febrero, etc.)
        const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);
        
        // Mostrar/ocultar tarjeta según todos los criterios
        if (matchesSearch && matchesType && matchesYear && matchesMonth) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }
    });
    
    console.log(`Tarjetas visibles: ${visibleCount}`);
    updateResultsCounter();
}

// Función mejorada para limpiar filtros (volver a vista inicial)
function clearAllFilters() {
    console.log('Limpiando filtros y volviendo a vista inicial');
    
    // Reiniciar variables
    selectedType = '';
    selectedYear = '';
    currentMonth = '';

    // Eliminar clases activas de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ocultar los filtros de meses
    const monthGroup = document.getElementById('monthGroup');
    if (monthGroup) {
        monthGroup.style.display = 'none';
    }

    // Limpiar el buscador
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    // Volver a la vista inicial compacta
    showInitialView();
}

// Función para mostrar todas las tarjetas de un tipo específico
function showAllOfType(type) {
    console.log(`Mostrando todas las tarjetas de tipo: ${type}`);
    
    document.querySelectorAll('.news-card').forEach(card => {
        if (card.classList.contains(type)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }
    });
    
    updateResultsCounter();
}

// Función filtrar por tipo mejorada
function filterType(type) {
    selectedType = type;

    // Remover clase activa de todos los botones de tipo
    document.querySelectorAll('[id^="btn-capacitacion"], [id^="btn-convenios"], [id^="btn-viajes"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase activa al botón seleccionado
    const selectedBtn = document.getElementById('btn-' + type);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Mostrar todas las tarjetas de ese tipo
    showAllOfType(type);
}

// Función para agregar botón "Mostrar Todas" (opcional)
function showAllCards() {
    console.log('Mostrando todas las tarjetas');
    
    document.querySelectorAll('.news-card').forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    updateResultsCounter();
}

// Modificar la inicialización en main.js
function initializeApp() {
    // Inicializar el sistema de búsqueda
    initializeSearch();
    
    // Mostrar vista inicial compacta en lugar de limpiar filtros
    showInitialView();
    
    // Animar las tarjetas al cargar
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    console.log('Aplicación inicializada con vista compacta');
}