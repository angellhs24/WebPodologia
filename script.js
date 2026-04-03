document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('main-nav');
    const modal = document.getElementById('modalCita');
    const navLinks = document.getElementById('nav-list');
    const menuToggle = document.getElementById('mobile-menu');

    // 1. Scroll Effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        reveal();
    });

    // 2. Menú Móvil Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Cambiar icono de barras a X
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Cerrar menú al clickear un link (en móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // 3. Modal Logic
    const openModal = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    document.getElementById('openModal').onclick = openModal;
    document.getElementById('closeModal').onclick = closeModal;

    // 4. Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) el.classList.add("active");
        });
    }
    reveal();
});

// Función global para botones inline
function openModalFn() {
    document.getElementById('modalCita').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
