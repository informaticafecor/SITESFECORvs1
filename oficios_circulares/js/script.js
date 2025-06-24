// Variables para los filtros activos
let selectedYear = '';
let currentMonth = '';
let showingAll = false;

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
    showInitialCards();

    updateResultsCounter();
}

// Función para mostrar solo las primeras tarjetas al inicio
function showInitialCards() {
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
}

// Función para alternar Ver más/Ver menos
function toggleViewMore() {
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
}

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
    showInitialCards();
    
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

// ===================================
// FUNCIONES DEL MENÚ FECCOR
// ===================================

// Toggle menú móvil
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    
    // Cerrar todos los dropdowns cuando se cierra el menú
    if (!navMenu.classList.contains('active')) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
}

// Toggle dropdown en móvil
function toggleDropdown(element, event) {
    if (window.innerWidth <= 768) {
        event.preventDefault();
        event.stopPropagation();
        
        const navItem = element.closest('.nav-item');
        const isCurrentlyOpen = navItem.classList.contains('mobile-open');
        
        // Cerrar todos los dropdowns primero
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
        
        // Si no estaba abierto, abrirlo
        if (!isCurrentlyOpen) {
            navItem.classList.add('mobile-open');
        }
    }
}

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

// Inicialización del menú
function initializeMenu() {
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.dropdown-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('mobile-open');
                });
            }
        });
    });

    // Resaltar página activa
    setActiveLink();
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.main-navbar');
    if (navbar && !navbar.contains(event.target)) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Navegación con teclado para el menú
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Inicialización completa cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el menú
    initializeMenu();
    
    // Verificar que todos los elementos existen antes de usarlos
    const searchInput = document.getElementById('searchInput');
    const navMenu = document.getElementById('navMenu');
    const monthGroup = document.getElementById('monthGroup');
    
    if (!searchInput || !navMenu || !monthGroup) {
        console.warn('Algunos elementos del DOM no se encontraron. Verifica que los IDs sean correctos.');
    }
});