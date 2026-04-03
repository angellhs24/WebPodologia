document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.getElementById('main-nav');
    const modal = document.getElementById('modalCita');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('premiumForm');
    const successMsg = document.getElementById('successMsg');

    // 1. Cambio de estilo del Navbar al hacer Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        reveal(); // Activar animaciones de aparición
    });

    // 2. Funciones del Modal (La página flotante)
    const openModalFn = () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    };

    const closeModalFn = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Resetear el formulario por si lo cerraron tras éxito
            form.style.display = 'block';
            successMsg.style.display = 'none';
        }, 300);
    };

    // Listeners del Modal
    openBtn.addEventListener('click', openModalFn);
    closeBtn.addEventListener('click', closeModalFn);
    
    // Cerrar si hacen click fuera del cuadro blanco
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFn();
    });

    // 3. Envío de Formulario con efecto Premium
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        submitBtn.disabled = true;

        // Simulación de envío al servidor
        setTimeout(() => {
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Cerrar automáticamente después de 4 segundos
            setTimeout(() => {
                closeModalFn();
            }, 4000);
        }, 1800);
    });

    // 4. Animaciones al hacer Scroll (Reveal)
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

    // Ejecutar reveal al cargar por si hay elementos visibles ya
    reveal();
});

// Función global por si se llama desde un onclick en HTML
function openModalFn() {
    const modal = document.getElementById('modalCita');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}
