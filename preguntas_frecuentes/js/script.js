        // Variables globales simples
        let currentCategory = 'todas';

        // Función simple para toggle FAQ - Compatible con Google Sites
        function toggleFAQ(questionElement) {
            if (!questionElement) return;
            
            try {
                const faqItem = questionElement.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Cerrar todas las otras preguntas
                const allItems = document.querySelectorAll('.faq-item.active');
                for (let i = 0; i < allItems.length; i++) {
                    if (allItems[i] !== faqItem) {
                        allItems[i].classList.remove('active');
                        const toggle = allItems[i].querySelector('.faq-toggle');
                        if (toggle) {
                            toggle.textContent = '+';
                        }
                    }
                }
                
                // Toggle la pregunta actual
                if (isActive) {
                    faqItem.classList.remove('active');
                    const toggle = questionElement.querySelector('.faq-toggle');
                    if (toggle) {
                        toggle.textContent = '+';
                    }
                } else {
                    faqItem.classList.add('active');
                    const toggle = questionElement.querySelector('.faq-toggle');
                    if (toggle) {
                        toggle.textContent = '−';
                    }
                }
                
                console.log('FAQ toggled successfully');
            } catch (error) {
                console.error('Error en toggleFAQ:', error);
            }
        }

        // Función simple para buscar FAQ
        function searchFAQ() {
            try {
                const searchInput = document.getElementById('searchInput');
                if (!searchInput) return;
                
                const searchTerm = searchInput.value.toLowerCase();
                let visibleCount = 0;
                
                const allItems = document.querySelectorAll('.faq-item');
                for (let i = 0; i < allItems.length; i++) {
                    const item = allItems[i];
                    const questionText = item.querySelector('.faq-question-text');
                    const answerText = item.querySelector('.faq-answer-content');
                    const category = item.getAttribute('data-category');
                    
                    if (!questionText || !answerText) continue;
                    
                    const questionContent = questionText.textContent.toLowerCase();
                    const answerContent = answerText.textContent.toLowerCase();
                    
                    const matchesSearch = questionContent.indexOf(searchTerm) !== -1 || answerContent.indexOf(searchTerm) !== -1;
                    const matchesCategory = currentCategory === 'todas' || category === currentCategory;
                    
                    if (matchesSearch && matchesCategory) {
                        item.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('active');
                    }
                }
                
                updateResultsCount(visibleCount, searchTerm);
            } catch (error) {
                console.error('Error en searchFAQ:', error);
            }
        }

        // Función simple para filtrar por categoría
        function filterByCategory(category, buttonElement) {
            try {
                currentCategory = category;
                
                // Actualizar botones de categoría
                const allButtons = document.querySelectorAll('.category-btn');
                for (let i = 0; i < allButtons.length; i++) {
                    allButtons[i].classList.remove('active');
                }
                
                if (buttonElement) {
                    buttonElement.classList.add('active');
                }
                
                // Aplicar filtro
                searchFAQ();
                
                console.log('Filtered by category:', category);
            } catch (error) {
                console.error('Error en filterByCategory:', error);
            }
        }

        // Función simple para actualizar contador
        function updateResultsCount(count, searchTerm) {
            try {
                const resultsElement = document.getElementById('resultsCount');
                if (!resultsElement) return;
                
                if (searchTerm && searchTerm.length > 0) {
                    resultsElement.textContent = 'Se encontraron ' + count + ' resultado(s) para "' + searchTerm + '"';
                } else if (currentCategory === 'todas') {
                    resultsElement.textContent = 'Mostrando todas las preguntas disponibles';
                } else {
                    const categoryNames = {
                        'procedimientos': 'Procedimientos',
                        'documentos': 'Documentos',
                        'contacto': 'Contacto',
                        'tecnologia': 'Tecnología'
                    };
                    const categoryName = categoryNames[currentCategory] || currentCategory;
                    resultsElement.textContent = 'Mostrando ' + count + ' pregunta(s) de la categoría: ' + categoryName;
                }
            } catch (error) {
                console.error('Error en updateResultsCount:', error);
            }
        }

        // Inicialización simple
        function initFAQ() {
            try {
                console.log('FAQ System inicializado correctamente');
                updateResultsCount(8, '');
            } catch (error) {
                console.error('Error en initFAQ:', error);
            }
        }

        // Múltiples formas de inicialización para Google Sites
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initFAQ);
        } else {
            initFAQ();
        }

        // Timeout como respaldo
        setTimeout(initFAQ, 500);
        setTimeout(initFAQ, 1000);

        // Window load como último recurso
        if (window.addEventListener) {
            window.addEventListener('load', initFAQ);
        }

        // Hacer funciones disponibles globalmente para Google Sites
        window.toggleFAQ = toggleFAQ;
        window.searchFAQ = searchFAQ;
        window.filterByCategory = filterByCategory;

        console.log('FAQ Script loaded successfully');