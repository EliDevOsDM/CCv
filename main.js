// Animación de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de entrada para elementos
const observerOptions = {   
    threshold: 0.1,
    rootMargin: "50px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('tech-card')) {
                entry.target.style.transitionDelay = `${Math.random() * 0.5}s`;
            }
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('section, .tech-card, .project-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Efecto de partículas en el hero (opcional)
const createParticles = () => {
    const hero = document.querySelector('.hero-section');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
};

// Inicializar partículas
createParticles();

// Actualizar navegación activa al hacer scroll
window.addEventListener('scroll', () => {
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
});

// Funciones para el modal
const projectImages = {
    'project1': [
        {
            src: 'src/img/yo.jpg',
            alt: 'Pantalla de inicio'
        },
        {
            src: 'images/projects/project1/screen2.jpg',
            alt: 'Lista de tareas'
        }
        // ... más imágenes
    ],
    // ... más proyectos
};

function openModal(projectId) {
    const modal = document.getElementById('screensModal');
    const gallery = document.getElementById('modalGallery');
    
    // Limpiar galería existente
    gallery.innerHTML = '';
    
    // Cargar imágenes del proyecto
    projectImages[projectId].forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        gallery.appendChild(img);
    });
    
    modal.style.display = 'block';
}

// Cerrar modal
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('screensModal').style.display = 'none';
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