// Estado de los carruseles - SOLO LOS QUE TIENEN CARRUSEL
const carousels = {
    'superior-carousel': {
        currentSlide: 0,
        totalSlides: 4, // Coordinadora + 3 Fiscalías
        autoPlay: true,
        interval: null
    },
    'supraprovinciales-carousel': {
        currentSlide: 0,
        totalSlides: 5, // Intro + 4 equipos
        autoPlay: true,
        interval: null
    },
    'peritaje-carousel': {
        currentSlide: 0,
        totalSlides: 1, // Solo 1 slide
        autoPlay: false,
        interval: null,
    },

    'provincias-carousel': {
        currentSlide: 0,
        totalSlides: 5, // Intro + 4 equipos
        autoPlay: true,
        interval: null
    },
    
};

// Función para cambiar slides
function changeSlide(carouselId, direction) {
    const carousel = carousels[carouselId];
    const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
    
    if (!carousel || slides.length === 0) {
        console.warn(`Carrusel ${carouselId} no encontrado o sin slides`);
        return;
    }
    
    // Solo funcionar si hay más de 1 slide
    if (carousel.totalSlides <= 1) return;
    
    // Remover clase active del slide actual
    slides[carousel.currentSlide].classList.remove('active');
    
    // Calcular nuevo slide
    carousel.currentSlide += direction;
    
    // Manejar el loop
    if (carousel.currentSlide >= carousel.totalSlides) {
        carousel.currentSlide = 0;
    } else if (carousel.currentSlide < 0) {
        carousel.currentSlide = carousel.totalSlides - 1;
    }
    
    // Activar nuevo slide
    slides[carousel.currentSlide].classList.add('active');
    
    // Actualizar dots
    updateDots(carouselId);
    
    // Reiniciar autoplay si está activo
    if (carousel.autoPlay) {
        stopAutoPlay(carouselId);
        startAutoPlay(carouselId);
    }
}

// Función para ir a un slide específico
function goToSlide(carouselId, slideIndex) {
    const carousel = carousels[carouselId];
    const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
    
    if (!carousel || slides.length === 0) {
        return;
    }
    
    // Solo funcionar si hay más de 1 slide
    if (carousel.totalSlides <= 1) return;
    
    // Remover clase active del slide actual
    slides[carousel.currentSlide].classList.remove('active');
    
    // Ir al slide específico
    carousel.currentSlide = slideIndex;
    
    // Activar nuevo slide
    slides[carousel.currentSlide].classList.add('active');
    
    // Actualizar dots
    updateDots(carouselId);
    
    // Reiniciar autoplay si está activo
    if (carousel.autoPlay) {
        stopAutoPlay(carouselId);
        startAutoPlay(carouselId);
    }
}

