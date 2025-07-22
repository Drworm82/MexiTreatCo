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
    const accordionHeaders = document.querySelectorAll('.accordion-header'); // Selecciona todos los botones de preguntas

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // 'this' se refiere al botón que fue clickeado
            this.classList.toggle('active'); // Alterna la clase 'active' en el header (para cambiar su estilo)

            // Selecciona el siguiente elemento hermano, que debería ser el contenido de la respuesta
            const content = this.nextElementSibling;

            // Alterna la clase 'show' en el contenido para expandirlo/contraerlo
            content.classList.toggle('show');

            // Opcional: Cerrar otros acordeones cuando se abre uno nuevo (comentar si quieres que varios estén abiertos)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('show');
                }
            });
        });
    });
});
