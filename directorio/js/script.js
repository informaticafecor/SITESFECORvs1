// ============================================
// SCRIPTS PARA DIRECTORIOS DE CONTACTO FECCOR
// ============================================

// Variables globales
let allLinks = [];
let currentFilter = '';

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Directorios de Contacto FECCOR inicializados');
    
    // Inicializar sistema
    initializeDirectories();
    
    // Aplicar animaciones de entrada
    applyEntryAnimations();
    
    // Crear efectos visuales
    setInterval(createFloatingParticle, 4000);
    
    // Configurar búsqueda en tiempo real
    setupRealTimeSearch();
});

// ============================================
// INICIALIZACIÓN DEL SISTEMA
// ============================================

/**
 * Inicializar el sistema de directorios
 */
function initializeDirectories() {
    // Recopilar todos los enlaces
    allLinks = Array.from(document.querySelectorAll('.directory-link'));
    
    // Configurar event listeners para enlaces
    setupLinkListeners();
    
    // Configurar efectos interactivos
    setupInteractiveEffects();
    
    console.log(`📋 ${allLinks.length} contactos cargados en el directorio`);
}

/**
 * Configurar listeners para los enlaces
 */
function setupLinkListeners() {
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleContactClick(this);
        });
        
        // Efectos hover mejorados
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Configurar efectos interactivos
 */
function setupInteractiveEffects() {
    const sectionCards = document.querySelectorAll('.section-card');
    
    sectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// SISTEMA DE BÚSQUEDA
// ============================================

/**
 * Configurar búsqueda en tiempo real
 */
function setupRealTimeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value;
            performSearch(query);
        }, 300));
        
        // Búsqueda al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

/**
 * Función principal de búsqueda
 */
function searchContacts() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value;
    performSearch(query);
}

/**
 * Realizar búsqueda en los contactos
 */
function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        // Mostrar todos los enlaces
        showAllLinks();
        return;
    }
    
    let foundResults = 0;
    
    allLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        const category = link.dataset.category || '';
        
        if (linkText.includes(searchTerm) || category.includes(searchTerm)) {
            link.classList.remove('hidden');
            link.classList.add('highlighted');
            foundResults++;
        } else {
            link.classList.add('hidden');
            link.classList.remove('highlighted');
        }
    });
    
    // Mostrar/ocultar secciones vacías
    toggleEmptySections();
    
    // Mostrar resultado de búsqueda
    showSearchResult(foundResults, searchTerm);
    
    console.log(`🔍 Búsqueda: "${searchTerm}" - ${foundResults} resultados encontrados`);
}

/**
 * Mostrar todos los enlaces
 */
