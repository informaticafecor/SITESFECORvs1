// Variables globales para los filtros y slider
let selectedType = '';
let selectedYear = '';
let currentMonth = '';
let selectedStatus = '';
let currentSlide = 0;
let slideInterval;
let selectedConvocatoria = null;

// Datos de convocatorias
const convocatoriasData = [
    {
        id: 1,
        title: "Fiscal Adjunto Provincial Especializado en Criminalidad Organizada",
        type: "fiscal",
        year: "2025",
        month: "enero",
        status: "vigente",
        deadline: "25/01/2025",
        description: "Convocatoria para cubrir plaza de Fiscal Adjunto Provincial Especializado en Criminalidad Organizada con sede en Lima Metropolitana.",
        requirements: "Título de abogado, colegiatura vigente, experiencia mínima 5 años en derecho penal, especialización en criminalidad organizada",
        modality: "Nombrado",
        image: "https://images.unsplash.com/photo-1589829545434-9df3e0a2e2e6?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-fiscal-1"
    },
    {
        id: 2,
        title: "Fiscal Provincial Titular - Lavado de Activos",
        type: "fiscal",
        year: "2025",
        month: "febrero",
        status: "vigente",
        deadline: "15/02/2025",
        description: "Convocatoria para Fiscal Provincial Titular especializado en delitos de lavado de activos y financiamiento del terrorismo.",
        requirements: "Título de abogado, experiencia mínima 8 años, maestría en derecho penal económico o afín",
        modality: "Nombrado",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-fiscal-2"
    },
    {
        id: 3,
        title: "Asistente Administrativo - Área Legal",
        type: "administrativo",
        year: "2025",
        month: "enero",
        status: "vigente",
        deadline: "30/01/2025",
        description: "Convocatoria para Asistente Administrativo en el área legal de la Fiscalía Especializada Contra la Criminalidad Organizada.",
        requirements: "Estudios técnicos o universitarios en derecho, administración o afines, conocimientos de ofimática",
        modality: "Contrato CAS",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-admin-1"
    },
    {
        id: 4,
        title: "Especialista en Tecnología e Informática Forense",
        type: "administrativo",
        year: "2025",
        month: "marzo",
        status: "proceso",
        deadline: "10/03/2025",
        description: "Convocatoria para Especialista en Tecnología e Informática Forense para el área de análisis digital y soporte técnico especializado.",
        requirements: "Título universitario en ingeniería de sistemas, informática o telecomunicaciones, certificaciones en informática forense",
        modality: "Contrato CAS",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-admin-2"
    },
    {
        id: 5,
        title: "Secretario Judicial Especializado",
        type: "administrativo",
        year: "2025",
        month: "abril",
        status: "vigente",
        deadline: "20/04/2025",
        description: "Convocatoria para Secretario Judicial especializado en procedimientos penales complejos y criminalidad organizada.",
        requirements: "Título universitario en derecho, experiencia mínima 3 años en procedimientos judiciales",
        modality: "Contrato CAS",
        image: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-admin-3"
    },
    {
        id: 6,
        title: "Fiscal Adjunto Provincial - Tráfico Ilícito de Drogas",
        type: "fiscal",
        year: "2025",
        month: "mayo",
        status: "proceso",
        deadline: "05/05/2025",
        description: "Convocatoria para Fiscal Adjunto Provincial especializado en delitos de tráfico ilícito de drogas y sustancias controladas.",
        requirements: "Título de abogado, colegiatura vigente, experiencia mínima 6 años en derecho penal",
        modality: "Nombrado",
        image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-fiscal-3"
    },
    {
        id: 7,
        title: "Analista de Inteligencia Financiera",
        type: "administrativo",
        year: "2025",
        month: "junio",
        status: "vigente",
        deadline: "15/06/2025",
        description: "Convocatoria para Analista de Inteligencia Financiera especializado en investigación de operaciones sospechosas y lavado de activos.",
        requirements: "Título universitario en economía, contabilidad o finanzas, experiencia en análisis financiero",
        modality: "Contrato CAS",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-admin-4"
    },
    {
        id: 8,
        title: "Fiscal Superior Titular - Crimen Organizado",
        type: "fiscal",
        year: "2025",
        month: "julio",
        status: "vigente",
        deadline: "31/07/2025",
        description: "Convocatoria para Fiscal Superior Titular especializado en criminalidad organizada transnacional y delitos complejos.",
        requirements: "Título de abogado, experiencia mínima 12 años como fiscal, maestría en derecho penal",
        modality: "Nombrado",
        image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-fiscal-5"
    },
    {
        id: 9,
        title: "Coordinador Administrativo",
        type: "administrativo",
        year: "2024",
        month: "noviembre",
        status: "cerrado",
        deadline: "30/11/2024",
        description: "Convocatoria para Coordinador Administrativo encargado de la gestión y coordinación de actividades administrativas.",
        requirements: "Título universitario en administración, experiencia mínima 4 años en gestión administrativa",
        modality: "Contrato CAS",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-admin-5"
    },
    {
        id: 10,
        title: "Asistente de Archivo y Gestión Documental",
        type: "administrativo",
        year: "2025",
        month: "agosto",
        status: "vigente",
        deadline: "15/08/2025",
        description: "Convocatoria para Asistente de Archivo especializado en gestión documental y preservación de expedientes judiciales.",
        requirements: "Estudios técnicos en archivística o bibliotecología, conocimientos en gestión documental",
        modality: "Contrato CAS",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=center",
        link: "https://example.com/convocatoria-admin-7"
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
    selectedConvocatoria = null;
    renderConvocatoriaDetails(null);
}

function applyFilters() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredData = convocatoriasData.filter(convocatoria => {
        const matchesSearch = searchInput === '' || 
            convocatoria.title.toLowerCase().includes(searchInput) || 
            convocatoria.description.toLowerCase().includes(searchInput);
        
        const matchesType = selectedType === '' || convocatoria.type === selectedType;
        const matchesYear = selectedYear === '' || convocatoria.year === selectedYear;
        const matchesMonth = currentMonth === '' || convocatoria.month === currentMonth;
        const matchesStatus = selectedStatus === '' || convocatoria.status === selectedStatus;

        return matchesSearch && matchesType && matchesYear && matchesMonth && matchesStatus;
    });

    renderConvocatoriasList(filteredData);
    renderConvocatoriasGrid(filteredData);
    updateSlider(filteredData.filter(c => c.status === 'vigente'));
    updateResultsCounter(filteredData.length);
}

