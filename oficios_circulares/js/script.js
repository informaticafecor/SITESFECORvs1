// ===================================
// BASE DE DATOS SIMPLIFICADA - FÁCIL DE EDITAR
// ===================================

var oficiosDatabase = {
    "2025": {
        "mayo": [
            {
                code: "OFICIO CIRCULAR-R13706-2025-FSCN-FECCO",
                title: "OFICIO CIRCULAR-R13706-2025-FSCN-FECCO",
                description: "Se pone en conocimiento Oficiales de enlace de la UIF - PERU.",
                link: "https://drive.google.com/file/d/1KPhdxrKruGd1bVlNMoM2ry-egO4iVS5Z/view",
                hasAnnexes: true,
                annexCount: 3
            },
            {
                code: "OFICIO CIRCULAR 145-2025",
                title: "OFICIO CIRCULAR 145-2025",
                description: "Lineamientos para la obtención de información del sistema APIS-PNR, alert y otros administrados por la Dirección de Registro y Control Migratorio.",
                link: "https://drive.google.com/file/d/1RtioBOZD4uxm-LiDazK9ELJSG4Nls68S/view",
                hasAnnexes: false,
                annexCount: 0
            },
            {
                code: "OFICIO CIRCULAR 002-2025-MP-FN",
                title: "Directrices para el fortalecimiento del sistema fiscal",
                description: "Establece directrices y procedimientos administrativos actualizados en el ámbito del Ministerio Público para mejorar la eficiencia institucional.",
                link: "https://drive.google.com/file/d/1HzAw63Xii2_Pi6Odjpzt5kjpoB8rYXe-/view",
                hasAnnexes: true,
                annexCount: 2
            },
            {
                code: "OFICIO CIRCULAR N°000152-2025-MP-FN-FSCN-FECCO",
                title: "OFICIO CIRCULAR N°000152-2025-MP-FN-FSCN-FECCO",
                description: "Se pone en conocimiento la directiva denominada Atencion de denuncias y otorgamientos de medidas de proteccion al denunciante o al testigo por presuntos actos de corrupcion y/o faltas a la etica publica -2025",
                link: "https://drive.google.com/file/d/112NesUJL_rYoIhlH2MkM5FHUyayj46om/view",
                hasAnnexes: false,
                annexCount: 0
            },
            {
                code: "Resolución de la Fiscalía de la Nación N° 1528-2025-MP-FN",
                title: "Resolución de la Fiscalía de la Nación N° 1528-2025-MP-FN",
                description: "Se actualizan los procedimientos internos para mejorar la eficiencia operativa y garantizar los mejores resultados en la administración de justicia.",
                link: "https://drive.google.com/file/d/1SViq0ZP3mFT5oh59b5-AXWSBuHHrmFlX/view",
                hasAnnexes: false,
                annexCount: 0
            },
            {
                code: "Resolución de la Fiscalía de la Nación N°- DIRECTIVA",
                title: "Resolución de la Fiscalía de la Nación N°- DIRECTIVA",
                description: "Lineamientos para la optimización de procesos administrativos y modernización de los sistemas de gestión institucional del Ministerio Público.",
                link: "https://drive.google.com/file/d/1PoMPoVVFtdW4oBCVXrYgoSF7BKT54vh5/view",
                hasAnnexes: true,
                annexCount: 1
            }
        ]
    }
};

// ===================================
// VARIABLES GLOBALES
// ===================================
var selectedYear = '';
var currentMonth = '';
var currentPage = 1;
var itemsPerPage = 9;
var allOffices = [];
var filteredOffices = [];

