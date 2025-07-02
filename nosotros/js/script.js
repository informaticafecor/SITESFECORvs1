// ===== CARRUSELES - VERSIÓN ROBUSTA CON MANEJO DE ERRORES =====
(function() {
    'use strict';
    
    console.log('🚀 Iniciando carruseles FECOR...');

    const carousels = {
        'superior-carousel': {
            currentSlide: 0,
            totalSlides: 0,
            autoPlay: true,
            interval: null
        },
        'supraprovinciales-carousel': {
            currentSlide: 0,
            totalSlides: 0,
            autoPlay: true,
            interval: null
        },
        'peritaje-carousel': {
            currentSlide: 0,
            totalSlides: 0,
            autoPlay: true,
            interval: null
        },
        'provincias-carousel': {
            currentSlide: 0,
            totalSlides: 0,
            autoPlay: true,
            interval: null
        }
    };

    // Función para cambiar slides - PROTEGIDA
    function changeSlide(carouselId, direction) {
        try {
            const carousel = carousels[carouselId];
            if (!carousel) {
                console.warn(`⚠️ Carrusel ${carouselId} no encontrado`);
                return;
            }

            const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
            if (slides.length === 0) {
                console.warn(`⚠️ No hay slides en ${carouselId}`);
                return;
            }

            // Solo cambiar si hay más de 1 slide
            if (carousel.totalSlides <= 1) return;

            // Remover clase active del slide actual
            if (slides[carousel.currentSlide]) {
                slides[carousel.currentSlide].classList.remove('active');
            }

            // Calcular nuevo slide
            carousel.currentSlide += direction;

            // Manejar el loop
            if (carousel.currentSlide >= carousel.totalSlides) {
                carousel.currentSlide = 0;
            } else if (carousel.currentSlide < 0) {
                carousel.currentSlide = carousel.totalSlides - 1;
            }

            // Activar nuevo slide
            if (slides[carousel.currentSlide]) {
                slides[carousel.currentSlide].classList.add('active');
                console.log(`🔄 ${carouselId}: Slide ${carousel.currentSlide + 1}/${carousel.totalSlides}`);
            }

            // Actualizar dots
            updateDots(carouselId);

            // Reiniciar autoplay si está activo
            if (carousel.autoPlay) {
                stopAutoPlay(carouselId);
                setTimeout(() => startAutoPlay(carouselId), 100);
            }

        } catch (error) {
            console.error(`❌ Error en changeSlide para ${carouselId}:`, error);
        }
    }

    // Función para ir a un slide específico - PROTEGIDA
    function goToSlide(carouselId, slideIndex) {
        try {
            const carousel = carousels[carouselId];
            if (!carousel) return;

            const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
            if (slides.length === 0) return;

            if (carousel.totalSlides <= 1) return;

            // Remover clase active del slide actual
            if (slides[carousel.currentSlide]) {
                slides[carousel.currentSlide].classList.remove('active');
            }

            // Ir al slide específico
            carousel.currentSlide = slideIndex;

            // Activar nuevo slide
            if (slides[carousel.currentSlide]) {
                slides[carousel.currentSlide].classList.add('active');
            }

            // Actualizar dots
            updateDots(carouselId);

            // Reiniciar autoplay si está activo
            if (carousel.autoPlay) {
                stopAutoPlay(carouselId);
                setTimeout(() => startAutoPlay(carouselId), 100);
            }

        } catch (error) {
            console.error(`❌ Error en goToSlide para ${carouselId}:`, error);
        }
    }

    // Función para actualizar los dots - PROTEGIDA
    function updateDots(carouselId) {
        try {
            const carousel = carousels[carouselId];
            if (!carousel) return;

            const dotsContainer = document.getElementById(`${carouselId.replace('-carousel', '-dots')}`);
            if (!dotsContainer) return;

            const dots = dotsContainer.querySelectorAll('.dot');
            
            dots.forEach((dot, index) => {
                if (index === carousel.currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

        } catch (error) {
            console.error(`❌ Error en updateDots para ${carouselId}:`, error);
        }
    }

    // Función para crear dots - PROTEGIDA
    function createDots(carouselId) {
        try {
            const carousel = carousels[carouselId];
            if (!carousel) return;

            const dotsContainer = document.getElementById(`${carouselId.replace('-carousel', '-dots')}`);
            if (!dotsContainer) {
                console.warn(`⚠️ No se encontró contenedor de dots para ${carouselId}`);
                return;
            }

            // Limpiar dots existentes
            dotsContainer.innerHTML = '';

            // Solo crear dots si hay más de 1 slide
            if (carousel.totalSlides > 1) {
                console.log(`🔘 Creando ${carousel.totalSlides} dots para ${carouselId}`);

                for (let i = 0; i < carousel.totalSlides; i++) {
                    const dot = document.createElement('span');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');

                    // Event listener protegido
                    dot.addEventListener('click', (e) => {
                        e.preventDefault();
                        goToSlide(carouselId, i);
                    });

                    // Accesibilidad
                    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
                    dot.setAttribute('role', 'button');
                    dot.setAttribute('tabindex', '0');

                    // Permitir navegación con Enter y Espacio
                    dot.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            goToSlide(carouselId, i);
                        }
                    });

                    dotsContainer.appendChild(dot);
                }
            }

        } catch (error) {
            console.error(`❌ Error en createDots para ${carouselId}:`, error);
        }
    }

    // Función para iniciar autoplay - PROTEGIDA
    function startAutoPlay(carouselId) {
        try {
            const carousel = carousels[carouselId];
            if (!carousel || !carousel.autoPlay || carousel.totalSlides <= 1) {
                return;
            }

            // Limpiar intervalo anterior si existe
            if (carousel.interval) {
                clearInterval(carousel.interval);
            }

            console.log(`▶️ Iniciando autoplay para ${carouselId}`);
            carousel.interval = setInterval(() => {
                changeSlide(carouselId, 1);
            }, 5000);

        } catch (error) {
            console.error(`❌ Error en startAutoPlay para ${carouselId}:`, error);
        }
    }

    // Función para detener autoplay - PROTEGIDA
    function stopAutoPlay(carouselId) {
        try {
            const carousel = carousels[carouselId];
            if (carousel && carousel.interval) {
                clearInterval(carousel.interval);
                carousel.interval = null;
            }
        } catch (error) {
            console.error(`❌ Error en stopAutoPlay para ${carouselId}:`, error);
        }
    }

    // Función para pausar autoplay al hacer hover - PROTEGIDA
    function pauseOnHover(carouselId) {
        try {
            const carouselElement = document.getElementById(carouselId);
            if (!carouselElement) return;

            carouselElement.addEventListener('mouseenter', () => {
                stopAutoPlay(carouselId);
            });

            carouselElement.addEventListener('mouseleave', () => {
                setTimeout(() => startAutoPlay(carouselId), 500);
            });

        } catch (error) {
            console.error(`❌ Error en pauseOnHover para ${carouselId}:`, error);
        }
    }

    // Función para detectar slides - PROTEGIDA Y MEJORADA
    function detectSlides(carouselId) {
        try {
            const carousel = carousels[carouselId];
            if (!carousel) return 0;

            const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
            carousel.totalSlides = slides.length;
            
            console.log(`🔍 ${carouselId}: ${slides.length} slides detectados`);
            
            return slides.length;

        } catch (error) {
            console.error(`❌ Error en detectSlides para ${carouselId}:`, error);
            return 0;
        }
    }

    // Función para resetear slides activos - PROTEGIDA
    function resetActiveSlides(carouselId) {
        try {
            const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);

            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Resetear currentSlide
            if (carousels[carouselId]) {
                carousels[carouselId].currentSlide = 0;
            }

        } catch (error) {
            console.error(`❌ Error en resetActiveSlides para ${carouselId}:`, error);
        }
    }

    // Función de inicialización - ULTRA ROBUSTA
    function initCarousels() {
        try {
            console.log('🎠 Inicializando carruseles...');

            // Configurar cada carrusel
            Object.keys(carousels).forEach(carouselId => {
                try {
                    console.log(`🔧 Configurando: ${carouselId}`);

                    // Verificar que el carrusel existe
                    const carouselElement = document.getElementById(carouselId);
                    if (!carouselElement) {
                        console.warn(`⚠️ ${carouselId} no encontrado en DOM`);
                        return;
                    }

                    // Detectar slides
                    const slideCount = detectSlides(carouselId);
                    if (slideCount === 0) {
                        console.warn(`⚠️ ${carouselId}: Sin slides`);
                        return;
                    }

                    // Resetear slides activos
                    resetActiveSlides(carouselId);

                    // Crear dots
                    createDots(carouselId);

                    // Configurar hover
                    pauseOnHover(carouselId);

                    // Agregar event listeners a botones de navegación
                    setupNavigationButtons(carouselId);

                    // Iniciar autoplay con delay
                    if (slideCount > 1) {
                        setTimeout(() => {
                            startAutoPlay(carouselId);
                        }, 1000 + Math.random() * 1000); // Delay aleatorio para evitar conflictos
                    }

                    console.log(`✅ ${carouselId} configurado (${slideCount} slides)`);

                } catch (error) {
                    console.error(`❌ Error configurando ${carouselId}:`, error);
                }
            });

            console.log('🎉 Inicialización completada');

        } catch (error) {
            console.error('❌ Error fatal en initCarousels:', error);
        }
    }

    // Función para configurar botones de navegación - NUEVA
    function setupNavigationButtons(carouselId) {
        try {
            const prevBtn = document.querySelector(`#${carouselId} ~ .carousel-nav .prev-btn`);
            const nextBtn = document.querySelector(`#${carouselId} ~ .carousel-nav .next-btn`);
            
            // También buscar dentro del contenedor
            const container = document.getElementById(carouselId).parentElement;
            const prevBtn2 = container.querySelector('.prev-btn');
            const nextBtn2 = container.querySelector('.next-btn');

            const actualPrevBtn = prevBtn || prevBtn2;
            const actualNextBtn = nextBtn || nextBtn2;

            if (actualPrevBtn) {
                actualPrevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    changeSlide(carouselId, -1);
                });
            }

            if (actualNextBtn) {
                actualNextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    changeSlide(carouselId, 1);
                });
            }

        } catch (error) {
            console.error(`❌ Error en setupNavigationButtons para ${carouselId}:`, error);
        }
    }

    // Hacer funciones globales para que funcionen desde el HTML
    window.changeSlide = changeSlide;
    window.goToSlide = goToSlide;

    // ===== FUNCIONES DEL MODAL - SIMPLIFICADAS =====
    let currentZoom = 1;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let imageOffsetX = 0;
    let imageOffsetY = 0;

    window.openImageModal = function(imgElement, title) {
        try {
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            
            if (!modal || !modalImage || !modalTitle) {
                console.error('❌ Elementos del modal no encontrados');
                return;
            }

            modal.classList.add('show');
            modalTitle.textContent = title || 'Imagen';
            
            currentZoom = 1;
            imageOffsetX = 0;
            imageOffsetY = 0;
            
            modalImage.src = imgElement.src;
            modalImage.style.transform = 'scale(1) translate(0px, 0px)';
            
            document.body.style.overflow = 'hidden';
            
            console.log('🖼️ Modal abierto:', title);

        } catch (error) {
            console.error('❌ Error abriendo modal:', error);
        }
    };

    window.closeImageModal = function(event) {
        try {
            if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-modal')) {
                return;
            }
            
            const modal = document.getElementById('imageModal');
            if (modal) {
                modal.classList.remove('show');
            }
            
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                currentZoom = 1;
                imageOffsetX = 0;
                imageOffsetY = 0;
            }, 300);

        } catch (error) {
            console.error('❌ Error cerrando modal:', error);
        }
    };

    window.zoomImage = function(delta) {
        try {
            currentZoom = Math.max(0.2, Math.min(3, currentZoom + delta));
            const modalImage = document.getElementById('modalImage');
            if (modalImage) {
                modalImage.style.transform = `scale(${currentZoom}) translate(${imageOffsetX}px, ${imageOffsetY}px)`;
            }
            
            const zoomInfo = document.getElementById('zoomInfo');
            if (zoomInfo) {
                zoomInfo.textContent = Math.round(currentZoom * 100) + '%';
            }
        } catch (error) {
            console.error('❌ Error en zoom:', error);
        }
    };

    window.resetZoom = function() {
        try {
            currentZoom = 1;
            imageOffsetX = 0;
            imageOffsetY = 0;
            
            const modalImage = document.getElementById('modalImage');
            if (modalImage) {
                modalImage.style.transform = 'scale(1) translate(0px, 0px)';
            }
            
            const zoomInfo = document.getElementById('zoomInfo');
            if (zoomInfo) {
                zoomInfo.textContent = '100%';
            }
        } catch (error) {
            console.error('❌ Error en resetZoom:', error);
        }
    };

    // ===== INICIALIZACIÓN PRINCIPAL =====
    function initialize() {
        try {
            console.log('🚀 Iniciando aplicación FECOR...');
            
            // Esperar a que todo esté cargado
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(initCarousels, 1000);
                });
            } else {
                setTimeout(initCarousels, 1000);
            }

            // Eventos de teclado para modal
            document.addEventListener('keydown', function(e) {
                try {
                    if (e.key === 'Escape') {
                        window.closeImageModal();
                    }
                } catch (error) {
                    console.error('❌ Error en evento de teclado:', error);
                }
            });

        } catch (error) {
            console.error('❌ Error fatal en initialize:', error);
        }
    }

    // Función de debugging
    window.debugCarousels = function() {
        console.log('\n🔍 ESTADO DE CARRUSELES:');
        Object.keys(carousels).forEach(carouselId => {
            const carousel = carousels[carouselId];
            const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
            console.log(`${carouselId}: ${carousel.totalSlides} configurados, ${slides.length} en DOM`);
        });
    };

    // Inicializar todo
    initialize();

})();