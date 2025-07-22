document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para el Menú Sticky ---
    const header = document.getElementById('main-header');
    const stickyPoint = header.offsetTop;

    function makeHeaderSticky() {
        if (window.scrollY > stickyPoint) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    window.addEventListener('scroll', makeHeaderSticky);

    // --- Lógica para el Acordeón FAQ ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('show');

            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('show');
                }
            });
        });
    });

    // --- Lógica para el Menú Hamburguesa (Móvil) ---
    const menuToggle = document.querySelector('.menu-toggle'); // El botón de hamburguesa
    const mainNav = document.querySelector('.main-nav'); // El contenedor de la navegación

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active'); // Alterna la clase 'active' en el nav
        document.body.classList.toggle('menu-open'); // Alternar la clase 'menu-open' en el body
    });

    // Cerrar el menú si se hace clic en un enlace del menú móvil
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open'); // Remover también la clase del body
            }
        });
    });

    // --- Lógica para Scroll Reveal (Animaciones al hacer scroll) ---
    const sectionsToReveal = document.querySelectorAll('.content-section');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección es visible en el viewport
                entry.target.classList.add('revealed'); // Añade la clase 'revealed'
                observer.unobserve(entry.target); // Deja de observar la sección (para que la animación solo ocurra una vez)
            }
        });
    }, {
        // Opciones del Intersection Observer
        rootMargin: '0px', // No hay margen extra alrededor del viewport
        threshold: 0.1 // Activa la animación cuando el 10% de la sección es visible
    });

    // Observa cada sección de contenido
    sectionsToReveal.forEach(section => {
        revealObserver.observe(section);
    });
});
