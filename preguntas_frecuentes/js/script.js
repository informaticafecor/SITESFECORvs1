 // ========================================
        // BASE DE DATOS DE PREGUNTAS Y RESPUESTAS
        // ========================================

        const FAQ_DATA = {
            // 📋 CATEGORÍA: PROCEDIMIENTOS
            procedimientos: {
                name: "Procedimientos",
                icon: "⚖️",
                questions: [
                    {
                        question: "¿Cuál es el procedimiento para presentar una denuncia sobre crimen organizado?",
                        icon: "⚖️",
                        answer: `
                            <h4>Procedimiento de Denuncia:</h4>
                            <p>Para presentar una denuncia sobre crimen organizado, debe seguir estos pasos:</p>
                            <ul>
                                <li>Acudir personalmente a las oficinas de FECCO o a cualquier fiscalía</li>
                                <li>Presentar su documento de identidad vigente</li>
                                <li>Proporcionar información detallada sobre los hechos</li>
                                <li>Aportar evidencias disponibles (documentos, fotografías, etc.)</li>
                                <li>Recibir el número de expediente para seguimiento</li>
                            </ul>
                            <p><strong>Importante:</strong> Todas las denuncias son tratadas con confidencialidad y seriedad.</p>
                        `
                    },
                    {
                        question: "¿Cuánto tiempo toma el procesamiento de una investigación?",
                        icon: "🕐",
                        answer: `
                            <h4>Tiempos de Investigación:</h4>
                            <p>Los tiempos varían según la complejidad del caso:</p>
                            <ul>
                                <li><strong>Investigación Preliminar:</strong> Hasta 60 días (prorrogable)</li>
                                <li><strong>Investigación Preparatoria:</strong> Hasta 8 meses (casos complejos hasta 36 meses)</li>
                                <li><strong>Casos de Crimen Organizado:</strong> Plazos especiales según complejidad</li>
                            </ul>
                            <p><strong>Factores que influyen:</strong> Complejidad del caso, número de investigados, evidencias disponibles, cooperación de testigos.</p>
                        `
                    }
                ]
            },

            // 📄 CATEGORÍA: DOCUMENTOS
            documentos: {
                name: "Documentos",
                icon: "📄",
                questions: [
                    {
                        question: "¿Qué documentos necesito para solicitar información sobre un caso?",
                        icon: "📋",
                        answer: `
                            <h4>Documentos Requeridos:</h4>
                            <ul>
                                <li>Documento Nacional de Identidad (DNI) vigente</li>
                                <li>Solicitud formal dirigida al Fiscal a cargo</li>
                                <li>Acreditación del interés legítimo en el caso</li>
                                <li>Poder notarial (si actúa en representación de terceros)</li>
                            </ul>
                            <p><strong>Nota:</strong> La información se proporcionará según las normas de confidencialidad y las etapas procesales del caso.</p>
                        `
                    },
                    {
                        question: "¿Cómo obtengo una copia certificada de un documento del expediente?",
                        icon: "📜",
                        answer: `
                            <h4>Procedimiento para Copias Certificadas:</h4>
                            <ul>
                                <li>Presentar solicitud escrita con firma legalizara</li>
                                <li>Adjuntar DNI vigente y tasa judicial correspondiente</li>
                                <li>Especificar claramente los documentos solicitados</li>
                                <li>Tiempo de entrega: 3 a 5 días hábiles</li>
                            </ul>
                            <p><strong>Costo:</strong> Según tabulador de tasas judiciales vigente.</p>
                        `
                    }
                ]
            },

            // 📞 CATEGORÍA: CONTACTO
            contacto: {
                name: "Contacto",
                icon: "📞",
                questions: [
                    {
                        question: "¿Cuáles son los horarios de atención y medios de contacto?",
                        icon: "🕒",
                        answer: `
                            <h4>Información de Contacto:</h4>
                            <p><strong>Horarios de Atención:</strong></p>
                            <ul>
                                <li>Lunes a Viernes: 8:00 AM - 5:00 PM</li>
                                <li>Atención de emergencias: 24 horas</li>
                            </ul>
                            <p><strong>Medios de Contacto:</strong></p>
                            <ul>
                                <li>Teléfono Central: (01) 625-5555</li>
                                <li>Línea gratuita: 0800-00-205</li>
                                <li>Correo: consultas@mpfn.gob.pe</li>
                                <li>Mesa de partes virtual disponible 24/7</li>
                            </ul>
                        `
                    },
                    {
                        question: "¿Puedo agendar una cita para consulta presencial?",
                        icon: "📅",
                        answer: `
                            <h4>Sistema de Citas:</h4>
                            <p><strong>Modalidades disponibles:</strong></p>
                            <ul>
                                <li>Citas presenciales: Lunes a Viernes 9:00 AM - 4:00 PM</li>
                                <li>Consultas virtuales: Disponibles previa coordinación</li>
                                <li>Atención de urgencia: Sin cita previa</li>
                            </ul>
                            <p><strong>Para agendar:</strong> Llamar al (01) 625-5555 o través del portal web institucional.</p>
                        `
                    }
                ]
            },

            // 💻 CATEGORÍA: TECNOLOGÍA
            tecnologia: {
                name: "Tecnología",
                icon: "💻",
                questions: [
                    {
                        question: "¿Cómo puedo acceder a los servicios digitales de FECCO?",
                        icon: "🌐",
                        answer: `
                            <h4>Servicios Digitales Disponibles:</h4>
                            <ul>
                                <li>Portal web institucional: www.mpfn.gob.pe</li>
                                <li>Mesa de partes virtual para presentación de documentos</li>
                                <li>Consulta de estado de expedientes en línea</li>
                                <li>Descarga de formularios y documentos oficiales</li>
                                <li>Citas virtuales para consultas especializadas</li>
                            </ul>
                            <p><strong>Requisitos:</strong> Registro previo con DNI y correo electrónico válido.</p>
                        `
                    },
                    {
                        question: "¿Qué hacer si tengo problemas técnicos con la plataforma digital?",
                        icon: "🔧",
                        answer: `
                            <h4>Soporte Técnico:</h4>
                            <p><strong>Canales de soporte:</strong></p>
                            <ul>
                                <li>Mesa de ayuda: soporte@mpfn.gob.pe</li>
                                <li>Chat en línea: Disponible en horario de oficina</li>
                                <li>Teléfono directo: Anexo 1133B</li>
                                <li>Guías y tutoriales disponibles en el portal</li>
                            </ul>
                            <p><strong>Tiempo de respuesta:</strong> Máximo 24 horas en días hábiles.</p>
                        `
                    }
                ]
            }
        };

        // ========================================
        // VARIABLES GLOBALES
        // ========================================

        let currentCategory = 'todas';
        let allQuestions = [];

        // ========================================
        // FUNCIONES PRINCIPALES
        // ========================================

        /**
         * Inicializa la aplicación FAQ
         */
        function initializeFAQ() {
            generateCategories();
            generateQuestions();
            updateStatistics();
            console.log('✅ FAQ System initialized successfully');
        }

        /**
         * Genera los botones de categorías dinámicamente
         */
        function generateCategories() {
            const categoriesContainer = document.getElementById('categoriesFilter');
            let html = `
                <button class="category-btn active" onclick="filterByCategory('todas')">
                    📋 Todas
                </button>
            `;

            Object.keys(FAQ_DATA).forEach(categoryKey => {
                const category = FAQ_DATA[categoryKey];
                html += `
                    <button class="category-btn" onclick="filterByCategory('${categoryKey}')">
                        ${category.icon} ${category.name}
                    </button>
                `;
            });

            categoriesContainer.innerHTML = html;
        }

        /**
         * Genera todas las preguntas dinámicamente
         */
        function generateQuestions() {
            const faqContainer = document.getElementById('faqContainer');
            let html = '';
            allQuestions = [];

            Object.keys(FAQ_DATA).forEach(categoryKey => {
                const category = FAQ_DATA[categoryKey];
                
                category.questions.forEach((item, index) => {
                    const questionId = `faq-${categoryKey}-${index}`;
                    allQuestions.push({
                        id: questionId,
                        category: categoryKey,
                        question: item.question,
                        answer: item.answer
                    });

                    html += `
                        <div class="faq-item" data-category="${categoryKey}" id="${questionId}">
                            <div class="faq-question" onclick="toggleFAQ(this)">
                                <div class="faq-icon">${item.icon}</div>
                                <div class="faq-question-text">${item.question}</div>
                                <div class="faq-toggle">+</div>
                            </div>
                            <div class="faq-answer">
                                <div class="faq-answer-content">${item.answer}</div>
                            </div>
                        </div>
                    `;
                });
            });

            faqContainer.innerHTML = html;
        }

        /**
         * Actualiza las estadísticas
         */
        function updateStatistics() {
            const totalQuestions = allQuestions.length;
            const totalCategories = Object.keys(FAQ_DATA).length;
            
            document.getElementById('totalQuestions').textContent = totalQuestions;
            document.getElementById('totalCategories').textContent = totalCategories;
        }

        /**
         * Alterna la visibilidad de una pregunta FAQ
         */
        function toggleFAQ(questionElement) {
            const faqItem = questionElement.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todas las otras preguntas
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Alternar la pregunta actual
            faqItem.classList.toggle('active', !isActive);
            
            // Animación del ícono
            const toggle = questionElement.querySelector('.faq-toggle');
            toggle.style.transform = isActive ? 'rotate(0deg)' : 'rotate(45deg)';
            
            // Analytics (opcional)
            if (!isActive) {
                console.log('📊 FAQ opened:', questionElement.querySelector('.faq-question-text').textContent.substring(0, 50) + '...');
            }
        }

        /**
         * Busca preguntas por texto
         */
        function searchFAQ() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            let visibleCount = 0;
            
            document.querySelectorAll('.faq-item').forEach(item => {
                const questionText = item.querySelector('.faq-question-text').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer-content').textContent.toLowerCase();
                const category = item.dataset.category;
                
                const matchesSearch = questionText.includes(searchTerm) || answerText.includes(searchTerm);
                const matchesCategory = currentCategory === 'todas' || category === currentCategory;
                
                if (matchesSearch && matchesCategory) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('active'); // Cerrar si está abierta
                }
            });
            
            updateResultsCount(visibleCount, searchTerm);
        }

        /**
         * Filtra preguntas por categoría
         */
        function filterByCategory(category) {
            currentCategory = category;
            
            // Actualizar botones de categoría
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Aplicar filtro
            searchFAQ();
            
            console.log('🔍 Filtered by category:', category);
        }

        /**
         * Actualiza el contador de resultados
         */
        function updateResultsCount(count, searchTerm) {
            const resultsElement = document.getElementById('resultsCount');
            
            if (searchTerm) {
                resultsElement.textContent = `Se encontraron ${count} resultado(s) para "${searchTerm}"`;
            } else if (currentCategory === 'todas') {
                resultsElement.textContent = 'Mostrando todas las preguntas disponibles';
            } else {
                const categoryName = FAQ_DATA[currentCategory]?.name || currentCategory;
                resultsElement.textContent = `Mostrando ${count} pregunta(s) de la categoría: ${categoryName}`;
            }
        }

        /**
         * Funciones auxiliares para agregar nuevas preguntas
         */
        function addNewQuestion(categoryKey, questionData) {
            if (!FAQ_DATA[categoryKey]) {
                console.error('❌ Categoría no existe:', categoryKey);
                return false;
            }
            
            FAQ_DATA[categoryKey].questions.push(questionData);
            console.log('✅ Nueva pregunta agregada a', categoryKey);
            
            // Regenerar preguntas
            generateQuestions();
            updateStatistics();
            return true;
        }

        function addNewCategory(categoryKey, categoryData) {
            FAQ_DATA[categoryKey] = {
                name: categoryData.name,
                icon: categoryData.icon,
                questions: categoryData.questions || []
            };
            
            console.log('✅ Nueva categoría agregada:', categoryKey);
            
            // Regenerar todo
            generateCategories();
            generateQuestions();
            updateStatistics();
            return true;
        }

        // ========================================
        // INICIALIZACIÓN AL CARGAR LA PÁGINA
        // ========================================

        document.addEventListener('DOMContentLoaded', function() {
            initializeFAQ();
            
            // Mensaje de bienvenida
            setTimeout(() => {
                console.log('📚 FAQ System ready! Total questions:', allQuestions.length);
                console.log('📋 Available categories:', Object.keys(FAQ_DATA));
            }, 500);
        });

        // ========================================
        // FUNCIONES HELPER PARA DESARROLLADORES
        // ========================================

        /**
         * Ejemplo de cómo agregar una nueva pregunta:
         * 
         * addNewQuestion('procedimientos', {
         *     question: "¿Puedo presentar una denuncia anónima?",
         *     icon: "🕵️",
         *     answer: `
         *         <h4>Denuncias Anónimas:</h4>
         *         <p>Sí, es posible presentar denuncias anónimas siguiendo estos lineamientos:</p>
         *         <ul>
         *             <li>A través del portal web con formulario especializado</li>
         *             <li>Llamada telefónica a la línea confidencial</li>
         *             <li>Buzón físico en las instalaciones</li>
         *         </ul>
         *         <p><strong>Nota:</strong> Las denuncias anónimas deben contener información suficiente para iniciar la investigación.</p>
         *     `
         * });
         * 
         * Ejemplo de cómo agregar una nueva categoría:
         * 
         * addNewCategory('capacitacion', {
         *     name: "Capacitación",
         *     icon: "🎓",
         *     questions: [
         *         {
         *             question: "¿Ofrecen cursos de capacitación al público?",
         *             icon: "📚",
         *             answer: "Contenido de la respuesta..."
         *         }
         *     ]
         * });
         */

        // Función para desarrolladores - ver estructura de datos
        function showFAQData() {
            console.log('📊 FAQ Data Structure:', FAQ_DATA);
            return FAQ_DATA;
        }

        // Función para desarrolladores - exportar datos
        function exportFAQData() {
            const dataStr = JSON.stringify(FAQ_DATA, null, 2);
            console.log('💾 FAQ Data (JSON):', dataStr);
            return dataStr;
        }



  /* SCRIPT DEL MNENU*/

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