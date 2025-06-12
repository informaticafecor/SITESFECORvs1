// Carrusel estilo Ministerio Público del Perú - Script de inicialización
console.log('✅ Carrusel estilo Ministerio Público cargado');
console.log('🎨 Características:');
console.log('  • Fondo azul gradiente institucional');
console.log('  • Imagen centrada con marco redondeado');
console.log('  • Controles minimalistas y elegantes');
console.log('  • Contador dinámico 1/3, 2/3, 3/3');
console.log('  • Auto-slide cada 8 segundos');
console.log('  • Pantalla completa sin scroll');
console.log('🎮 Controles: Flechas, puntos, auto-slide');

// Configuración del body para pantalla completa
function setupFullscreen() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
}

// Auto-navegación del carrusel (opcional - ya se maneja con CSS animations)
let currentSlide = 1;
const totalSlides = 3;
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
        document.getElementById(`slide${currentSlide}`).checked = true;
    }, 8000); // Cambiar cada 8 segundos
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Funciones de navegación manual
function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    document.getElementById(`slide${slideNumber}`).checked = true;
    
    // Reiniciar el auto-slide después de navegación manual
    stopAutoSlide();
    setTimeout(startAutoSlide, 3000); // Esperar 3 segundos antes de reanudar
}

function nextSlide() {
    const next = currentSlide === totalSlides ? 1 : currentSlide + 1;
    goToSlide(next);
}

function prevSlide() {
    const prev = currentSlide === 1 ? totalSlides : currentSlide - 1;
    goToSlide(prev);
}

// Control por teclado
function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'Escape':
                // Ir al enlace de "Saltar Intro"
                const skipLink = document.querySelector('.mp-skip');
                if (skipLink) {
                    window.open(skipLink.href, '_blank');
                }
                break;
        }
    });
}

// Detectar cambios en los radio buttons para actualizar currentSlide
function setupSlideTracking() {
    const radioButtons = document.querySelectorAll('input[name="mp-slide"]');
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                currentSlide = index + 1;
                console.log(`📍 Slide actual: ${currentSlide}/${totalSlides}`);
            }
        });
    });
}

// Manejo de errores de imágenes
function setupImageErrorHandling() {
    const images = document.querySelectorAll('.mp-slide img');
    images.forEach((img, index) => {
        img.addEventListener('error', () => {
            console.warn(`⚠️ No se pudo cargar la imagen ${index + 1}`);
            // El manejo del error ya está en el HTML con onerror
        });
        
        img.addEventListener('load', () => {
            console.log(`✅ Imagen ${index + 1} cargada correctamente`);
        });
    });
}

// Control de visibilidad de la página
function setupVisibilityControl() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
            console.log('⏸️ Auto-slide pausado (pestaña oculta)');
        } else {
            startAutoSlide();
            console.log('▶️ Auto-slide reanudado');
        }
    });
}

// Funciones de utilidad para debugging
window.introDebug = {
    getCurrentSlide: () => currentSlide,
    goToSlide: goToSlide,
    nextSlide: nextSlide,
    prevSlide: prevSlide,
    startAutoSlide: startAutoSlide,
    stopAutoSlide: stopAutoSlide,
    getTotalSlides: () => totalSlides
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando carrusel intro...');
    
    setupFullscreen();
    setupSlideTracking();
    setupKeyboardControls();
    setupImageErrorHandling();
    setupVisibilityControl();
    
    // Iniciar auto-slide después de un pequeño delay
    setTimeout(() => {
        startAutoSlide();
        console.log('⏰ Auto-slide iniciado');
    }, 2000);
    
    console.log('✨ Carrusel intro completamente inicializado');
    console.log('🎹 Controles de teclado:');
    console.log('  • ← Anterior');
    console.log('  • → Siguiente'); 
    console.log('  • ESC Saltar intro');
});

// Cleanup cuando se abandona la página
window.addEventListener('beforeunload', () => {
    stopAutoSlide();
    console.log('🧹 Limpieza del carrusel completada');
});