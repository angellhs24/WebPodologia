document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Manejo del Navbar al hacer Scroll
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if(backToTop) backToTop.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            if(backToTop) backToTop.style.display = 'none';
        }
        reveal();
    });

    // 2. Función Reveal (Aparición al hacer scroll)
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }

    // Ejecutar reveal una vez al cargar por si hay elementos visibles
    reveal();

    // 3. Menú Móvil Simple
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');

    if(burger) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Estilo rápido para el menú activo
            if(navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }

    // 4. Botón Volver Arriba
    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
