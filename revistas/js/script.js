// ========================================
        // FUNCIONES PRINCIPALES
        // ========================================

        /**
         * Descarga una revista específica por año
         */
        function downloadRevista(year) {
            const ediciones = {
                '2022': '001',
                '2023': '002',
                '2024': '003'
            };
            
            // Mostrar vista previa antes de descargar
            showRevistaPreview(year);
        }

        /**
         * Muestra vista previa de la revista en modal
         */
        function showRevistaPreview(year) {
            const modal = document.createElement('div');
            modal.className = 'revista-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Vista Previa - Revista FECCO ${year}</h3>
                        <button class="close-modal" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="revista-preview">
                            <iframe 
                                src="about:blank" 
                                width="100%" 
                                height="600px" 
                                style="border: none; background: white;">
                                <p>Cargando vista previa...</p>
                            </iframe>
                        </div>
                        <div class="preview-message">
                            <p>📖 Vista previa de la Revista FECCO ${year}</p>
                            <p>Esta sería la vista previa del PDF. En tu implementación real, aquí cargarías el PDF usando:</p>
                            <code>src="revistas/revista-fecco-${year}.pdf"</code>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-download" onclick="downloadDirecto('${year}')">
                            📄 Descargar PDF
                        </button>
                        <button class="btn-close" onclick="closeModal()">
                            Cerrar
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Agregar estilos del modal
            addModalStyles();
            
            // Animar entrada
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }

        /**
         * Descarga directa del PDF
         */
        function downloadDirecto(year) {
            const ediciones = {
                '2022': '001',
                '2023': '002',
                '2024': '003'
            };
            
            alert(`📄 Descargando Revista FECCO ${year} - Edición N° ${ediciones[year]}`);
            
            // Aquí iría la descarga real
            // window.open(`revistas/revista-fecco-${year}.pdf`, '_blank');
            
            closeModal();
        }

        /**
         * Cierra el modal de vista previa
         */
        function closeModal() {
            const modal = document.querySelector('.revista-modal');
            if (modal) {
                modal.classList.add('hide');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        }

        /**
         * Agrega estilos CSS para el modal
         */
        function addModalStyles() {
            if (document.getElementById('modal-styles')) return;
            
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .revista-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .revista-modal.show {
                    opacity: 1;
                }
                
                .revista-modal.hide {
                    opacity: 0;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 15px;
                    width: 90%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                }
                
                .revista-modal.show .modal-content {
                    transform: scale(1);
                }
                
                .modal-header {
                    background: var(--primary-color);
                    color: white;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    font-size: 1.2em;
                }
                
                .close-modal {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }
                
                .close-modal:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .modal-body {
                    padding: 20px;
                    max-height: 60vh;
                    overflow-y: auto;
                }
                
                .preview-message {
                    text-align: center;
                    color: #666;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 10px;
                    margin-top: 15px;
                }
                
                .preview-message code {
                    background: #e9ecef;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: monospace;
                }
                
                .modal-footer {
                    background: #f8f9fa;
                    padding: 20px;
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                }
                
                .btn-download, .btn-close {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .btn-download {
                    background: var(--accent-color);
                    color: var(--primary-color);
                }
                
                .btn-download:hover {
                    background: #00ffcc;
                    transform: translateY(-2px);
                }
                
                .btn-close {
                    background: #6c757d;
                    color: white;
                }
                
                .btn-close:hover {
                    background: #5a6268;
                }
                
                @media (max-width: 600px) {
                    .modal-content {
                        width: 95%;
                        margin: 20px;
                    }
                    
                    .modal-footer {
                        flex-direction: column;
                    }
                    
                    .btn-download, .btn-close {
                        width: 100%;
                    }
                }
            `;
            
            document.head.appendChild(styles);
        }

        /**
         * Abre formularios o documentos de pautas
         */
        function openForm(formType) {
            switch(formType) {
                case 'pautas-academicos':
                    alert('📋 Abriendo: Pautas de presentación de artículos académicos\n\nAquí encontrarás las directrices para enviar artículos académicos a nuestra revista especializada.');
                    // window.open('formularios/pautas-articulos-academicos.pdf', '_blank');
                    break;
                case 'pautas-reportes':
                    alert('📊 Abriendo: Pautas para la presentación de reportes\n\nConsulta los lineamientos para la presentación de reportes especializados.');
                    // window.open('formularios/pautas-reportes.pdf', '_blank');
                    break;
                default:
                    alert('📄 Documento no encontrado');
            }
        }

        /**
         * Efectos adicionales al cargar la página
         */
        function initializeEffects() {
            // Efecto de parallax suave en las tarjetas
            const cards = document.querySelectorAll('.revista-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        }

        // ========================================
        // INICIALIZACIÓN
        // ========================================

        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Sección de Revistas FECCO cargada correctamente');
            
            // Inicializar efectos visuales
            initializeEffects();
            
            // Mostrar mensaje de bienvenida
            setTimeout(() => {
                console.log('📚 Revistas disponibles: 2022, 2023, 2024');
            }, 1000);
        });

        // Manejar redimensionamiento de ventana
        window.addEventListener('resize', function() {
            console.log('📱 Ajustando diseño responsivo...');
        });