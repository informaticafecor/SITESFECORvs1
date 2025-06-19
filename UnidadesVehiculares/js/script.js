
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
