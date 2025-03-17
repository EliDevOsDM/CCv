// Animación de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Detectar si es un dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Configuración adaptativa según el dispositivo
document.addEventListener('DOMContentLoaded', function() {
    // Desactivar partículas en móvil
    if (isMobile) {
        // Eliminar partículas
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.remove();
        }
        
        // Eliminar formas geométricas animadas
        const shapes = document.querySelector('.geometric-shapes');
        if (shapes) {
            shapes.remove();
        }
        
        // Añadir clase para optimización móvil
        document.body.classList.add('mobile-optimized');
        
        // Desactivar efectos 3D en tarjetas de proyectos
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            // Eliminar event listeners de mousemove
            card.replaceWith(card.cloneNode(true));
        });
    }
    
    // Reducir la cantidad de elementos observados para animaciones
    const observerOptions = {   
        threshold: 0.1,
        rootMargin: "50px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Eliminar el elemento del observer después de animarlo
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar solo elementos clave en móvil
    if (isMobile) {
        document.querySelectorAll('section > h2, .about-text, .about-visual').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('section, .tech-card, .project-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Optimizar el evento de scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Actualizar navegación activa
                updateActiveNavigation();
                
                // Solo aplicar parallax en desktop
                if (!isMobile) {
                    applyParallaxEffect();
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Simplificar radicalmente las tarjetas de proyectos
        const projectSection = document.querySelector('.projects-section');
        if (projectSection) {
            projectSection.classList.add('mobile-simplified');
        }
        
        // Eliminar efectos 3D y transformaciones complejas
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            // Eliminar listeners de eventos que causan transformaciones 3D
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Simplificar estructura interna
            const overlay = newCard.querySelector('.project-overlay');
            if (overlay) {
                // Hacer visible el overlay por defecto en móvil
                overlay.style.opacity = '1';
                overlay.style.transform = 'none';
                overlay.style.background = 'rgba(0,0,0,0.7)';
                overlay.style.height = 'auto';
                overlay.style.position = 'relative';
            }
            
            // Eliminar efectos hover que no funcionan bien en táctil
            const hoverInfo = newCard.querySelector('.project-hover-info');
            if (hoverInfo) {
                hoverInfo.remove();
            }
        });

        // Optimización adicional para la página de proyectos
        const isProjectsPage = window.location.pathname.includes('projects.html');
        
        if (isProjectsPage) {
            // Cargar proyectos de forma progresiva
            const projectCards = document.querySelectorAll('.project-card');
            let visibleCount = 0;
            
            function loadMoreProjects() {
                const batchSize = 3; // Cargar 3 proyectos a la vez
                const endIndex = Math.min(visibleCount + batchSize, projectCards.length);
                
                for (let i = visibleCount; i < endIndex; i++) {
                    projectCards[i].style.display = 'block';
                    setTimeout(() => {
                        projectCards[i].classList.add('visible');
                    }, (i - visibleCount) * 100);
                }
                
                visibleCount = endIndex;
                
                // Si hemos cargado todos, eliminar el evento de scroll
                if (visibleCount >= projectCards.length) {
                    window.removeEventListener('scroll', scrollHandler);
                }
            }
            
            // Ocultar todos los proyectos inicialmente excepto los primeros
            projectCards.forEach((card, index) => {
                if (index >= 6) { // Mostrar los primeros 6 inmediatamente
                    card.style.display = 'none';
                } else {
                    card.classList.add('fade-in');
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                    visibleCount++;
                }
            });
            
            // Función para detectar cuando el usuario ha scrolleado cerca del final
            function scrollHandler() {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                    loadMoreProjects();
                }
            }
            
            // Añadir evento de scroll para cargar más proyectos
            window.addEventListener('scroll', scrollHandler);
        }
    }
});

// Función para actualizar navegación activa
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Función para aplicar efecto parallax
function applyParallaxEffect() {
    const scrollPosition = window.scrollY;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.2;
        const sectionTop = element.closest('section').offsetTop;
        const distance = scrollPosition - sectionTop;
        
        if (Math.abs(distance) < window.innerHeight) {
            element.style.transform = `translateY(${distance * speed}px)`;
        }
    });
}

// Funciones para el modal


// Función para manejar la interacción con las tarjetas de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Añadir índice para animación escalonada
        card.style.setProperty('--card-index', index);
        
        // Añadir efecto 3D suave al mover el ratón
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `translateY(-15px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * -5}deg)`;
        });
        
        // Restablecer la transformación cuando el ratón sale
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // Animación de entrada para las tarjetas de proyectos
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100); // Retraso escalonado
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.classList.add('fade-in');
        projectObserver.observe(card);
    });
});

