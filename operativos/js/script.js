// Variables para los filtros activos
        let selectedYear = '';
        let currentMonth = '';

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
                counter.textContent = `Mostrando ${visibleCards} de ${totalCards} operativos`;
            }
        }

        // Seleccionar año y filtrar operativos
        function selectYear(year) {
            selectedYear = year;
            currentMonth = '';

            // Resaltar solo el botón seleccionado
            document.querySelectorAll('#yearFilters button').forEach(btn => btn.classList.remove('active'));
            document.getElementById('btn-' + year).classList.add('active');

            // Mostrar sección de meses
            document.getElementById('monthFilters').style.display = 'block';

            // Desactivar botones de mes
            document.querySelectorAll('#monthFilters button').forEach(btn => btn.classList.remove('active'));

            // Aplicar filtros
            applyFilters();
        }

        // Filtrar por mes
        function filterMonth(month) {
            currentMonth = month;

            // Resaltar solo el botón seleccionado
            document.querySelectorAll('#monthFilters button').forEach(btn => btn.classList.remove('active'));
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
                const matchesSearch = searchInput === '' || title.includes(searchInput) || description.includes(searchInput);
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

        // Búsqueda por texto mejorada
        function searchNews() {
            applyFilters();
        }

        // Limpiar todos los filtros
        function clearAllFilters() {
            // Reiniciar variables
            selectedYear = '';
            currentMonth = '';

            // Eliminar clases activas de todos los botones
            document.querySelectorAll('#yearFilters button, #monthFilters button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Ocultar los filtros de meses
            document.getElementById('monthFilters').style.display = 'none';

            // Limpiar el buscador
            document.getElementById('searchInput').value = '';

            // Mostrar todos los operativos
            document.querySelectorAll('.news-card').forEach(card => {
                card.style.display = 'block';
                card.classList.add('show');
            });

            updateResultsCounter();
        }

        // Mejorar la experiencia de búsqueda con debounce
        let searchTimeout;
        document.getElementById('searchInput').addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchNews, 300);
        });

        // Inicialización mejorada
        window.addEventListener('DOMContentLoaded', function() {
            // Limpiar todos los filtros al cargar
            clearAllFilters();
            
            // Animar las tarjetas al cargar
            document.querySelectorAll('.news-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });

        // Añadir soporte para navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                clearAllFilters();
            }
        });

