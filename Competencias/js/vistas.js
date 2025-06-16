/* ===================================
   SISTEMA DE VISTAS - COMPETENCIAS
   =================================== */

// Variable para la vista actual
let currentView = 'grid';

// Cambiar vista (grid/lista)
function toggleView(viewType) {
    currentView = viewType;
    const container = document.getElementById('competenciasContainer');
    
    // Actualizar botones
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(viewType + '-view').classList.add('active');
    
    // Cambiar clases del contenedor
    if (viewType === 'list') {
        container.classList.remove('competencias-grid');
        container.classList.add('competencias-list', 'list-view');
    } else {
        container.classList.remove('competencias-list', 'list-view');
        container.classList.add('competencias-grid');
    }
}

// Animar las tarjetas al mostrarlas
function animateCards() {
    document.querySelectorAll('.competencia-card').forEach((card, competencias) => {
        card.style.animationDelay = `${competencias * 0.1}s`;
    });
}