// Función para actualizar los dots
function updateDots(carouselId) {
    const carousel = carousels[carouselId];
    const dotsContainer = document.getElementById(`${carouselId.replace('-carousel', '-dots')}`);
    
    if (!dotsContainer || !carousel) return;
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        if (index === carousel.currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Función para crear dots
function createDots(carouselId) {
    const carousel = carousels[carouselId];
    const dotsContainer = document.getElementById(`${carouselId.replace('-carousel', '-dots')}`);
    
    if (!dotsContainer || !carousel) return;
    
    // Limpiar dots existentes
    dotsContainer.innerHTML = '';
    
    // Solo crear dots si hay más de 1 slide
    if (carousel.totalSlides > 1) {
        for (let i = 0; i < carousel.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(carouselId, i));
            
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
}

// Función para iniciar autoplay
function startAutoPlay(carouselId) {
    const carousel = carousels[carouselId];
    if (carousel && carousel.autoPlay && carousel.totalSlides > 1) {
        carousel.interval = setInterval(() => {
            changeSlide(carouselId, 1);
        }, 7000); // Cambiar cada 7 segundos (más tiempo para leer)
    }
}

// Función para detener autoplay
function stopAutoPlay(carouselId) {
    const carousel = carousels[carouselId];
    if (carousel && carousel.interval) {
        clearInterval(carousel.interval);
        carousel.interval = null;
    }
}

// Función para pausar autoplay al hacer hover
function pauseOnHover(carouselId) {
    const carouselElement = document.getElementById(carouselId);
    
    if (!carouselElement) return;
    
    carouselElement.addEventListener('mouseenter', () => {
        stopAutoPlay(carouselId);
    });
    
    carouselElement.addEventListener('mouseleave', () => {
        startAutoPlay(carouselId);
    });
}

// Función para añadir soporte touch/swipe
function addTouchSupport(carouselId) {
    const carouselElement = document.getElementById(carouselId);
    if (!carouselElement) return;
    
    let startX = 0;
    let endX = 0;
    
    carouselElement.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    carouselElement.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe(carouselId);
    }, { passive: true });
    
    function handleSwipe(carouselId) {
        const threshold = 60; // Mínima distancia para considerar swipe
        const difference = startX - endX;
        
        if (Math.abs(difference) > threshold) {
            if (difference > 0) {
                // Swipe izquierda - siguiente slide
                changeSlide(carouselId, 1);
            } else {
                // Swipe derecha - slide anterior
                changeSlide(carouselId, -1);
            }
        }
    }
}

// Función para detectar el número real de slides
function detectSlides(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
    if (carousels[carouselId]) {
        carousels[carouselId].totalSlides = slides.length;
    }
}

// Función para mejorar la accesibilidad
function addAccessibilityFeatures() {
    // Agregar roles ARIA
    const carouselsElements = document.querySelectorAll('.carousel');
    carouselsElements.forEach(carousel => {
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-label', 'Carrusel de contenido');
    });
    
    // Agregar labels a los botones
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    
    prevBtns.forEach(btn => {
        btn.setAttribute('aria-label', 'Slide anterior');
        btn.setAttribute('tabindex', '0');
    });
    
    nextBtns.forEach(btn => {
        btn.setAttribute('aria-label', 'Siguiente slide');
        btn.setAttribute('tabindex', '0');
    });
}

// Función para optimizar rendimiento
function optimizePerformance() {
    // Usar requestAnimationFrame para animaciones suaves
    const slides = document.querySelectorAll('.carousel-slide');
    
    slides.forEach(slide => {
        slide.style.willChange = 'transform, opacity';
    });
    
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Función para igualar alturas de contenedores
function equalizeHeights() {
    // Solo en desktop
    if (window.innerWidth > 768) {
        const columns = document.querySelectorAll('.column-1, .column-2');
        
        columns.forEach(column => {
            const sections = column.querySelectorAll('section');
            let maxHeight = 0;
            
            // Resetear alturas
            sections.forEach(section => {
                section.style.height = 'auto';
            });
            
            // Encontrar la altura máxima
            sections.forEach(section => {
                const height = section.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });
            
            // Aplicar altura máxima a todas las secciones de la columna
            sections.forEach(section => {
                section.style.height = maxHeight + 'px';
            });
        });
    } else {
        // En móvil, resetear alturas
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.height = 'auto';
        });
    }
}

// Función de inicialización
function initCarousels() {
    // Detectar slides reales y configurar cada carrusel
    Object.keys(carousels).forEach(carouselId => {
        // Detectar número real de slides
        detectSlides(carouselId);
        
        // Crear dots
        createDots(carouselId);
        
        // Configurar autoplay solo si hay más de 1 slide
        if (carousels[carouselId].totalSlides > 1) {
            startAutoPlay(carouselId);
            pauseOnHover(carouselId);
        }
        
        // Asegurar que el primer slide esté activo
        const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Agregar soporte touch
        addTouchSupport(carouselId);
    });
    
    // Igualar alturas después de cargar
    setTimeout(equalizeHeights, 100);
}

// Función para manejar el responsive
function handleResize() {
    // Pausar todos los autoplay durante el resize
    Object.keys(carousels).forEach(carouselId => {
        stopAutoPlay(carouselId);
    });
    
    // Igualar alturas
    equalizeHeights();
    
    // Reiniciar después de un breve delay
    setTimeout(() => {
        Object.keys(carousels).forEach(carouselId => {
            if (carousels[carouselId].autoPlay && carousels[carouselId].totalSlides > 1) {
                startAutoPlay(carouselId);
            }
        });
    }, 300);
}

