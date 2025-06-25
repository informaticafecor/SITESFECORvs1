// CARRUSEL DE VIDEOS CON CONTROL INTELIGENTE - JavaScript específico

let currentVideoIndex = 0;
const videoSlides = document.querySelectorAll('.video-slide');
const videoIndicators = document.querySelectorAll('.video-indicator');
let autoPlayInterval;
let isVideoPlaying = false;
let allIframes = [];

// Función para pausar todos los videos
function pauseAllVideos() {
    // Pausar todos los videos de YouTube
    allIframes.forEach(iframe => {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
    isVideoPlaying = false;
}

// Función para mostrar un video slide específico
function showVideoSlide(index) {
    // Pausar todos los videos antes de cambiar
    pauseAllVideos();
    
    videoSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i < index) {
            slide.classList.add('prev');
        }
    });

    videoIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Función para cambiar video slide (usada por botones de navegación)
function changeVideoSlide(direction) {
    currentVideoIndex += direction;
    if (currentVideoIndex >= videoSlides.length) {
        currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
        currentVideoIndex = videoSlides.length - 1;
    }
    showVideoSlide(currentVideoIndex);
}

// Función para ir a un video específico (usada por indicadores)
function currentVideoSlide(index) {
    currentVideoIndex = index - 1;
    showVideoSlide(currentVideoIndex);
}

// Función para iniciar auto-play
function startAutoPlay() {
    stopAutoPlay(); // Limpiar interval anterior
    autoPlayInterval = setInterval(() => {
        if (!isVideoPlaying) {
            changeVideoSlide(1);
        }
    }, 6000);
}

// Función para detener auto-play
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Configurar listeners para los videos
function setupVideoListeners() {
    allIframes = Array.from(document.querySelectorAll('.youtube-embed'));
    
    allIframes.forEach((iframe, index) => {
        iframe.addEventListener('load', function() {
            // Comunicación con YouTube API
            iframe.contentWindow.postMessage('{"event":"listening"}', '*');
        });
    });

    // Detectar clicks en videos
    videoSlides.forEach((slide, index) => {
        slide.addEventListener('click', function(e) {
            if (e.target.classList.contains('youtube-embed') || e.target.closest('.youtube-embed')) {
                isVideoPlaying = true;
                stopAutoPlay();
                
                // Auto-reanudar después de 60 segundos de inactividad
                setTimeout(() => {
                    isVideoPlaying = false;
                    startAutoPlay();
                }, 60000);
            }
        });
    });
}

// Escuchar eventos de YouTube
window.addEventListener('message', function(event) {
    if (event.origin !== 'https://www.youtube.com') return;
    
    try {
        const data = JSON.parse(event.data);
        
        if (data.event === 'video-progress' && data.info) {
            const state = data.info.playerState;
            
            if (state === 1) { // Reproduciendo
                isVideoPlaying = true;
                stopAutoPlay();
            } else if (state === 2 || state === 0 || state === 5) { // Pausado, terminado, o cargando
                isVideoPlaying = false;
                setTimeout(() => {
                    if (!isVideoPlaying) {
                        startAutoPlay();
                    }
                }, 1000);
            }
        }
    } catch (e) {
        // Ignorar errores de parsing
    }
});

// Detectar pausa manual en toda la página
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseAllVideos();
        stopAutoPlay();
    } else {
        if (!isVideoPlaying) {
            startAutoPlay();
        }
    }
});

// Pausar videos cuando se sale de la ventana
window.addEventListener('blur', function() {
    pauseAllVideos();
    stopAutoPlay();
});

// Reanudar auto-play cuando se vuelve a la ventana
window.addEventListener('focus', function() {
    if (!isVideoPlaying) {
        setTimeout(() => {
            startAutoPlay();
        }, 1000);
    }
});

// Inicialización del carrusel
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el primer video
    if (videoSlides.length > 0) {
        showVideoSlide(0);
    }
    
    // Configurar listeners después de un pequeño delay
    setTimeout(() => {
        setupVideoListeners();
        startAutoPlay();
    }, 1000);
});

// Funciones globales para los controles HTML (onclick)
window.changeVideoSlide = changeVideoSlide;
window.currentVideoSlide = currentVideoSlide;