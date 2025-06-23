// CARRUSEL DE IMÁGENES SUPERIOR
let currentImageIndex = 0;
const imageSlides = document.querySelectorAll('.image-slide');
const imageIndicators = document.querySelectorAll('.image-indicator');

function showImageSlide(index) {
    imageSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    imageIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextImageSlide() {
    currentImageIndex = (currentImageIndex + 1) % imageSlides.length;
    showImageSlide(currentImageIndex);
}

function currentImageSlide(index) {
    currentImageIndex = index - 1;
    showImageSlide(currentImageIndex);
}

// Auto-play del carrusel de imágenes cada 4 segundos
setInterval(nextImageSlide, 4000);

// CARRUSEL DE VIDEOS CON CONTROL INTELIGENTE MEJORADO
let currentVideoIndex = 0;
const videoSlides = document.querySelectorAll('.video-slide');
const videoIndicators = document.querySelectorAll('.video-indicator');
let autoPlayInterval;
let isVideoPlaying = false;
let allIframes = [];

function pauseAllVideos() {
    // Pausar todos los videos de YouTube
    allIframes.forEach(iframe => {
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
    isVideoPlaying = false;
}

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

function changeVideoSlide(direction) {
    currentVideoIndex += direction;
    if (currentVideoIndex >= videoSlides.length) {
        currentVideoIndex = 0;
    } else if (currentVideoIndex < 0) {
        currentVideoIndex = videoSlides.length - 1;
    }
    showVideoSlide(currentVideoIndex);
}

function currentVideoSlide(index) {
    currentVideoIndex = index - 1;
    showVideoSlide(currentVideoIndex);
}

function startAutoPlay() {
    stopAutoPlay(); // Limpiar interval anterior
    autoPlayInterval = setInterval(() => {
        if (!isVideoPlaying) {
            changeVideoSlide(1);
        }
    }, 6000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Mejorar detección de videos
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

// Inicialización
setTimeout(() => {
    setupVideoListeners();
    startAutoPlay();
}, 1000);

// ANIMACIONES AL SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.module-card, .additional-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// EFECTOS INTERACTIVOS MEJORADOS
document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Partículas de fondo (efecto sutil)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(0, 204, 153, 0.1)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    
    document.body.appendChild(particle);
    
    particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
        { transform: 'translateY(-100vh) rotate(360deg)', opacity: 1 },
        { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
    ], {
        duration: Math.random() * 10000 + 10000,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}


// Crear partículas ocasionalmente
/*
setInterval(createParticle, 3000);


  fetch('componentes/menu.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById("menu").innerHTML = html;
    });
*/

 // FUNCIONALIDAD DEL MENÚ FECCOR

// FUNCIONALIDAD DEL MENÚ FECCOR

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