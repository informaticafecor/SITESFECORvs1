/* ===================================
   ARCHIVO PRINCIPAL - COMPETENCIAS
   =================================== */

// Inicialización de la aplicación
/*
function initializeApp() {
    // Limpiar todos los filtros al cargar
    clearAllFilters();
    
    // Configurar los listeners de búsqueda
    setupSearchListeners();
    
    // Animar las tarjetas al cargar
    animateCards();
    
    // Configurar navegación con teclado
    setupKeyboardNavigation();
    
    console.log('Aplicación de Competencias inicializada correctamente');
}

// Configurar navegación con teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearAllFilters();
        }
    });
}

// Función para debugging - mostrar estado actual
function showCurrentState() {
    console.log('Estado actual de filtros:', {
        tipo: selectedType,
        año: selectedYear,
        mes: currentMonth,
        vista: currentView
    });
}

// Event listener para cuando el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Event listener para cuando la ventana esté completamente cargada
window.addEventListener('load', function() {
    // Cualquier inicialización adicional que requiera recursos cargados
    console.log('Todos los recursos han sido cargados');
});

// Función de utilidad para mostrar/ocultar elementos
function toggleElement(elementId, show = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (show === null) {
        // Toggle automático
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    } else {
        // Mostrar u ocultar específicamente
        element.style.display = show ? 'block' : 'none';
    }
}

// Función de utilidad para agregar clase CSS
function addCSSClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(className);
    }
}

// Función de utilidad para remover clase CSS
function removeCSSClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove(className);
    }
}

// Exportar funciones para uso global si es necesario
window.CompetenciasApp = {
    initializeApp,
    showCurrentState,
    toggleElement,
    addCSSClass,
    removeCSSClass
}; */


/* ===================================
   ARCHIVO PRINCIPAL - COMPETENCIAS
   =================================== */

// Inicialización de la aplicación
function initializeApp() {
    // Configurar los listeners de búsqueda
    setupSearchListeners();
    
    // Mostrar solo las más recientes al inicio
    showInitialView();
    
    // Animar las tarjetas al cargar
    animateCards();
    
    // Configurar navegación con teclado
    setupKeyboardNavigation();
    
    console.log('Aplicación de Competencias inicializada correctamente');
}

// Nueva función: Mostrar vista inicial contraída
function showInitialView() {
    const cards = document.querySelectorAll('.competencia-card');
    
    // Ocultar todas las tarjetas primero
    cards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('show');
    });
    
    // Mostrar solo las 6 más recientes (puedes cambiar este número)
    const recentCards = Array.from(cards)
        .filter(card => card.classList.contains('2025')) // Solo las de 2025
        .slice(0, 6); // Solo las primeras 6
    
    recentCards.forEach(card => {
        card.style.display = 'block';
        card.classList.add('show');
    });
    
    // Actualizar contador
    updateResultsCounter();
    
    // Limpiar filtros activos visualmente
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ocultar los filtros de meses
    document.getElementById('monthGroup').style.display = 'none';
    
    // Limpiar el buscador
    document.getElementById('searchInput').value = '';
    
    // Reiniciar variables de filtros
    selectedType = '';
    selectedYear = '';
    currentMonth = '';
}

// Configurar navegación con teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearAllFilters();
        }
    });
}

// Función para debugging - mostrar estado actual
function showCurrentState() {
    console.log('Estado actual de filtros:', {
        tipo: selectedType,
        año: selectedYear,
        mes: currentMonth,
        vista: currentView
    });
}

// Event listener para cuando el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Event listener para cuando la ventana esté completamente cargada
window.addEventListener('load', function() {
    // Cualquier inicialización adicional que requiera recursos cargados
    console.log('Todos los recursos han sido cargados');
});

// Función de utilidad para mostrar/ocultar elementos
function toggleElement(elementId, show = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (show === null) {
        // Toggle automático
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    } else {
        // Mostrar u ocultar específicamente
        element.style.display = show ? 'block' : 'none';
    }
}

// Función de utilidad para agregar clase CSS
function addCSSClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(className);
    }
}

// Función de utilidad para remover clase CSS
function removeCSSClass(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove(className);
    }
}

// Exportar funciones para uso global si es necesario
window.CompetenciasApp = {
    initializeApp,
    showCurrentState,
    toggleElement,
    addCSSClass,
    removeCSSClass
};