// ===================================
// CONVERSIÓN DE ESTRUCTURA PARA COMPATIBILIDAD
// ===================================
function convertDatabaseToOldFormat() {
    allOffices = [];
    
    for (let year in oficiosDatabase) {
        for (let month in oficiosDatabase[year]) {
            oficiosDatabase[year][month].forEach(oficio => {
                // Convertir al formato original con fechas bonitas
                allOffices.push({
                    code: oficio.code,
                    title: oficio.title,
                    description: oficio.description,
                    date: formatDate(month, year),
                    year: year,
                    month: month,
                    hasAnnexes: oficio.hasAnnexes,
                    annexCount: oficio.annexCount || 0,
                    link: oficio.link
                });
            });
        }
    }
    
    // Ordenar por fecha (más recientes primero)
    allOffices.sort((a, b) => {
        if (a.year !== b.year) return b.year.localeCompare(a.year);
        return getMonthNumber(b.month) - getMonthNumber(a.month);
    });
}

function formatDate(month, year) {
    const monthNames = {
        'enero': 'Enero',
        'febrero': 'Febrero', 
        'marzo': 'Marzo',
        'abril': 'Abril',
        'mayo': 'Mayo',
        'junio': 'Junio',
        'julio': 'Julio',
        'agosto': 'Agosto',
        'septiembre': 'Septiembre',
        'octubre': 'Octubre',
        'noviembre': 'Noviembre',
        'diciembre': 'Diciembre'
    };
    
    return `${monthNames[month] || month}, ${year}`;
}

function getMonthNumber(month) {
    const months = {
        'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
        'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
        'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
    };
    return months[month] || 0;
}

// ===================================
// FUNCIONES ORIGINALES ADAPTADAS
// ===================================

function createOfficeCard(office) {
    var annexesButton = office.hasAnnexes ? 
        `<a href="${office.link}" class="btn-annexes" target="_blank" onclick="viewAnnexes('${office.code}', ${office.annexCount})">📎 Ver Anexos (${office.annexCount})</a>` :
        `<a href="${office.link}" class="btn-secondary" target="_blank" onclick="viewOnline('${office.code}')">🔗 Ver Online</a>`;

    return `<div class="news-card ${office.hasAnnexes ? 'has-annexes' : ''}">
        <img src="https://raw.githubusercontent.com/informaticafecor/SITESFECORvs1/refs/heads/main/oficios_circulares/foto/fotomp1.PNG" alt="${office.title}">
        <div class="news-content">
            <div class="office-code">${office.code}</div>
            <div class="office-date">${office.date}</div>
            <h2>${office.title}</h2>
            <p>${office.description}</p>
            <div class="office-actions">
                <a href="${office.link}" class="btn-primary" target="_blank" onclick="downloadPDF('${office.code}')">📄 Ver PDF</a>
                ${annexesButton}
            </div>
        </div>
    </div>`;
}

function filterOffices() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    filteredOffices = [];
    for (var i = 0; i < allOffices.length; i++) {
        var office = allOffices[i];
        var matchesSearch = searchInput === '' || 
            office.title.toLowerCase().indexOf(searchInput) > -1 || 
            office.description.toLowerCase().indexOf(searchInput) > -1 || 
            office.code.toLowerCase().indexOf(searchInput) > -1;
        
        var matchesYear = selectedYear === '' || office.year === selectedYear;
        var matchesMonth = currentMonth === '' || office.month === currentMonth;

        if (matchesSearch && matchesYear && matchesMonth) {
            filteredOffices.push(office);
        }
    }

    currentPage = 1;
    displayCurrentPage();
    updatePagination();
}

function displayCurrentPage() {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var pageOffices = filteredOffices.slice(startIndex, endIndex);

    var newsGrid = document.getElementById('newsGrid');
    var noResults = document.getElementById('noResults');

    if (pageOffices.length === 0 && filteredOffices.length === 0) {
        newsGrid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        var html = '';
        for (var i = 0; i < pageOffices.length; i++) {
            html += createOfficeCard(pageOffices[i]);
        }
        newsGrid.innerHTML = html;
        newsGrid.style.display = 'grid';
        noResults.style.display = 'none';
    }

    updateResultsCounter();
}

