// Función para actualizar el contador de resultados
        function updateResultsCounter() {
            const visibleSections = document.querySelectorAll('.resource-section[style*="block"], .resource-section:not([style*="none"])').length;
            const totalSections = document.querySelectorAll('.resource-section').length;
            
            // Contar items visibles en total
            let visibleItems = 0;
            let totalItems = 0;
            
            document.querySelectorAll('.resource-section').forEach(section => {
                if (section.style.display !== 'none') {
                    const items = section.querySelectorAll('.resource-item');
                    items.forEach(item => {
                        totalItems++;
                        if (item.style.display !== 'none') {
                            visibleItems++;
                        }
                    });
                } else {
                    totalItems += section.querySelectorAll('.resource-item').length;
                }
            });

            const counter = document.getElementById('resultsCounter');
            const noResults = document.getElementById('noResults');
            
            if (visibleSections === 0 || visibleItems === 0) {
                counter.style.display = 'none';
                noResults.style.display = 'block';
                document.getElementById('sectionsGrid').style.opacity = '0.3';
            } else {
                counter.style.display = 'block';
                noResults.style.display = 'none';
                document.getElementById('sectionsGrid').style.opacity = '1';
                counter.textContent = `Mostrando ${visibleItems} recursos en ${visibleSections} categorías`;
            }
        }

        // Función de búsqueda global
        function searchAllResources() {
            const searchInput = document.getElementById('globalSearch').value.toLowerCase();
            
            if (searchInput === '') {
                // Mostrar todo si no hay búsqueda
                document.querySelectorAll('.resource-section').forEach(section => {
                    section.style.display = 'block';
                    section.querySelectorAll('.resource-item').forEach(item => {
                        item.style.display = 'block';
                    });
                });
            } else {
                // Buscar en cada sección
                document.querySelectorAll('.resource-section').forEach(section => {
                    let sectionHasVisibleItems = false;
                    
                    // Buscar en los items de esta sección
                    section.querySelectorAll('.resource-item').forEach(item => {
                        const link = item.querySelector('.resource-link');
                        const text = link.textContent.toLowerCase();
                        
                        if (text.includes(searchInput)) {
                            item.style.display = 'block';
                            sectionHasVisibleItems = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    // Mostrar/ocultar la sección completa
                    if (sectionHasVisibleItems) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
            
            updateResultsCounter();
        }

        // Limpiar búsqueda
        function clearAllSearch() {
            document.getElementById('globalSearch').value = '';
            
            // Mostrar todo
            document.querySelectorAll('.resource-section').forEach(section => {
                section.style.display = 'block';
                section.querySelectorAll('.resource-item').forEach(item => {
                    item.style.display = 'block';
                });
            });
            
            updateResultsCounter();
        }

        // Mejorar la experiencia de búsqueda con debounce
        let searchTimeout;
        document.getElementById('globalSearch').addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchAllResources, 300);
        });

        // Inicialización
        window.addEventListener('DOMContentLoaded', function() {
            updateResultsCounter();
        });

        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                clearAllSearch();
            }
        });

        // Agregar efectos de hover dinámicos
        document.querySelectorAll('.resource-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.closest('.resource-item').style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.closest('.resource-item').style.transform = 'translateX(0)';
            });
        });