// Función para abrir el modal con animación mejorada
function openModal(projectId) {
    const modal = document.getElementById('screensModal');
    const gallery = document.getElementById('modalGallery');
    
    // Limpiar galería existente
    gallery.innerHTML = '';
    
    // Cargar imágenes del proyecto con animación
    if (projectImages[projectId]) {
        projectImages[projectId].forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.style.animationDelay = `${index * 0.1}s`;
            img.classList.add('fade-in-up');
            gallery.appendChild(img);
        });
    }
    
    // Mostrar modal con animación
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Cerrar modal con animación
function closeModal() {
    const modal = document.getElementById('screensModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar con el botón X
    const closeButton = document.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Cerrar al hacer clic fuera del contenido
    const modal = document.getElementById('screensModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Opcional: Cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Observar la sección about para activar animaciones
    const aboutSection = document.querySelector('.about-section');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    aboutObserver.observe(aboutSection);

    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Función para actualizar clases
    function updateNavHoverEffects() {
        navLinks.forEach(link => {
            if (link.querySelector('a.active')) {
                link.classList.add('active-parent');
            } else {
                link.classList.remove('active-parent');
            }
        });
    }
    
    // Actualizar inicialmente
    updateNavHoverEffects();
    
    // Actualizar cuando cambia la sección activa
    window.addEventListener('scroll', updateNavHoverEffects);
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Función para mostrar/ocultar detalles del proyecto
function toggleDetails(button) {
    const card = button.closest('.project-card');
    const detailsPanel = card.querySelector('.project-hover-info');
    
    if (detailsPanel.classList.contains('active')) {
        detailsPanel.classList.remove('active');
    } else {
        // Cerrar cualquier panel abierto primero
        document.querySelectorAll('.project-hover-info.active').forEach(panel => {
            panel.classList.remove('active');
        });
        
        detailsPanel.classList.add('active');
    }
}

// Versión ultra simplificada para dispositivos muy lentos
document.addEventListener('DOMContentLoaded', function() {
    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Comprobar si el dispositivo es muy lento (puedes ajustar este umbral)
        const isLowPerformance = navigator.hardwareConcurrency <= 4;
        
        if (isLowPerformance) {
            // Reemplazar completamente la sección de proyectos con una versión ultra ligera
            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                const projectCards = document.querySelectorAll('.project-card');
                const projectsGrid = document.querySelector('.projects-grid');
                
                // Limpiar la grid actual
                projectsGrid.innerHTML = '';
                
                // Crear versiones ultra simplificadas de las tarjetas
                projectCards.forEach(card => {
                    // Extraer información esencial
                    const title = card.querySelector('h3')?.textContent || 'Proyecto';
                    const description = card.querySelector('.project-description')?.textContent || '';
                    const imgSrc = card.querySelector('img')?.src || '';
                    const downloadLink = card.querySelector('.btn-download')?.href || '#';
                    const githubLink = card.querySelector('.btn-github')?.href || '#';
                    
                    // Crear tarjeta ultra simplificada
                    const simpleCard = document.createElement('div');
                    simpleCard.className = 'simple-project-card';
                    simpleCard.innerHTML = `
                        <div class="simple-project-content">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <div class="simple-project-links">
                                <a href="${downloadLink}" class="simple-btn">Descargar APK</a>
                                <a href="${githubLink}" class="simple-btn">GitHub</a>
                            </div>
                        </div>
                    `;
                    
                    projectsGrid.appendChild(simpleCard);
                });
                
                projectsGrid.classList.add('simple-projects-grid');
            }
        }
    }
});

// Ocultar la pantalla de carga cuando todo esté listo
window.addEventListener('load', function() {
  // Dar un pequeño retraso para asegurar que todo se ha renderizado
  setTimeout(function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      
      // Eliminar completamente después de la transición
      setTimeout(function() {
        loadingScreen.remove();
      }, 500);
    }
  }, 1000); // Retraso de 800ms para asegurar que todo se ha cargado
});

// Agregar al final de main.js
document.addEventListener('DOMContentLoaded', function() {
  // Función para manejar la sección Sobre Mí
  const aboutSection = document.querySelector('.about-section');
  const codeWindow = document.querySelector('.code-window');
  
  if (aboutSection && codeWindow) {
    // Ajustar el tamaño del código para evitar desbordamiento
    const adjustCodeSize = function() {
      const containerWidth = aboutSection.querySelector('.about-visual').offsetWidth;
      codeWindow.style.width = (containerWidth - 40) + 'px'; // Restar margen
      
      // Asegurarse de que el contenido de código no cause scroll vertical
      const codeContent = codeWindow.querySelector('.code-content');
      if (codeContent) {
        codeContent.style.maxHeight = 'none';
        codeContent.style.overflowY = 'hidden';
      }
    };
    
    // Ajustar al cargar y al cambiar el tamaño de la ventana
    adjustCodeSize();
    window.addEventListener('resize', adjustCodeSize);
    
    // Observar cuando la sección se vuelve visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reajustar cuando la sección se vuelve visible
          setTimeout(adjustCodeSize, 100);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(aboutSection);
  }
});