function updateResultsCounter() {
    var counter = document.getElementById('resultsCounter');
    var paginationInfo = document.getElementById('paginationInfo');
    
    if (filteredOffices.length === 0) {
        counter.textContent = 'No se encontraron oficios circulares';
        paginationInfo.textContent = '';
    } else {
        var startIndex = (currentPage - 1) * itemsPerPage + 1;
        var endIndex = Math.min(currentPage * itemsPerPage, filteredOffices.length);
        
        counter.textContent = 'Mostrando ' + startIndex + '-' + endIndex + ' de ' + filteredOffices.length + ' oficios circulares';
        paginationInfo.textContent = 'Página ' + currentPage + ' de ' + Math.ceil(filteredOffices.length / itemsPerPage);
    }
}

function updatePagination() {
    var totalPages = Math.ceil(filteredOffices.length / itemsPerPage);
    var paginationContainer = document.getElementById('paginationContainer');
    var paginationNumbers = document.getElementById('paginationNumbers');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    paginationContainer.style.display = 'flex';

    // Configurar botones anterior/siguiente
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Limpiar números de página anteriores
    paginationNumbers.innerHTML = '';
    
    var maxVisiblePages = 5;
    var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Crear botones de página
    for (var i = startPage; i <= endPage; i++) {
        var pageBtn = document.createElement('button');
        
        if (i === currentPage) {
            pageBtn.className = 'page-number active';
        } else {
            pageBtn.className = 'page-number';
        }
        
        pageBtn.textContent = i;
        pageBtn.onclick = function(page) {
            return function() { goToPage(page); };
        }(i);
        paginationNumbers.appendChild(pageBtn);
    }
}

function goToPage(page) {
    currentPage = page;
    displayCurrentPage();
    updatePagination();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changePage(direction) {
    var totalPages = Math.ceil(filteredOffices.length / itemsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        goToPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function selectYear(year) {
    selectedYear = year;
    currentMonth = '';

    var yearButtons = document.querySelectorAll('[id^="btn-2024"], [id^="btn-2025"]');
    for (var i = 0; i < yearButtons.length; i++) {
        yearButtons[i].classList.remove('active');
    }
    
    var yearBtn = document.getElementById('btn-' + year);
    if (yearBtn) {
        yearBtn.classList.add('active');
        document.getElementById('monthGroup').style.display = 'flex';
    }

    var monthButtons = document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]');
    for (var i = 0; i < monthButtons.length; i++) {
        monthButtons[i].classList.remove('active');
    }

    filterOffices();
}

function filterMonth(month) {
    currentMonth = month;

    var monthButtons = document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"]');
    for (var i = 0; i < monthButtons.length; i++) {
        monthButtons[i].classList.remove('active');
    }
    
    var monthBtn = document.getElementById('btn-' + month);
    if (monthBtn) {
        monthBtn.classList.add('active');
    }

    filterOffices();
}

function clearAllFilters() {
    selectedYear = '';
    currentMonth = '';

    var dateButtons = document.querySelectorAll('.date-btn');
    for (var i = 0; i < dateButtons.length; i++) {
        dateButtons[i].classList.remove('active');
    }

    document.getElementById('monthGroup').style.display = 'none';
    document.getElementById('searchInput').value = '';

    filterOffices();
}

function downloadPDF(officeCode) {
    console.log('Descargando PDF: ' + officeCode);
    // Ya no necesitas alert, el link funciona automáticamente
}

function viewAnnexes(officeCode, annexCount) {
    console.log('Viendo ' + annexCount + ' anexos del oficio: ' + officeCode);
    // Ya no necesitas alert, el link funciona automáticamente
}

function viewOnline(officeCode) {
    console.log('Viendo online: ' + officeCode);
    // Ya no necesitas alert, el link funciona automáticamente
}

// ===================================
// INICIALIZACIÓN
// ===================================
window.onload = function() {
    console.log('🚀 Inicializando sistema de oficios...');
    
    // Convertir la nueva estructura a la antigua para compatibilidad
    convertDatabaseToOldFormat();
    
    // Inicializar filtros
    filteredOffices = allOffices.slice();
    
    displayCurrentPage();
    updatePagination();

    // Event listener para búsqueda
    var searchInput = document.getElementById('searchInput');
    var searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterOffices, 300);
    });
    
    console.log('✅ Sistema inicializado con', allOffices.length, 'oficios');
};