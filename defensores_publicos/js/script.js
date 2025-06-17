// Variables globales para los filtros y slider
let selectedType = '';
let selectedYear = '';
let currentMonth = '';
let selectedStatus = '';
let currentSlide = 0;
let slideInterval;
let selectedDefensor = null;

// Datos de defensores públicos y recursos
const defensoresData = [
    {
        id: 1,
        title: "Rol de Turnos de Defensores Públicos - Enero 2025",
        type: "turnos",
        year: "2025",
        month: "enero",
        status: "vigente",
        date: "Publicado: 15/01/2025",
        description: "Rol de turnos actualizado para defensores públicos especializados en defensa penal durante el mes de enero 2025.",
        details: "Incluye horarios de atención, defensores asignados por distritos fiscales y contactos de emergencia",
        category: "Programación Mensual",
        image: "https://images.unsplash.com/photo-1589829545434-9df3e0a2e2e6?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/rol-turnos-enero-2025.pdf"
    },
    {
        id: 2,
        title: "Manual de Procedimientos para Defensa en Criminalidad Organizada",
        type: "recursos",
        year: "2025",
        month: "enero",
        status: "vigente",
        date: "Actualizado: 10/01/2025",
        description: "Manual actualizado con procedimientos específicos para la defensa técnica en casos de criminalidad organizada y delitos complejos.",
        details: "Guía completa con estrategias de defensa, marco normativo actualizado y casos de estudio",
        category: "Documentos Técnicos",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/manual-procedimientos-2025.pdf"
    },
    {
        id: 3,
        title: "Directorio de Defensores Públicos Especializados",
        type: "contactos",
        year: "2025",
        month: "febrero",
        status: "vigente",
        date: "Actualizado: 01/02/2025",
        description: "Directorio completo de defensores públicos especializados en criminalidad organizada con sus datos de contacto y especialidades.",
        details: "Incluye números telefónicos, correos electrónicos, áreas de especialización y horarios de atención",
        category: "Información de Contacto",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/directorio-defensores-2025.pdf"
    },
    {
        id: 4,
        title: "Curso de Capacitación en Litigación Oral para Defensores",
        type: "capacitacion",
        year: "2025",
        month: "marzo",
        status: "proceso",
        date: "Inicio: 15/03/2025",
        description: "Programa de capacitación especializada en técnicas de litigación oral y argumentación jurídica para defensores públicos.",
        details: "Curso intensivo de 40 horas académicas con certificación oficial y casos prácticos",
        category: "Desarrollo Profesional",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/curso-litigacion-oral.pdf"
    },
    {
        id: 5,
        title: "Rol de Turnos de Defensores Públicos - Febrero 2025",
        type: "turnos",
        year: "2025",
        month: "febrero",
        status: "vigente",
        date: "Publicado: 28/01/2025",
        description: "Programación de turnos para defensores públicos especializados correspondiente al mes de febrero 2025.",
        details: "Turnos organizados por distritos fiscales, horarios nocturnos y fines de semana incluidos",
        category: "Programación Mensual",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/rol-turnos-febrero-2025.pdf"
    },
    {
        id: 6,
        title: "Formularios y Modelos de Escritos de Defensa",
        type: "recursos",
        year: "2025",
        month: "febrero",
        status: "vigente",
        date: "Actualizado: 05/02/2025",
        description: "Colección de formularios y modelos de escritos procesales actualizados para la defensa técnica especializada.",
        details: "Incluye modelos de excepciones, recursos, alegatos y escritos específicos para criminalidad organizada",
        category: "Herramientas de Trabajo",
        image: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/formularios-defensa-2025.zip"
    },
    {
        id: 7,
        title: "Taller de Actualización Normativa en Defensa Penal",
        type: "capacitacion",
        year: "2025",
        month: "abril",
        status: "vigente",
        date: "Programado: 20/04/2025",
        description: "Taller especializado sobre las últimas modificaciones normativas en materia penal y procesal penal.",
        details: "Análisis de nueva jurisprudencia, reformas legislativas y su impacto en la defensa técnica",
        category: "Actualización Profesional",
        image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/taller-normativa-abril.pdf"
    },
    {
        id: 8,
        title: "Protocolo de Coordinación con Fiscalías Especializadas",
        type: "recursos",
        year: "2025",
        month: "marzo",
        status: "proceso",
        date: "En revisión: 12/03/2025",
        description: "Protocolo de coordinación y comunicación entre defensores públicos y fiscalías especializadas en criminalidad organizada.",
        details: "Establece canales de comunicación, procedimientos de coordinación y buenas prácticas",
        category: "Protocolos Institucionales",
        image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/protocolo-coordinacion.pdf"
    },
    {
        id: 9,
        title: "Informe de Estadísticas de Defensa Pública 2024",
        type: "recursos",
        year: "2024",
        month: "diciembre",
        status: "archivado",
        date: "Publicado: 30/12/2024",
        description: "Informe estadístico anual sobre la actividad de la defensa pública en casos de criminalidad organizada durante 2024.",
        details: "Análisis cuantitativo y cualitativo de casos atendidos, resultados procesales y indicadores de gestión",
        category: "Informes Anuales",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/estadisticas-2024.pdf"
    },
    {
        id: 10,
        title: "Guía de Recursos Tecnológicos para Defensores",
        type: "recursos",
        year: "2025",
        month: "enero",
        status: "vigente",
        date: "Publicado: 20/01/2025",
        description: "Guía práctica sobre herramientas tecnológicas disponibles para mejorar la eficiencia en la defensa técnica.",
        details: "Incluye plataformas digitales, aplicaciones móviles y recursos en línea para defensores públicos",
        category: "Herramientas Digitales",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center",
        downloadLink: "https://example.com/guia-tecnologica-2025.pdf"
    }
];