// Función para debugging (solo en desarrollo)
function debugCarousels() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎠 Carruseles activos:', Object.keys(carousels));
        
        // Agregar información de debug
        Object.keys(carousels).forEach(carouselId => {
            const carousel = carousels[carouselId];
            console.log(`📊 ${carouselId}:`, {
                currentSlide: carousel.currentSlide,
                totalSlides: carousel.totalSlides,
                autoPlay: carousel.autoPlay,
                hasMultipleSlides: carousel.totalSlides > 1
            });
        });
    }
}

// Inicialización completa al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carruseles
    initCarousels();
    
    // Mejorar accesibilidad
    addAccessibilityFeatures();
    
    // Optimizar rendimiento
    optimizePerformance();
    
    // Debug en desarrollo
    debugCarousels();
    
    // Manejar resize con debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 300);
    });
    
    // Pausar autoplay cuando la pestaña no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            Object.keys(carousels).forEach(carouselId => {
                stopAutoPlay(carouselId);
            });
        } else {
            Object.keys(carousels).forEach(carouselId => {
                if (carousels[carouselId].autoPlay && carousels[carouselId].totalSlides > 1) {
                    startAutoPlay(carouselId);
                }
            });
        }
    });
    
    // Control de teclado
    document.addEventListener('keydown', function(e) {
        // Solo aplicar si no estamos en un campo de entrada
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === 'ArrowLeft') {
                changeSlide('superior-carousel', -1);
            } else if (e.key === 'ArrowRight') {
                changeSlide('superior-carousel', 1);
            }
        }
    });
    
    // Animación de entrada para las secciones
    const sections = document.querySelectorAll('section');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });
    }
    
    // Igualar alturas después de que las imágenes se carguen
    window.addEventListener('load', function() {
        setTimeout(equalizeHeights, 200);
    });
    
    console.log('✅ Nosotros página cargada - Layout 2 columnas con altura uniforme');
    console.log('📏 Contenedores sin carrusel: Historia, Organigrama, Competencia, Mapa');
    console.log('🎠 Contenedores con carrusel: Superior, Supraprovinciales, Peritaje, provincias');
});




/* SCRIPT DEL MNENU*/

// ===== FUNCIONES PARA EL MODAL DE IMAGEN =====
let currentZoom = 1;
let currentImageSrc = '';
let currentImageTitle = '';
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let imageOffsetX = 0;
let imageOffsetY = 0;

// MOVIMIENTO SUAVIZADO (MENOS SENSIBLE)
const DRAG_SENSITIVITY = 0.7; // Reducir sensibilidad del movimiento
const MAX_OFFSET_FACTOR = 200; // Factor para limitar el desplazamiento

function openImageModal(imgElement, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    console.log('Opening modal for:', title);
    
    // Mostrar modal
    modal.classList.add('show');
    
    // Configurar título
    modalTitle.textContent = title;
    currentImageTitle = title;
    currentImageSrc = imgElement.src;
    
    // Resetear zoom y posición
    currentZoom = 1;
    imageOffsetX = 0;
    imageOffsetY = 0;
    
    // Cargar imagen directamente
    modalImage.onload = function() {
        console.log('Image loaded successfully');
        modalImage.style.display = 'block';
        updateImageTransform();
        updateZoomInfo();
        updateCursor();
        
        // Inicializar eventos después de que la imagen se carga
        setTimeout(initializeModalEvents, 100);
    };
    
    modalImage.onerror = function() {
        console.error('Error loading image');
        modalTitle.textContent = 'Error al cargar la imagen';
        modalImage.style.display = 'none';
    };
    
    // Establecer src para cargar la imagen
    modalImage.src = imgElement.src;
    
    // Si la imagen ya está en cache, onload podría no dispararse
    if (modalImage.complete) {
        console.log('Image already cached');
        modalImage.style.display = 'block';
        updateImageTransform();
        updateZoomInfo();
        updateCursor();
        setTimeout(initializeModalEvents, 100);
    }
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeImageModal(event) {
    // Solo cerrar si se hace clic en el fondo o en el botón de cerrar
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-modal')) {
        return;
    }
    
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
    
    // Reset zoom y posición después de cerrar
    setTimeout(() => {
        resetZoom();
    }, 300);
}

