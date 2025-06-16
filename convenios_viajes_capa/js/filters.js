/* ===================================
   SISTEMA DE FILTROS - CAPACITACIÓN
   =================================== */

// Variables para los filtros activos
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
}