// FUNCIONES DE FILTRADO
function filterType(type) {
    selectedType = type;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.classList.contains('clear-filters')) return;
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + type).classList.add('active');
    applyFilters();
}

function selectYear(year) {
    selectedYear = year;
    currentMonth = '';
    
    document.querySelectorAll('[id^="btn-2024"], [id^="btn-2025"]').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + year).classList.add('active');
    
    document.getElementById('monthGroup').style.display = 'flex';
    document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"], [id^="btn-julio"], [id^="btn-agosto"], [id^="btn-septiembre"], [id^="btn-octubre"], [id^="btn-noviembre"], [id^="btn-diciembre"]').forEach(btn => btn.classList.remove('active'));
    
    applyFilters();
}

function filterMonth(month) {
    currentMonth = month;
    document.querySelectorAll('[id^="btn-enero"], [id^="btn-febrero"], [id^="btn-marzo"], [id^="btn-abril"], [id^="btn-mayo"], [id^="btn-junio"], [id^="btn-julio"], [id^="btn-agosto"], [id^="btn-septiembre"], [id^="btn-octubre"], [id^="btn-noviembre"], [id^="btn-diciembre"]').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + month).classList.add('active');
    applyFilters();
}

function filterStatus(status) {
    selectedStatus = status;
    document.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + status).classList.add('active');
    applyFilters();
}

function clearAllFilters() {
    selectedType = '';
    selectedYear = '';
    currentMonth = '';
    selectedStatus = '';
    
    document.querySelectorAll('.tab-btn, .date-btn, .status-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('monthGroup').style.display = 'none';
    document.getElementById('searchInput').value = '';
    
    applyFilters();
    selectedDefensor = null;
    renderDefensorDetails(null);
}

function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredData = defensoresData.filter(defensor => {
        const matchesSearch = searchInput === '' || 
            defensor.title.toLowerCase().includes(searchInput) || 
            defensor.description.toLowerCase().includes(searchInput) ||
            defensor.category.toLowerCase().includes(searchInput);
        
        const matchesType = selectedType === '' || defensor.type === selectedType;
        const matchesYear = selectedYear === '' || defensor.year === selectedYear;
        const matchesMonth = currentMonth === '' || defensor.month === currentMonth;
        const matchesStatus = selectedStatus === '' || defensor.status === selectedStatus;

        return matchesSearch && matchesType && matchesYear && matchesMonth && matchesStatus;
    });

    renderDefensoresList(filteredData);
    renderDefensoresGrid(filteredData);
    updateSlider(filteredData.filter(d => d.status === 'vigente'));
    updateResultsCounter(filteredData.length);
}

