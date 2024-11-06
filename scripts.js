// Función para manejar el scroll suave
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los enlaces que comienzan con #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});

// Función para animar números
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const step = target / duration * 10;
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                setTimeout(updateNumber, 10);
            } else {
                stat.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// Observador de intersección para activar la animación cuando sea visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

// Observar la sección de estadísticas
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// EmailJS
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("wRoBPLxO4YcoR0jMn");

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Deshabilitar el botón y mostrar estado de carga
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            emailjs.send(
                'service_nq58sex',
                'template_scny96u',
                {
                    from_name: document.getElementById('user_name').value,
                    from_email: document.getElementById('user_email').value,
                    message: document.getElementById('message').value
                }
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                alert('Error al enviar el mensaje: ' + error.text);
            })
            .finally(function() {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
        });
    }
});

