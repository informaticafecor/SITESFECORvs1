// Variables para los filtros activos
        let selectedYear = '';
        let selectedType = '';
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
                counter.textContent = `Mostrando ${visibleCards} de ${totalCards} resultados`;
            }
        }


        // Filtrar por tipo de noticia o comunicado
        function filterType(type) {
            selectedType = type;

            // Resaltar solo el botón seleccionado
            document.querySelectorAll('.tab-btn').forEach(btn => {
                if (!btn.classList.contains('clear-filters')) {
                    btn.classList.remove('active');
                }
            });
            document.getElementById('btn-' + type).classList.add('active');

            // Reiniciar filtros de año y mes
            selectedYear = '';
            currentMonth = '';
            document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('active'));

            // Ocultar los meses hasta que se seleccione año
            document.getElementById('monthGroup').style.display = 'none';

            // Aplicar filtros
            applyFilters();
        }           


        // Seleccionar año y filtrar noticias
        function selectYear(year) {
            selectedYear = year;
            currentMonth = '';

            // Resaltar solo el botón seleccionado
            document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('btn-' + year).classList.add('active');

            // Mostrar sección de meses - CAMBIA ESTE ID
            document.getElementById('monthGroup').style.display = 'flex';

            // Desactivar botones de mes
            document.querySelectorAll('#monthGroup .date-btn').forEach(btn => btn.classList.remove('active'));

            // Aplicar filtros
            applyFilters();
        }



        // Filtrar por mes
        function filterMonth(month) {
            currentMonth = month;

            // Resaltar solo el botón seleccionado en la sección de meses
            document.querySelectorAll('#monthGroup .date-btn').forEach(btn => btn.classList.remove('active'));
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
                const matchesType = selectedType === '' || card.classList.contains(selectedType);
                const matchesYear = selectedYear === '' || card.classList.contains(selectedYear);
                const matchesMonth = currentMonth === '' || card.classList.contains(currentMonth);

                if (matchesSearch && matchesType && matchesYear && matchesMonth) {
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


        // Limpiar todos los filtros
        // Limpiar todos los filtros
        function clearAllFilters() {
            // Reiniciar variables
            selectedYear = '';
            selectedType = '';
            currentMonth = '';

            // Eliminar clases activas de todos los botones
            document.querySelectorAll('.tab-btn, .date-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Ocultar los filtros de meses
            document.getElementById('monthGroup').style.display = 'none';

            // Limpiar el buscador
            document.getElementById('searchInput').value = '';

            // Mostrar solo las primeras tarjetas
            showInitialCards();

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
            
            // Mostrar solo las primeras tarjetas al cargar
            showInitialCards();
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


        // Función para mostrar solo las primeras tarjetas al inicio
        function showInitialCards() {
            const allCards = document.querySelectorAll('.news-card');
            allCards.forEach((card, index) => {
                if (index < 6) { // Mostrar solo las primeras 6
                    card.style.display = 'block';
                    card.classList.add('show');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('show');
                }
            });
        }     


let showingAll = false;

function toggleViewMore() {
    const allCards = document.querySelectorAll('.news-card');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const viewMoreContainer = document.getElementById('viewMoreContainer');
    
    if (!showingAll) {
        // Mostrar todas las tarjetas
        allCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('show');
        });
        viewMoreBtn.textContent = 'Ver menos';
        showingAll = true;
    } else {
        // Mostrar solo las primeras 6
        showInitialCards();
        viewMoreBtn.textContent = 'Ver más';
        showingAll = false;
    }
    
    updateResultsCounter();
}

// Función para ocultar/mostrar el botón Ver más
function toggleViewMoreButton() {
    const allCards = document.querySelectorAll('.news-card');
    const visibleCards = document.querySelectorAll('.news-card[style*="block"], .news-card:not([style*="none"])');
    const viewMoreContainer = document.getElementById('viewMoreContainer');
    
    // Solo mostrar el botón si hay filtros activos o si no se están mostrando todas
    if (selectedType === '' && selectedYear === '' && currentMonth === '' && !showingAll) {
        viewMoreContainer.style.display = 'flex';
    } else if (selectedType !== '' || selectedYear !== '' || currentMonth !== '') {
        viewMoreContainer.style.display = 'none';
    }
}
