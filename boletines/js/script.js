// ============================================
// SCRIPTS PARA BOLETINES ESTADÍSTICOS FECCOR
// ============================================

// Animación de entrada para elementos
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Boletines Estadísticos FECCOR inicializados');
    
    // Aplicar animaciones de entrada
    const elements = document.querySelectorAll('.featured-document, .stats-icon');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('fade-in-up');
    });
    
    // Inicializar efectos interactivos
    initializeInteractiveEffects();
    
    // Crear partículas de fondo ocasionalmente
    setInterval(createParticle, 5000);
});

// ============================================
// EFECTOS INTERACTIVOS
// ============================================

/**
 * Inicializar efectos interactivos para elementos
 */
function initializeInteractiveEffects() {
    const featuredDocument = document.querySelector('.featured-document');
    const statsIcon = document.querySelector('.stats-icon');
    
    // Efecto hover mejorado para el documento destacado
    if (featuredDocument) {
        featuredDocument.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.borderColor = 'var(--golden-color)';
        });
        
        featuredDocument.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.borderColor = 'var(--accent-color)';
        });
    }
    
    // Efecto hover para el icono de estadísticas
    if (statsIcon) {
        statsIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        statsIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Efectos para botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// EFECTOS VISUALES
// ============================================

/**
 * Crear partículas flotantes de fondo
 */
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Estilos para la partícula
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
    
    // Animación de la partícula
    particle.animate([
        { 
            transform: 'translateY(0) rotate(0deg)', 
            opacity: 0 
        },
        { 
            transform: 'translateY(-50vh) rotate(180deg)', 
            opacity: 1 
        },
        { 
            transform: 'translateY(-100vh) rotate(360deg)', 
            opacity: 0 
        }
    ], {
        duration: Math.random() * 8000 + 6000,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

/**
 * Efecto de pulso para elementos importantes
 */
function pulseEffect(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// ============================================
// FUNCIONES DE NAVEGACIÓN Y ENLACES
// ============================================

/**
 * Manejar clics en botones de documentos
 */
function handleDocumentClick(event, action) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const documentTitle = button.closest('.featured-document').querySelector('.document-title').textContent;
    
    // Efecto visual en el botón
    pulseEffect(button);
    
    // Simular acción según el tipo
    if (action === 'view') {
        console.log(`Ver documento: ${documentTitle}`);
        // Aquí puedes agregar la lógica para abrir el documento
        // window.open('URL_DEL_DOCUMENTO', '_blank');
    } else if (action === 'download') {
        console.log(`Descargar documento: ${documentTitle}`);
        // Aquí puedes agregar la lógica para descargar el documento
    }
    
    // Mostrar feedback visual
    showNotification(`${action === 'view' ? 'Abriendo' : 'Descargando'}: ${documentTitle}`, 'info');
}

// ============================================
// SISTEMA DE NOTIFICACIONES SIMPLE
// ============================================

/**
 * Mostrar notificación temporal
 */
function showNotification(message, type = 'info') {
    // Verificar si ya existe una notificación
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-text">${message}</span>
    `;
    
    // Estilos para la notificación
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
        font-family: 'Segoe UI', sans-serif;
        font-size: 0.9rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Obtener icono según el tipo de notificación
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

// ============================================
// UTILIDADES
// ============================================

/**
 * Detectar si el elemento está visible en el viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Animar elementos cuando entran al viewport
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('fade-in-up', 'animated');
        }
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

// Agregar event listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para botones de documentos
    const viewButton = document.querySelector('.btn-primary');
    const downloadButton = document.querySelector('.btn-secondary');
    
    if (viewButton) {
        viewButton.addEventListener('click', (e) => handleDocumentClick(e, 'view'));
    }
    
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => handleDocumentClick(e, 'download'));
    }
    
    // Event listener para scroll (animaciones)
    window.addEventListener('scroll', animateOnScroll);
    
    // Event listener para redimensionamiento de ventana
    window.addEventListener('resize', function() {
        // Ajustes responsivos adicionales si es necesario
        console.log('Ventana redimensionada');
    });
});

// ============================================
// CSS DINÁMICO PARA ANIMACIONES
// ============================================

// Agregar estilos CSS adicionales para las animaciones
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
    
    .floating-particle {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
`;

// Insertar estilos adicionales en el documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ============================================
// CONFIGURACIÓN FINAL
// ============================================

// Configuración global para el módulo
const BoletinesConfig = {
    version: '1.0.0',
    author: 'FECCOR',
    initialized: false,
    
    init: function() {
        if (!this.initialized) {
            console.log(`Boletines Estadísticos v${this.version} - Iniciado correctamente`);
            this.initialized = true;
        }
    }
};

// Inicializar configuración
BoletinesConfig.init();