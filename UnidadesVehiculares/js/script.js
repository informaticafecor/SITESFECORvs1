
        // Función para abrir modal de imagen
        function openImageModal(imageSrc, imageAlt) {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            
            modalImage.src = imageSrc;
            modalImage.alt = imageAlt;
            modal.style.display = 'flex';
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
        }

        // Función para cerrar modal de imagen
        function closeImageModal() {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'none';
            
            // Restaurar scroll del body
            document.body.style.overflow = 'auto';
        }

        // Función para actualizar contador de resultados
        function updateResultsCounter() {
            const visibleCategories = document.querySelectorAll('.document-category[style*="block"], .document-category:not([style*="none"])').length;
            const totalCategories = document.querySelectorAll('.document-category').length;
            
            // Contar documentos visibles
            let visibleDocuments = 0;
            let totalDocuments = 0;
            
            document.querySelectorAll('.document-category').forEach(category => {
                const documents = category.querySelectorAll('.document-item');
                totalDocuments += documents.length;
                
                if (category.style.display !== 'none') {
                    documents.forEach(doc => {
                        if (doc.style.display !== 'none') {
                            visibleDocuments++;
                        }
                    });
                }
            });

            const counter = document.getElementById('resultsCounter');
            const noResults = document.getElementById('noResults');
            
            if (visibleCategories === 0 || visibleDocuments === 0) {
                counter.style.display = 'none';
                noResults.style.display = 'block';
                document.getElementById('categoriesGrid').style.opacity = '0.3';
            } else {
                counter.style.display = 'block';
                noResults.style.display = 'none';
                document.getElementById('categoriesGrid').style.opacity = '1';
                counter.textContent = `Mostrando ${visibleDocuments} documentos en ${visibleCategories} categorías`;
            }
        }

        // Función de búsqueda
        function searchDocuments() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            
            if (searchInput === '') {
                // Mostrar todo si no hay búsqueda
                document.querySelectorAll('.document-category').forEach(category => {
                    category.style.display = 'block';
                    category.querySelectorAll('.document-item').forEach(item => {
                        item.style.display = 'block';
                    });
                });
            } else {
                // Buscar en cada categoría
                document.querySelectorAll('.document-category').forEach(category => {
                    let categoryHasVisibleItems = false;
                    
                    // Buscar en los documentos de esta categoría
                    category.querySelectorAll('.document-item').forEach(item => {
                        const title = item.querySelector('h3').textContent.toLowerCase();
                        const description = item.querySelector('p').textContent.toLowerCase();
                        
                        if (title.includes(searchInput) || description.includes(searchInput)) {
                            item.style.display = 'block';
                            categoryHasVisibleItems = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Mostrar/ocultar la categoría completa
                    if (categoryHasVisibleItems) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            }
            
            updateResultsCounter();
        }

        // Mejorar experiencia de búsqueda con debounce
        let searchTimeout;
        document.getElementById('searchInput').addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchDocuments, 300);
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeImageModal();
            }
        });

        // Prevenir cierre del modal al hacer clic en la imagen
        document.querySelector('.modal-content').addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Inicialización
        window.addEventListener('DOMContentLoaded', function() {
            updateResultsCounter();
        });



        /* SCRIPT DEL MNENU*/



// FUNCIONALIDAD DEL MENÚ FECCOR
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