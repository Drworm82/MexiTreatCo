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
        // Alternar la clase 'menu-open' en el body
        document.body.classList.toggle('menu-open');
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
});