// FUNCIONES DE RENDERIZADO
function renderConvocatoriasList(data) {
    const container = document.getElementById('convocatoriasList');
    
    if (data.length === 0) {
        container.innerHTML = '<div class="no-selection"><p>No hay convocatorias que coincidan con los filtros</p></div>';
        return;
    }

    container.innerHTML = data.map(convocatoria => `
        <div class="convocatoria-item" data-id="${convocatoria.id}" onclick="selectConvocatoria(${convocatoria.id})">
            <h4>${convocatoria.title}</h4>
            <div class="meta">
                <span>${convocatoria.modality}</span>
                <span class="status-badge status-${convocatoria.status}">${convocatoria.status}</span>
            </div>
        </div>
    `).join('');
}

function renderConvocatoriasGrid(data) {
    const container = document.getElementById('convocatoriasGrid');
    
    container.innerHTML = data.map(convocatoria => `
        <div class="convocatoria-card">
            <h3>${convocatoria.title}</h3>
            <div class="card-meta">
                <span>${convocatoria.modality}</span>
                <span class="status-badge status-${convocatoria.status}">${convocatoria.status}</span>
            </div>
            <p>${convocatoria.description}</p>
            <div class="card-actions">
                <button class="card-btn" onclick="selectConvocatoria(${convocatoria.id})">Ver Detalles</button>
                <a href="${convocatoria.link}" class="card-btn primary" target="_blank">Postular</a>
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
        counter.textContent = `Mostrando ${count} de ${convocatoriasData.length} convocatorias`;
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
                    <h3>No hay convocatorias vigentes</h3>
                    <p>Actualmente no hay convocatorias vigentes que coincidan con los filtros aplicados.</p>
                    <button class="cta-btn" onclick="clearAllFilters()">Ver Todas</button>
                </div>
            </div>
        `;
        indicators.innerHTML = '<div class="slider-indicator active"></div>';
        totalSlidesElement.textContent = '1';
        return;
    }

    sliderTrack.innerHTML = data.map(convocatoria => `
        <div class="slide" style="background-image: linear-gradient(rgba(15, 44, 82, 0.7), rgba(0, 117, 191, 0.5)), url('${convocatoria.image}')">
            <div class="slide-content">
                <h3>${convocatoria.title}</h3>
                <p>${convocatoria.description}</p>
                <div class="slide-meta">
                    <span>💰 ${convocatoria.salary}</span>
                    <span>📅 ${convocatoria.deadline}</span>
                </div>
                <div class="slide-actions">
                    <button class="cta-btn" onclick="selectConvocatoria(${convocatoria.id})">Ver Detalles</button>
                    <a href="${convocatoria.link}" class="cta-btn secondary" target="_blank">Postular</a>
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

// SELECCIÓN DE CONVOCATORIA
function selectConvocatoria(id) {
    selectedConvocatoria = convocatoriasData.find(c => c.id === id);
    
    document.querySelectorAll('.convocatoria-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id == id) {
            item.classList.add('active');
        }
    });

    renderConvocatoriaDetails(selectedConvocatoria);
}

function renderConvocatoriaDetails(convocatoria) {
    const container = document.getElementById('detailsContainer');
    
    if (!convocatoria) {
        container.innerHTML = `
            <div class="no-selection">
                <div class="no-selection-icon">🎯</div>
                <p>Selecciona una convocatoria para ver los detalles completos</p>
            </div>
        `;
        return;
    }

    const isActive = convocatoria.status === 'vigente';
    
    container.innerHTML = `
        <div class="convocatoria-details">
            <h4>${convocatoria.title}</h4>
            
            <div class="detail-item">
                <div class="detail-label">Modalidad</div>
                <div class="detail-value">${convocatoria.modality}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Remuneración</div>
                <div class="detail-value">${convocatoria.salary}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Fecha Límite</div>
                <div class="detail-value">${convocatoria.deadline}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Estado</div>
                <div class="detail-value">
                    <span class="status-badge status-${convocatoria.status}">${convocatoria.status}</span>
                </div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Descripción</div>
                <div class="detail-value">${convocatoria.description}</div>
            </div>
            
            <button class="apply-btn" ${!isActive ? 'disabled' : ''} onclick="openModal(${convocatoria.id})">
                ${isActive ? 'Ver Detalles Completos' : 'Convocatoria Cerrada'}
            </button>
        </div>
    `;
}

// MODAL
function openModal(id) {
    const convocatoria = convocatoriasData.find(c => c.id === id);
    if (!convocatoria) return;

    const modal = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    const applyBtn = document.getElementById('modalApplyBtn');

    title.textContent = convocatoria.title;
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <img src="${convocatoria.image}" alt="${convocatoria.title}" 
                 style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 15px;">
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            <div class="detail-item">
                <div class="detail-label">Modalidad</div>
                <div class="detail-value">${convocatoria.modality}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Remuneración</div>
                <div class="detail-value">${convocatoria.salary}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Fecha Límite</div>
                <div class="detail-value">${convocatoria.deadline}</div>
            </div>
            
            <div class="detail-item">
                <div class="detail-label">Estado</div>
                <div class="detail-value">
                    <span class="status-badge status-${convocatoria.status}">${convocatoria.status.toUpperCase()}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-item" style="margin: 20px 0;">
            <div class="detail-label">Descripción del Puesto</div>
            <div class="detail-value">${convocatoria.description}</div>
        </div>
        
        <div class="detail-item">
            <div class="detail-label">Requisitos</div>
            <div class="detail-value">${convocatoria.requirements}</div>
        </div>
    `;

    applyBtn.onclick = () => window.open(convocatoria.link, '_blank');
    applyBtn.textContent = convocatoria.status === 'vigente' ? 'Postular Ahora' : 'Ver Bases';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// BÚSQUEDA
function searchConvocatorias() {
    applyFilters();
}

// RESPONSIVE
function handleResize() {
    const mainLayout = document.querySelector('.main-layout');
    const convocatoriasGrid = document.querySelector('.convocatorias-grid');
    
    if (window.innerWidth <= 900) {
        if (mainLayout) mainLayout.style.display = 'none';
        if (convocatoriasGrid) convocatoriasGrid.style.display = 'grid';
    } else {
        if (mainLayout) mainLayout.style.display = 'grid';
        if (convocatoriasGrid) convocatoriasGrid.style.display = 'none';
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
        searchTimeout = setTimeout(searchConvocatorias, 300);
    });

    clearAllFilters();
});

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);


/* SCRIPT DEL MNENU*/



// FUNCIONALIDAD DEL MENÚ FECCOR

// Toggle menú móvil
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Cerrar menú móvil al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
            }
        });
    });
});

// Resaltar página activa
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', setActiveLink);

// Cerrar dropdowns al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-item')) {
        document.querySelectorAll('.mega-dropdown').forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }
});

// Mejorar navegación con teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Cerrar menú móvil con Escape
        document.getElementById('navMenu').classList.remove('active');
        
        // Cerrar dropdowns con Escape
        document.querySelectorAll('.mega-dropdown').forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }
});
