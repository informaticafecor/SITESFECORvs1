// Función para simular descarga de documentos
function downloadDocument(filename) {
    // Simular descarga
    console.log(`Descargando: ${filename}`);
    
    // Mostrar mensaje de confirmación
    showNotification(`Descargando ${filename}...`, 'info');
    
    // Aquí podrías agregar la lógica real de descarga
    // Por ejemplo: window.open(`/downloads/${filename}`, '_blank');
    
    // Simular un pequeño delay para la descarga
    setTimeout(() => {
        showNotification(`${filename} descargado correctamente`, 'success');
    }, 1500);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificación existente si la hay
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">×</button>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'warning' ? '#ff9800' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    // Estilos del contenido
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Estilos del botón cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2em;
        cursor: pointer;
        margin-left: auto;
        padding: 0 5px;
        border-radius: 3px;
        transition: background 0.2s;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
    
    document.body.appendChild(notification);
    
    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(closeBtn);
        }
    }, 4000);
}

// Función para cerrar notificación
function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Agregar animaciones CSS dinámicamente
function addAnimationStyles() {
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función para mejorar la accesibilidad
function enhanceAccessibility() {
    // Agregar navegación por teclado para los enlaces
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Hacer los enlaces enfocables con teclado
        if (!link.hasAttribute('tabindex')) {
            link.setAttribute('tabindex', '0');
        }
    });
}

// Función para manejar responsive
function handleResponsive() {
    const mainContent = document.querySelector('.main-content');
    const sidebarIcon = document.querySelector('.sidebar-icon');
    
    function checkScreenSize() {
        if (window.innerWidth <= 900) {
            // En móvil, asegurar que el icono esté arriba
            if (mainContent && sidebarIcon) {
                mainContent.style.flexDirection = 'column';
                mainContent.style.alignItems = 'center';
            }
        } else {
            // En desktop, restaurar layout original
            if (mainContent) {
                mainContent.style.flexDirection = 'row';
                mainContent.style.alignItems = 'flex-start';
            }
        }
    }
    
    // Verificar al cargar y al redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Función para agregar efectos de hover mejorados
function enhanceHoverEffects() {
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Defensores Públicos - Página cargada');
    
    // Inicializar funcionalidades
    addAnimationStyles();
    enhanceAccessibility();
    handleResponsive();
    enhanceHoverEffects();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('Bienvenido a la sección de Defensores Públicos', 'info');
    }, 1000);
});

// Función adicional para búsqueda (por si se necesita en el futuro)
function searchDocuments(searchTerm) {
    const monthSections = document.querySelectorAll('.month-section');
    const searchLower = searchTerm.toLowerCase();
    
    monthSections.forEach(section => {
        const links = section.querySelectorAll('.document-link');
        let hasVisibleLinks = false;
        
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(searchLower) || searchTerm === '') {
                link.style.display = 'flex';
                hasVisibleLinks = true;
            } else {
                link.style.display = 'none';
            }
        });
        
        // Mostrar/ocultar la sección completa según si tiene enlaces visibles
        section.style.display = hasVisibleLinks || searchTerm === '' ? 'block' : 'none';
    });
}

// Función para exportar la lista de documentos (funcionalidad adicional)
function exportDocumentsList() {
    const documentLinks = document.querySelectorAll('.document-link');
    let exportData = 'Listado de Documentos - Defensores Públicos\n\n';
    
    const monthSections = document.querySelectorAll('.month-section');
    monthSections.forEach(section => {
        const monthTitle = section.querySelector('h3').textContent;
        exportData += `${monthTitle}:\n`;
        
        const links = section.querySelectorAll('.document-link');
        links.forEach(link => {
            const linkText = link.textContent.trim();
            exportData += `  - ${linkText}\n`;
        });
        exportData += '\n';
    });
    
    // Crear y descargar archivo
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista-documentos-defensores.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Lista de documentos exportada correctamente', 'success');
}