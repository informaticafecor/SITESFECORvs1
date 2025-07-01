// Base de datos de documentos por mes con enlaces reales a Google Drive
const documentsByMonth = {
    enero: [
        {
            title: "Turno",
            driveLink: "https://drive.google.com/file/d/1ECfR3gQRF0Rgvn9JjcvQ16Eumer87zBQ/view"
        }
    ],
    febrero: [
        {
            title: "Rol de turnos de Defensores Públicos de Defensa Penal I",
            driveLink: "https://drive.google.com/file/d/1W5Oqgx97ZjUoRiV-gQxhnzxJvua_kK4m/view"
        },
        {
            title: "Rol de turnos de Defensores Públicos de Defensa Penal II",
            driveLink: "https://drive.google.com/file/d/1VQANmoVIiYInKF7y2M9rodG6JVx8phv8/view"
        },
        {
            title: "Rol de turnos de Defensores Públicos de Defensa Penal III",
            driveLink: "https://drive.google.com/file/d/1MV1B5j8lzvyMs4jd_fPRUoRWET2aSwit/view"
        }
    ],
    marzo: [
        {
            title: "ANEXO II - ROL DE DEFENSORES PÚBLICOS DE DEFENSA PENAL 2025",
            driveLink: "https://drive.google.com/file/d/1Xvq3F8xTRM3ldB2pPcc8eFhMhc5sBhoA/view"
        },
        {
            title: "ANEXO III - ROL DE DEFENSORES PÚBLICOS DE DEFENSA PENAL 2025",
            driveLink: "https://drive.google.com/file/d/1V5KSp-xw0paIN0toV6S4QJDilWLautw0/view"
        },
        {
            title: "ANEXO V - ROL DE DEFENSORES PÚBLICOS DE DEFENSA PENAL 2025",
            driveLink: "https://drive.google.com/file/d/1fmzczEOFzaAKLO4qFAIXPfSo2_Z7YDRS/view"
        }
    ],
    abril: [

    ],
    mayo: [

    ],
    junio: [

    ]
};

// Variable para el mes actualmente seleccionado
let currentSelectedMonth = 'enero';

// Función para seleccionar un mes
function selectMonth(month) {
    // Actualizar variable global
    currentSelectedMonth = month;
    
    // Actualizar botones
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-month="${month}"]`).classList.add('active');
    
    // Cargar documentos del mes seleccionado
    loadDocumentsForMonth(month);
    
    // Mostrar notificación
    //showNotification(`Mostrando documentos de ${month.charAt(0).toUpperCase() + month.slice(1)}`, 'info');
}

// Función para cargar documentos de un mes específico
function loadDocumentsForMonth(month) {
    const container = document.getElementById('documentsContainer');
    const documents = documentsByMonth[month] || [];
    
    if (documents.length === 0) {
        container.innerHTML = `
            <div class="no-documents">
                <p>No hay documentos disponibles para ${month}</p>
            </div>
        `;
        return;
    }
    
    const monthNameCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    
    let html = `<h3>${monthNameCapitalized}</h3>`;
    html += '<div class="document-links">';
    
    documents.forEach(doc => {
        html += `
            <a href="${doc.driveLink}" class="document-link" target="_blank" rel="noopener noreferrer">
                📄 ${doc.title}
            </a>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Reactivar efectos hover
    enhanceHoverEffects();
}

// Función para abrir enlace de Google Drive (ya no es necesaria pero la mantengo por compatibilidad)
function openDriveLink(driveLink, title) {
    // Mostrar notificación antes de abrir
    showNotification(`Abriendo ${title} en Google Drive...`, 'info');
    
    // Abrir en nueva pestaña
    window.open(driveLink, '_blank', 'noopener,noreferrer');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
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
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
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
    
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(closeBtn);
        }
    }, 3000); // Reducido a 3 segundos para ser menos intrusivo
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

// Función para agregar animaciones CSS dinámicamente
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
    const monthButtons = document.querySelectorAll('.month-btn');
    
    monthButtons.forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Navegación con flechas entre los botones de mes
    monthButtons.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && index > 0) {
                monthButtons[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < monthButtons.length - 1) {
                monthButtons[index + 1].focus();
            }
        });
    });
}

// Función para mejorar los efectos hover
function enhanceHoverEffects() {
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        // Remover listeners existentes para evitar duplicados
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
        
        // Agregar nuevos listeners
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
        
        // Agregar evento de click para mostrar notificación
        link.addEventListener('click', function(e) {
            const title = this.textContent.replace('📄 ', '').trim();
            showNotification(`Abriendo "${title}" en Google Drive...`, 'info');
        });
        
        // Accesibilidad con teclado
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                // El navegador manejará automáticamente el click en el enlace
                const title = this.textContent.replace('📄 ', '').trim();
                showNotification(`Abriendo "${title}" en Google Drive...`, 'info');
            }
        });
        
        if (!link.hasAttribute('tabindex')) {
            link.setAttribute('tabindex', '0');
        }
    });
}

function handleLinkHover() {
    this.style.transform = 'translateX(8px)';
}

function handleLinkLeave() {
    this.style.transform = 'translateX(0)';
}