// FUNCIONES DE RENDERIZADO
function renderDefensoresList(data) {
    const container = document.getElementById('defensoresList');
    
    if (data.length === 0) {
        container.innerHTML = '<div class="no-selection"><p>No hay recursos que coincidan con los filtros</p></div>';
        return;
    }

    container.innerHTML = data.map(defensor => `
        <div class="defensor-item" data-id="${defensor.id}" onclick="selectDefensor(${defensor.id})">
            <h4>${defensor.title}</h4>
            <div class="meta">
                <span>${defensor.category}</span>
                <span class="status-badge status-${defensor.status}">${defensor.status}</span>
            </div>
        </div>
    `).join('');
}

function renderDefensoresGrid(data) {
    const container = document.getElementById('defensoresGrid');
    
    container.innerHTML = data.map(defensor => `
        <div class="defensor-card">
            <h3>${defensor.title}</h3>
            <div class="card-meta">
                <span>${defensor.category}</span>
                <span class="status-badge status-${defensor.status}">${defensor.status}</span>
            </div>
            <p>${defensor.description}</p>
            <div class="card-actions">
                <button class="card-btn" onclick="selectDefensor(${defensor.id})">Ver Detalles</button>
                <a href="${defensor.downloadLink}" class="card-btn primary" target="_blank">Descargar</a>
            </div>
        </div>
    `).join('');
}

function updateResultsCounter(count) {
    const counter = document.getElementById('resultsCounter');
    const noResults = document.getElementById('noResults');
    
    if (count === 0) {
        counter.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        counter.style.display = 'block';
        noResults.style.display = 'none';
        counter.textContent = `Mostrando ${count} de ${defensoresData.length} recursos`;
    }
}

// FUNCIONES DEL SLIDER
function updateSlider(data) {
    const sliderTrack = document.getElementById('sliderTrack');
    const indicators = document.getElementById('sliderIndicators');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    if (data.length === 0) {
        sliderTrack.innerHTML = `
            <div class="slide" style="background: linear-gradient(135deg, #0F2C52, #1a3660);">
                <div class="slide-content">
                    <h3>📚 No hay recursos vigentes</h3>
                    <p>Actualmente no hay recursos vigentes que coincidan con los filtros aplicados. Te invitamos a revisar los recursos archivados o ajustar tus filtros.</p>
                    <button class="cta-btn" onclick="clearAllFilters()">Ver Todos los Recursos</button>
                </div>
            </div>
        `;
        indicators.innerHTML = '<div class="slider-indicator active"></div>';
        totalSlidesElement.textContent = '1';
        return;
    }

    sliderTrack.innerHTML = data.map(defensor => `
        <div class="slide" style="background-image: linear-gradient(rgba(15, 44, 82, 0.7), rgba(0, 117, 191, 0.5)), url('${defensor.image}')">
            <div class="slide-content">
                <h3>${defensor.title}</h3>
                <p>${defensor.description}</p>
                <div class="slide-meta">
                    <span>📂 ${defensor.category}</span>
                    <span>📅 ${defensor.date}</span>
                </div>
                <div class="slide-actions">
                    <button class="cta-btn" onclick="selectDefensor(${defensor.id})">Ver Detalles</button>
                    <a href="${defensor.downloadLink}" class="cta-btn secondary" target="_blank">Descargar</a>
                </div>
            </div>
        </div>
    `).join('');

    indicators.innerHTML = data.map((_, index) => 
        `<div class="slider-indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>`
    ).join('');

    totalSlidesElement.textContent = data.length;
    currentSlide = 0;
    updateSlidePosition();
    startAutoSlide();
}

function updateSlidePosition() {
    const track = document.getElementById('sliderTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.slider-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    document.getElementById('currentSlide').textContent = currentSlide + 1;
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
}

function previousSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlidePosition();
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// SELECCIÓN DE RECURSOS
function selectDefensor(id) {
    selectedDefensor = defensoresData.find(d => d.id === id);
    
    document.querySelectorAll('.defensor-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id == id) {
            item.classList.add('active');
        }
    });

    renderDefensorDetails(selectedDefensor);
}

