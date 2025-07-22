document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header'); // Obtenemos el elemento del encabezado
    const stickyPoint = header.offsetTop; // Obtenemos la posición inicial del encabezado

    function makeHeaderSticky() {
        if (window.scrollY > stickyPoint) {
            // Si el scroll supera la posición inicial del encabezado, añadimos la clase 'sticky'
            header.classList.add('sticky');
        } else {
            // Si el scroll está por encima, removemos la clase 'sticky'
            header.classList.remove('sticky');
        }
    }

    // Añadimos un "escuchador de eventos" para el scroll de la ventana
    window.addEventListener('scroll', makeHeaderSticky);
});
