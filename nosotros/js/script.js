

// ===== CARRUSELES - CONFIGURACIÓN CORREGIDA =====
const carousels = {
    'superior-carousel': {
        currentSlide: 0,
        totalSlides: 4, // Coordinadora + 3 Fiscalías
        autoPlay: true,
        interval: null
    },
    'supraprovinciales-carousel': {
        currentSlide: 0,
        totalSlides: 18, // CORREGIDO: 18 equipos
        autoPlay: true,
        interval: null
    },
    'peritaje-carousel': {
        currentSlide: 0,
        totalSlides: 5, // CORREGIDO: 5 oficinas
        autoPlay: true,
        interval: null
    },
    'provincias-carousel': {
        currentSlide: 0,
        totalSlides: 18, // CORREGIDO: Contar slides reales
        autoPlay: true, // ACTIVADO
        interval: null
    }
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
// Función para iniciar autoplay - MEJORADA
function startAutoPlay(carouselId) {
    const carousel = carousels[carouselId];
    if (carousel && carousel.autoPlay && carousel.totalSlides > 1) {
        // Limpiar interval anterior si existe
        if (carousel.interval) {
            clearInterval(carousel.interval);
        }
        
        carousel.interval = setInterval(() => {
            console.log(`🔄 Autoplay: ${carouselId} - Slide ${carousel.currentSlide + 1}/${carousel.totalSlides}`);
            changeSlide(carouselId, 1);
        }, 3000); // 3 segundos para ver el movimiento más claramente
        
        console.log(`✅ Autoplay iniciado para ${carouselId}`);
    } else {
        console.log(`❌ Autoplay NO iniciado para ${carouselId}:`, {
            existe: !!carousel,
            autoPlay: carousel?.autoPlay,
            totalSlides: carousel?.totalSlides
        });
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

// Función para detectar el número real de slides - MEJORADA
function detectSlides(carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
    if (carousels[carouselId]) {
        carousels[carouselId].totalSlides = slides.length;
        console.log(`🎠 ${carouselId}: ${slides.length} slides detectados`);
        
        // DEBUGGING: Mostrar cuáles slides están visibles
        slides.forEach((slide, index) => {
            const isActive = slide.classList.contains('active');
            console.log(`   Slide ${index + 1}: ${isActive ? 'ACTIVO' : 'inactivo'}`);
        });
    }
}

// Función de inicialización - MEJORADA CON DEBUG
function initCarousels() {
    console.log('🎠 Inicializando carruseles...');
    
    Object.keys(carousels).forEach(carouselId => {
        console.log(`\n📋 Configurando: ${carouselId}`);
        
        // Verificar que el carrusel existe en el HTML
        const carouselElement = document.getElementById(carouselId);
        if (!carouselElement) {
            console.error(`❌ No se encontró el elemento: ${carouselId}`);
            return;
        }
        
        // Detectar número real de slides
        detectSlides(carouselId);
        
        // Verificar que todos los slides tengan la clase correcta
        const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);
        let activeCount = 0;
        
        slides.forEach((slide, index) => {
            if (slide.classList.contains('active')) {
                activeCount++;
            }
            
            // Asegurar que solo el primer slide esté activo
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        console.log(`   Total slides: ${slides.length}`);
        console.log(`   Slides activos encontrados: ${activeCount}`);
        
        // Crear dots
        createDots(carouselId);
        
        // Iniciar autoplay
        if (carousels[carouselId].totalSlides > 1) {
            setTimeout(() => {
                startAutoPlay(carouselId);
                pauseOnHover(carouselId);
            }, 1000); // Esperar 1 segundo antes de iniciar autoplay
        }
    });
    
    console.log('✅ Inicialización de carruseles completada');
}

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
const DRAG_SENSITIVITY = 0.7;
const MAX_OFFSET_FACTOR = 200;

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
    
    // Si la imagen ya está en cache
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
    if (modalImage) {
        modalImage.style.transform = `scale(${currentZoom}) translate(${imageOffsetX}px, ${imageOffsetY}px)`;
    }
}

function updateZoomInfo() {
    const zoomInfo = document.getElementById('zoomInfo');
    if (zoomInfo) {
        zoomInfo.textContent = Math.round(currentZoom * 100) + '%';
    }
}

function updateCursor() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        if (currentZoom > 1) {
            modalImage.classList.add('zoomed');
        } else {
            modalImage.classList.remove('zoomed');
        }
    }
}

// FUNCIONALIDAD DE ARRASTRAR (PAN)
function startDrag(e) {
    if (currentZoom <= 1) return;
    
    isDragging = true;
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.style.cursor = 'grabbing';
    }
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    dragStartX = clientX - imageOffsetX;
    dragStartY = clientY - imageOffsetY;
    
    e.preventDefault();
    e.stopPropagation();
}

function drag(e) {
    if (!isDragging || currentZoom <= 1) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    const deltaX = (clientX - dragStartX) * DRAG_SENSITIVITY;
    const deltaY = (clientY - dragStartY) * DRAG_SENSITIVITY;
    
    imageOffsetX = deltaX;
    imageOffsetY = deltaY;
    
    const maxOffset = MAX_OFFSET_FACTOR * currentZoom;
    imageOffsetX = Math.max(-maxOffset, Math.min(maxOffset, imageOffsetX));
    imageOffsetY = Math.max(-maxOffset, Math.min(maxOffset, imageOffsetY));
    
    updateImageTransform();
    e.preventDefault();
    e.stopPropagation();
}

function endDrag(e) {
    if (!isDragging) return;
    
    isDragging = false;
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    }
    e.preventDefault();
    e.stopPropagation();
}

function initializeModalEvents() {
    const modalImage = document.getElementById('modalImage');
    
    if (!modalImage) {
        setTimeout(initializeModalEvents, 100);
        return;
    }
    
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
    
    // Event listeners para arrastrar con touch
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
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página...');
    
    // Inicializar carruseles PRIMERO
    setTimeout(initCarousels, 100);
    
    // Eventos de teclado para modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
        // Zoom con teclado
        if (document.getElementById('imageModal') && document.getElementById('imageModal').classList.contains('show')) {
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
    
    console.log('✅ Página inicializada completamente');
});