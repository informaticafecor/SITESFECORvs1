// Variable para controlar si estamos en modo búsqueda
        let isSearching = false;

        // Función para mostrar la sección seleccionada
        function showSection(sectionName) {
            // Limpiar búsqueda primero
            document.getElementById('searchInput').value = '';
            isSearching = false;
            
            // Ocultar todas las secciones
            document.querySelectorAll('.peritaje-section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Remover clase active de todos los enlaces de navegación
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            const targetSection = document.getElementById('section-' + sectionName);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }
            
            // Activar el enlace correspondiente
            const targetNav = document.getElementById('nav-' + sectionName);
            if (targetNav) {
                targetNav.classList.add('active');
            }
            
            // Prevenir comportamiento por defecto del enlace
            return false;
        }

        // Función de búsqueda
        function searchContent() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Si no hay búsqueda, volver a mostrar solo la sección activa
                isSearching = false;
                document.querySelectorAll('.peritaje-section').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('search-result');
                });
                
                // Mostrar solo la sección que está activa en la navegación
                const activeNav = document.querySelector('.nav-link.active');
                if (activeNav) {
                    const sectionName = activeNav.id.replace('nav-', '');
                    const activeSection = document.getElementById('section-' + sectionName);
                    if (activeSection) {
                        activeSection.style.display = 'block';
                    }
                }
                return;
            }
            
            isSearching = true;
            let foundResults = false;
            
            // Buscar en todas las secciones
            document.querySelectorAll('.peritaje-section').forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                
                if (sectionText.includes(searchTerm)) {
                    section.style.display = 'block';
                    section.classList.add('search-result');
                    foundResults = true;
                } else {
                    section.style.display = 'none';
                    section.classList.remove('search-result');
                }
            });
            
            // Mostrar mensaje si no se encontraron resultados
            if (!foundResults) {
                console.log('No se encontraron resultados para: ' + searchTerm);
                // Podrías agregar aquí un mensaje visual de "sin resultados"
            }
        }

        // Limpiar búsqueda al hacer Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.getElementById('searchInput').value = '';
                searchContent(); // Esto limpiará la búsqueda y volverá a la navegación normal
            }
        });

        // Mejorar experiencia de búsqueda con debounce
        let searchTimeout;
        document.getElementById('searchInput').addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchContent, 300);
        });

        // Inicialización
        window.addEventListener('DOMContentLoaded', function() {
            // Asegurar que solo la primera sección esté visible
            showSection('acustica');
        });

        // Agregar event listeners a los enlaces de navegación
        document.addEventListener('DOMContentLoaded', function() {
            // Agregar eventos de clic a todos los enlaces de navegación
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevenir comportamiento por defecto
                    const sectionName = this.id.replace('nav-', '');
                    showSection(sectionName);
                });
            });
        });