// Función para manejar responsive
function handleResponsive() {
    const mainContent = document.querySelector('.main-content');
    const sidebarIcon = document.querySelector('.sidebar-icon');
    
    function checkScreenSize() {
        if (window.innerWidth <= 900) {
            if (mainContent && sidebarIcon) {
                mainContent.style.flexDirection = 'column';
                mainContent.style.alignItems = 'center';
            }
        } else {
            if (mainContent) {
                mainContent.style.flexDirection = 'row';
                mainContent.style.alignItems = 'flex-start';
            }
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Función para búsqueda en documentos del mes actual
function searchInCurrentMonth(searchTerm) {
    const documents = documentsByMonth[currentSelectedMonth] || [];
    const filteredDocs = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    loadFilteredDocuments(currentSelectedMonth, filteredDocs, searchTerm);
}

// Función para cargar documentos filtrados
function loadFilteredDocuments(month, documents, searchTerm = '') {
    const container = document.getElementById('documentsContainer');
    
    if (documents.length === 0) {
        container.innerHTML = `
            <div class="no-documents">
                <p>${searchTerm ? 
                    `No se encontraron documentos con "${searchTerm}" en ${month}` : 
                    `No hay documentos disponibles para ${month}`}</p>
            </div>
        `;
        return;
    }
    
    const monthNameCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    
    let html = `<h3>${monthNameCapitalized}${searchTerm ? ` - Búsqueda: "${searchTerm}"` : ''}</h3>`;
    html += '<div class="document-links">';
    
    documents.forEach(doc => {
        html += `
            <a href="${doc.driveLink}" class="document-link" target="_blank" rel="noopener noreferrer">
                📄 ${doc.title}
            </a>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    enhanceHoverEffects();
}

// Función para actualizar enlaces de Google Drive (para uso futuro)
function updateDriveLinks(month, newLinks) {
    if (documentsByMonth[month]) {
        documentsByMonth[month].forEach((doc, index) => {
            if (newLinks[index]) {
                doc.driveLink = newLinks[index];
            }
        });
        
        // Recargar si es el mes actual
        if (currentSelectedMonth === month) {
            loadDocumentsForMonth(month);
        }
        
        showNotification(`Enlaces de ${month} actualizados correctamente`, 'success');
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Defensores Públicos - Página cargada con enlaces de Google Drive');
    
    // Inicializar funcionalidades
    addAnimationStyles();
    enhanceAccessibility();
    handleResponsive();
    
    // Cargar documentos del mes inicial (enero)
    loadDocumentsForMonth(currentSelectedMonth);
    
    // Mostrar mensaje de bienvenida
    /*setTimeout(() => {
        showNotification('Bienvenido a la sección de Defensores Públicos', 'info');
    }, 1000);*/
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
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
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
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

// Función para agregar animaciones CSS dinámicamente
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
    const monthButtons = document.querySelectorAll('.month-btn');
    
    monthButtons.forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Navegación con flechas entre los botones de mes
    monthButtons.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && index > 0) {
                monthButtons[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < monthButtons.length - 1) {
                monthButtons[index + 1].focus();
            }
        });
    });
}

// Función para mejorar los efectos hover
function enhanceHoverEffects() {
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        // Remover listeners existentes
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
        
        // Agregar nuevos listeners
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
        
        // Accesibilidad con teclado
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        if (!link.hasAttribute('tabindex')) {
            link.setAttribute('tabindex', '0');
        }
    });
}

function handleLinkHover() {
    this.style.transform = 'translateX(8px)';
}

function handleLinkLeave() {
    this.style.transform = 'translateX(0)';
}

// Función para manejar responsive
function handleResponsive() {
    const mainContent = document.querySelector('.main-content');
    const sidebarIcon = document.querySelector('.sidebar-icon');
    
    function checkScreenSize() {
        if (window.innerWidth <= 900) {
            if (mainContent && sidebarIcon) {
                mainContent.style.flexDirection = 'column';
                mainContent.style.alignItems = 'center';
            }
        } else {
            if (mainContent) {
                mainContent.style.flexDirection = 'row';
                mainContent.style.alignItems = 'flex-start';
            }
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Función para búsqueda en documentos del mes actual
function searchInCurrentMonth(searchTerm) {
    const documents = documentsByMonth[currentSelectedMonth] || [];
    const filteredDocs = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    loadFilteredDocuments(currentSelectedMonth, filteredDocs, searchTerm);
}

// Función para cargar documentos filtrados
function loadFilteredDocuments(month, documents, searchTerm = '') {
    const container = document.getElementById('documentsContainer');
    
    if (documents.length === 0) {
        container.innerHTML = `
            <div class="no-documents">
                <p>${searchTerm ? 
                    `No se encontraron documentos con "${searchTerm}" en ${month}` : 
                    `No hay documentos disponibles para ${month}`}</p>
            </div>
        `;
        return;
    }
    
    const monthNameCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    
    let html = `<h3>${monthNameCapitalized}${searchTerm ? ` - Búsqueda: "${searchTerm}"` : ''}</h3>`;
    html += '<div class="document-links">';
    
    documents.forEach(doc => {
        html += `
            <a href="#" class="document-link" onclick="downloadDocument('${doc.filename}')">
                📄 ${doc.title}
            </a>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    enhanceHoverEffects();
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Defensores Públicos - Página cargada');
    
    // Inicializar funcionalidades
    addAnimationStyles();
    enhanceAccessibility();
    handleResponsive();
    
    // Cargar documentos del mes inicial (enero)
    loadDocumentsForMonth(currentSelectedMonth);
    
    // Mostrar mensaje de bienvenida
   /* setTimeout(() => {
        showNotification('Bienvenido a la sección de Defensores Públicos', 'info');
    }, 1000);*/
});

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
    /*setTimeout(() => {
        showNotification('Bienvenido a la sección de Defensores Públicos', 'info');
    }, 1000);*/
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