function renderDefensorDetails(defensor) {
    const container = document.getElementById('detailsContainer');
    
    if (!defensor) {
        container.innerHTML = `
            <div class="no-selection">
                <div class="no-selection-icon">🎯</div>
                <p>Selecciona un recurso para ver los detalles completos</p>
            </div>
        `;
        return;
    }

    const isActive = defensor.status === 'vigente';
    
    container.innerHTML = `
        <div class="defensor-details">
            <h4>${defensor.title}</h4>
            
            <div class="detail-item">
                <div class="detail-label">Categoría</div>
                <div class="detail-value">${defensor.category}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Tipo de Recurso</div>
                <div class="detail-value">${getTypeLabel(defensor.type)}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Fecha</div>
                <div class="detail-value">${defensor.date}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Estado</div>
                <div class="detail-value">
                    <span class="status-badge status-${defensor.status}">${getStatusLabel(defensor.status)}</span>
                </div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Descripción</div>
                <div class="detail-value">${defensor.description}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Detalles</div>
                <div class="detail-value">${defensor.details}</div>
            </div>
            
            <button class="download-btn" ${!isActive ? 'disabled' : ''} onclick="openModal(${defensor.id})">
                ${isActive ? '📥 Ver Información Completa' : '📁 Recurso Archivado'}
            </button>
        </div>
    `;
}

// FUNCIONES AUXILIARES
function getTypeLabel(type) {
    const types = {
        'turnos': 'Rol de Turnos',
        'recursos': 'Recursos y Documentos',
        'contactos': 'Directorio de Contactos',
        'capacitacion': 'Capacitación'
    };
    return types[type] || type;
}

function getStatusLabel(status) {
    const statuses = {
        'vigente': 'VIGENTE',
        'proceso': 'EN ACTUALIZACIÓN',
        'archivado': 'ARCHIVADO'
    };
    return statuses[status] || status.toUpperCase();
}

// MODAL
function openModal(id) {
    const defensor = defensoresData.find(d => d.id === id);
    if (!defensor) return;

    const modal = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    const downloadBtn = document.getElementById('modalDownloadBtn');

    title.textContent = defensor.title;
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <img src="${defensor.image}" alt="${defensor.title}" 
                 style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
            <div class="detail-item">
                <div class="detail-label">📂 Categoría</div>
                <div class="detail-value">${defensor.category}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">🏷️ Tipo de Recurso</div>
                <div class="detail-value">${getTypeLabel(defensor.type)}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">📅 Fecha</div>
                <div class="detail-value">${defensor.date}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">📊 Estado Actual</div>
                <div class="detail-value">
                    <span class="status-badge status-${defensor.status}">${getStatusLabel(defensor.status)}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-item" style="margin-bottom: 20px;">
            <div class="detail-label">📋 Descripción del Recurso</div>
            <div class="detail-value">${defensor.description}</div>
        </div>
        
        <div class="detail-item" style="margin-bottom: 20px;">
            <div class="detail-label">ℹ️ Información Detallada</div>
            <div class="detail-value">${defensor.details}</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">💡 Información Adicional</div>
            <div class="detail-value">
                Este recurso forma parte del sistema de apoyo integral para defensores públicos especializados en criminalidad organizada. 
                Su uso está destinado a mejorar la calidad de la defensa técnica y fortalecer la coordinación institucional.
            </div>
        </div>
    `;

    downloadBtn.onclick = () => window.open(defensor.downloadLink, '_blank');
    downloadBtn.textContent = defensor.status === 'vigente' ? '📥 Descargar Recurso' : 
                             defensor.status === 'proceso' ? '👁️ Ver Estado' : '📁 Ver Archivo';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// BÚSQUEDA
function searchDefensores() {
    applyFilters();
}

// RESPONSIVE
function handleResize() {
    const mainLayout = document.querySelector('.main-layout');
    const defensoresGrid = document.querySelector('.defensores-grid');
    
    if (window.innerWidth <= 900) {
        if (mainLayout) mainLayout.style.display = 'none';
        if (defensoresGrid) defensoresGrid.style.display = 'grid';
    } else {
        if (mainLayout) mainLayout.style.display = 'grid';
        if (defensoresGrid) defensoresGrid.style.display = 'none';
    }
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('sliderContainer');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') previousSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Búsqueda con debounce
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchDefensores, 300);
    });

    clearAllFilters();
});

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);