function showAllLinks() {
    allLinks.forEach(link => {
        link.classList.remove('hidden', 'highlighted');
    });
    
    // Mostrar todas las secciones
    const sections = document.querySelectorAll('.directory-section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Ocultar mensaje de resultados
    hideSearchResult();
}

/**
 * Mostrar/ocultar secciones vacías durante búsqueda
 */
function toggleEmptySections() {
    const sections = document.querySelectorAll('.directory-section');
    
    sections.forEach(section => {
        const visibleLinks = section.querySelectorAll('.directory-link:not(.hidden)');
        
        if (visibleLinks.length === 0) {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
}

/**
 * Mostrar resultado de búsqueda
 */
function showSearchResult(count, term) {
    let resultElement = document.getElementById('search-result');
    
    if (!resultElement) {
        resultElement = document.createElement('div');
        resultElement.id = 'search-result';
        resultElement.className = 'search-result';
        
        const searchSection = document.querySelector('.search-section');
        searchSection.appendChild(resultElement);
    }
    
    if (count === 0) {
        resultElement.innerHTML = `
            <div class="no-results">
                <span class="result-icon">🔍</span>
                <h3>No se encontraron resultados</h3>
                <p>No hay contactos que coincidan con "${term}"</p>
                <button onclick="clearSearch()" class="clear-btn">Limpiar búsqueda</button>
            </div>
        `;
    } else {
        resultElement.innerHTML = `
            <div class="results-found">
                <span class="result-icon">✅</span>
                <p>Se encontraron <strong>${count}</strong> contacto(s) para "${term}"</p>
                <button onclick="clearSearch()" class="clear-btn">Ver todos</button>
            </div>
        `;
    }
    
    resultElement.style.display = 'block';
}

/**
 * Ocultar resultado de búsqueda
 */
function hideSearchResult() {
    const resultElement = document.getElementById('search-result');
    if (resultElement) {
        resultElement.style.display = 'none';
    }
}

/**
 * Limpiar búsqueda
 */
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    showAllLinks();
    showNotification('Búsqueda limpiada', 'info');
}

// ============================================
// MANEJO DE CLICS EN CONTACTOS
// ============================================

/**
 * Manejar clic en contacto
 */
function handleContactClick(linkElement) {
    const contactName = linkElement.textContent.trim();
    const category = linkElement.dataset.category;
    
    // Efecto visual
    pulseEffect(linkElement);
    
    // Simular acción (aquí puedes agregar la lógica real)
    console.log(`📞 Contacto seleccionado: ${contactName} (${category})`);
    
    // Mostrar notificación
    showNotification(`Abriendo contacto: ${contactName}`, 'info');
    
    // Aquí puedes agregar la lógica para:
    // - Abrir un PDF con la información del contacto
    // - Redirigir a una página específica
    // - Mostrar un modal con detalles
    
    // Ejemplo: window.open('ruta_al_pdf_del_contacto.pdf', '_blank');
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

/**
 * Mostrar notificación
 */
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-text">${message}</span>
        <button class="notification-close" onclick="closeNotification(this)">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(145deg, rgba(15, 44, 82, 0.95), rgba(0, 117, 191, 0.9));
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        border: 2px solid var(--accent-color);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        max-width: 90vw;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 3000);
}

/**
 * Obtener icono de notificación
 */
function getNotificationIcon(type) {
    const icons = {
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    return icons[type] || icons.info;
}

/**
 * Cerrar notificación
 */
function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ============================================
// EFECTOS VISUALES
// ============================================

/**
 * Aplicar animaciones de entrada
 */
function applyEntryAnimations() {
    const elements = document.querySelectorAll('.section-card, .directory-icon, .search-card');
    
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in-up');
    });
}

/**
 * Crear partícula flotante
 */
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(0, 204, 153, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 10px rgba(0, 204, 153, 0.3);
    `;
    
    document.body.appendChild(particle);
    
    particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
        { transform: 'translateY(-50vh) rotate(180deg)', opacity: 1 },
        { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
    ], {
        duration: Math.random() * 8000 + 6000,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

/**
 * Efecto de pulso
 */
function pulseEffect(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Función debounce para optimizar búsquedas
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Verificar si elemento está visible
 */
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

/**
 * Filtrar por categoría
 */
function filterByCategory(category) {
    currentFilter = category;
    
    allLinks.forEach(link => {
        const linkCategory = link.dataset.category;
        
        if (category === '' || linkCategory === category) {
            link.classList.remove('hidden');
        } else {
            link.classList.add('hidden');
        }
    });
    
    toggleEmptySections();
    showNotification(`Filtro aplicado: ${category || 'Todos'}`, 'info');
}

// ============================================
// CSS DINÁMICO PARA EFECTOS
// ============================================

// Agregar estilos adicionales
const additionalStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .search-result {
        margin-top: 20px;
        padding: 20px;
        background: linear-gradient(145deg, rgba(15, 44, 82, 0.8), rgba(0, 117, 191, 0.6));
        border-radius: 15px;
        border: 2px solid rgba(0, 204, 153, 0.3);
        text-align: center;
    }
    
    .no-results, .results-found {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .result-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 10px;
    }
    
    .clear-btn {
        background: linear-gradient(45deg, var(--accent-color), var(--golden-color));
        color: var(--primary-color);
        border: none;
        padding: 8px 16px;
        border-radius: 15px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.3s ease;
    }
    
    .clear-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 204, 153, 0.3);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

// Insertar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ============================================
// CONFIGURACIÓN FINAL
// ============================================

const DirectoriosConfig = {
    version: '1.0.0',
    totalContacts: 0,
    
    init: function() {
        this.totalContacts = allLinks.length;
        console.log(`📋 Directorios FECCOR v${this.version} - ${this.totalContacts} contactos disponibles`);
    }
};

// Event listener para finalizar inicialización
window.addEventListener('load', function() {
    DirectoriosConfig.init();
    showNotification('Directorio de contactos cargado correctamente', 'success');
});




/* SCRIPT DEL MNENU*/


// FUNCIONALIDAD DEL MENÚ FECCOR

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

// Cerrar menú móvil al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
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

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.main-navbar');
    if (!navbar.contains(event.target)) {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('navMenu').classList.remove('active');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('mobile-open');
        });
    }
});