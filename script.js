document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar y Botón Volver Arriba
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            backToTop.style.display = 'none';
        }
        reveal();
    });

    // Menú Móvil
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    burger.addEventListener('click', () => navMenu.classList.toggle('active'));

    // Animación de aparición (Reveal)
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) el.classList.add("active");
        });
    }
    reveal();

    // Slider de Testimonios
    const track = document.getElementById('track');
    let index = 0;
    setInterval(() => {
        index = (index + 1) % 2; // Ajustar según número de testimonios
        if(track) track.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);

    // Formulario
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerText = 'Enviando...';
        setTimeout(() => {
            form.reset();
            form.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
        }, 1500);
    });

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
