
document.addEventListener('DOMContentLoaded', () => {

    // --- Configuración de Supabase ---
    const SUPABASE_URL = 'https://rasdvpqrupouxjqayupr.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhc2R2cHFydXBvdXhqcWF5dXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MTIxNjQsImV4cCI6MjA5Mjk4ODE2NH0.u2o6jo0RAJqH4B4JlAVZCE0mz6nPf8vNmkTFX1r8zpM';
    const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const PODOLOGO_WHATSAPP = '525626225027'; // Reemplaza con el número real

    // --- Variables Globales ---
    let citaData = { service: null, date: null, name: null, phone: null };

    // --- Elementos del DOM ---
    const navbar = document.getElementById('main-nav');
    const modal = document.getElementById('modalCita');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
    const testimonialContainer = document.getElementById('testimonial-container');

    // --- Elementos del Asistente de Citas ---
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const serviceOptions = document.querySelectorAll('.service-option');
    const nextButtons = document.querySelectorAll('.wizard-next');
    const prevButtons = document.querySelectorAll('.wizard-prev');
    const dateInput = document.getElementById('citaDate');
    const nameInput = document.getElementById('citaName');
    const phoneInput = document.getElementById('citaPhone');
    const confirmBtn = document.getElementById('confirmCita');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const summaryService = document.getElementById('summaryService');
    const summaryDate = document.getElementById('summaryDate');

    // --- Navegación del Asistente ---
    let currentStep = 1;

    const goToStep = (step) => {
        wizardSteps.forEach(s => s.classList.remove('active'));
        document.getElementById(`step${step}`).classList.add('active');
        currentStep = step;
    };

    serviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            citaData.service = option.dataset.service;
            serviceOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            goToStep(2);
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', () => goToStep(currentStep + 1));
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => goToStep(currentStep - 1));
    });

    // --- Lógica de Validación y Datos ---
    dateInput.addEventListener('change', () => {
        citaData.date = dateInput.value;
        document.querySelector('#step2 .wizard-next').disabled = !citaData.date;
    });

    const validateStep3 = () => {
        citaData.name = nameInput.value.trim();
        // Limpiamos el teléfono para solo tener números
        let cleanPhone = phoneInput.value.replace(/\D/g, '');
        citaData.phone = cleanPhone;
        confirmBtn.disabled = !(citaData.name && cleanPhone.length === 10);
    };
    nameInput.addEventListener('input', validateStep3);
    phoneInput.addEventListener('input', validateStep3);

    // --- Guardar Cita y Generar Link de WhatsApp ---
    confirmBtn.addEventListener('click', async () => {
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
        confirmBtn.disabled = true;

        const finalPhoneNumber = `52${citaData.phone}`;

        const { data, error } = await _supabase
            .from('citas')
            .insert([{
                nombre: citaData.name,
                telefono: finalPhoneNumber, // Guardamos con el prefijo
                servicio: citaData.service,
                fecha: citaData.date,
                estado: 'pendiente'
            }]);

        if (error) {
            console.error('Error al guardar la cita:', error);
            alert('Hubo un error al guardar tu cita. Por favor, intenta de nuevo.');
            confirmBtn.innerHTML = 'Solicitar Cita';
            confirmBtn.disabled = false;
            return;
        }

        // Actualizar resumen y generar link
        summaryService.textContent = citaData.service;
        summaryDate.textContent = new Date(citaData.date + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const whatsappMsg = `¡Hola! Quiero confirmar mi solicitud de cita para ${citaData.service} el día ${summaryDate.textContent}. Mi nombre es ${citaData.name}.`;
        whatsappBtn.href = `https://api.whatsapp.com/send?phone=${PODOLOGO_WHATSAPP}&text=${encodeURIComponent(whatsappMsg)}`;

        goToStep(4);
    });

    // --- Funciones del Modal ---
    const openModalFn = () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    };

    const closeModalFn = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetWizard();
        }, 300);
    };
    
    const resetWizard = () => {
        citaData = { service: null, date: null, name: null, phone: null };
        serviceOptions.forEach(o => o.classList.remove('selected'));
        dateInput.value = '';
        nameInput.value = '';
        phoneInput.value = '';
        document.querySelector('#step2 .wizard-next').disabled = true;
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = 'Solicitar Cita';
        goToStep(1);
    };

    // --- Listeners y Ejecución ---
    openBtn.addEventListener('click', openModalFn);
    closeBtn.addEventListener('click', closeModalFn);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFn();
    });

    // --- Inicializar Swiper ---
    const initSwiper = () => {
        new Swiper('.testimonial-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5500,
                disableOnInteraction: false,
            },
        });
    };

    // --- Cargar Testimonios ---
    const loadTestimonials = async () => {
        if (!testimonialContainer) return;
        const { data, error } = await _supabase.from('testimonios').select('*');

        if (error) {
            console.error('Error cargando testimonios:', error);
            testimonialContainer.innerHTML = '<p class="error-msg">No se pudieron cargar los testimonios.</p>';
            return;
        }

        if (data && data.length > 0) {
            testimonialContainer.innerHTML = '';
            data.forEach(testimonio => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `
                    <div class="testimonial-card">
                        <img src="${testimonio.imagen_url}" alt="Foto de ${testimonio.nombre}">
                        <p>"${testimonio.testimonio}"</p>
                        <h5>– ${testimonio.nombre}</h5>
                    </div>
                `;
                testimonialContainer.appendChild(slide);
            });
            initSwiper();
        } else {
            testimonialContainer.innerHTML = '<p>Aún no hay testimonios para mostrar.</p>';
        }
    };

    // --- Animaciones "Reveal" on Scroll ---
    const reveal = () => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    };
    window.addEventListener('scroll', reveal);

    // --- Carga Inicial ---
    loadTestimonials();
    reveal();
});

// Función global para el botón del Hero
function openModalFn() {
    const modal = document.getElementById('modalCita');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}