function zoomImage(delta) {
    currentZoom = Math.max(0.2, Math.min(3, currentZoom + delta));
    updateImageTransform();
    updateZoomInfo();
    updateCursor();
}

function resetZoom() {
    currentZoom = 1;
    imageOffsetX = 0;
    imageOffsetY = 0;
    updateImageTransform();
    updateZoomInfo();
    updateCursor();
}

function updateImageTransform() {
    const modalImage = document.getElementById('modalImage');
    modalImage.style.transform = `scale(${currentZoom}) translate(${imageOffsetX}px, ${imageOffsetY}px)`;
}

function updateZoomInfo() {
    const zoomInfo = document.getElementById('zoomInfo');
    zoomInfo.textContent = Math.round(currentZoom * 100) + '%';
}

function updateCursor() {
    const modalImage = document.getElementById('modalImage');
    if (currentZoom > 1) {
        modalImage.classList.add('zoomed');
    } else {
        modalImage.classList.remove('zoomed');
    }
}

// FUNCIONALIDAD DE ARRASTRAR (PAN) - MEJORADA Y MENOS SENSIBLE
function startDrag(e) {
    console.log('startDrag called, currentZoom:', currentZoom);
    if (currentZoom <= 1) return; // Solo permitir arrastrar si hay zoom
    
    isDragging = true;
    const modalImage = document.getElementById('modalImage');
    modalImage.style.cursor = 'grabbing';
    
    // Obtener posición inicial (mouse o touch)
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    dragStartX = clientX - imageOffsetX;
    dragStartY = clientY - imageOffsetY;
    
    console.log('Drag started at:', clientX, clientY);
    e.preventDefault();
    e.stopPropagation();
}

function drag(e) {
    if (!isDragging || currentZoom <= 1) return;
    
    // Obtener posición actual (mouse o touch)
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    // APLICAR SENSIBILIDAD REDUCIDA
    const deltaX = (clientX - dragStartX) * DRAG_SENSITIVITY;
    const deltaY = (clientY - dragStartY) * DRAG_SENSITIVITY;
    
    imageOffsetX = deltaX;
    imageOffsetY = deltaY;
    
    // Limitar el desplazamiento para no perder la imagen
    const maxOffset = MAX_OFFSET_FACTOR * currentZoom;
    imageOffsetX = Math.max(-maxOffset, Math.min(maxOffset, imageOffsetX));
    imageOffsetY = Math.max(-maxOffset, Math.min(maxOffset, imageOffsetY));
    
    updateImageTransform();
    console.log('Dragging to:', imageOffsetX, imageOffsetY);
    e.preventDefault();
    e.stopPropagation();
}

function endDrag(e) {
    if (!isDragging) return;
    
    console.log('Drag ended');
    isDragging = false;
    const modalImage = document.getElementById('modalImage');
    modalImage.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    e.preventDefault();
    e.stopPropagation();
}

// INICIALIZACIÓN DE EVENT LISTENERS - CORREGIDA
function initializeModalEvents() {
    const modalImage = document.getElementById('modalImage');
    
    if (!modalImage) {
        console.log('modalImage not found, retrying...');
        setTimeout(initializeModalEvents, 100);
        return;
    }
    
    console.log('Initializing modal events...');
    
    // Limpiar event listeners existentes
    modalImage.removeEventListener('mousedown', startDrag);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
    modalImage.removeEventListener('touchstart', startDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', endDrag);
    
    // Event listeners para arrastrar con mouse
    modalImage.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Event listeners para arrastrar con touch (móviles)
    modalImage.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', endDrag, { passive: false });
    
    // Zoom con scroll del mouse
    modalImage.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        zoomImage(delta);
    }, { passive: false });

    // Prevenir cierre accidental
    modalImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    console.log('✅ Modal events initialized successfully');
}

// Inicializar eventos globales (teclado)
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
        // Zoom con teclado
        if (document.getElementById('imageModal').classList.contains('show')) {
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                zoomImage(0.2);
            } else if (e.key === '-') {
                e.preventDefault();
                zoomImage(-0.2);
            } else if (e.key === '0') {
                e.preventDefault();
                resetZoom();
            }
        }
    });
    
    console.log('✅ Modal de imagen inicializado');
});