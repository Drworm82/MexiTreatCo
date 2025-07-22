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

            // Cierra otros ítems del acordeón
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('show');
                }
            });
        });
    });

    // --- Lógica para el Menú Hamburguesa (Móvil) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // --- Lógica para Scroll Reveal (Animaciones al hacer scroll) ---
    const sectionsToReveal = document.querySelectorAll('.content-section');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sectionsToReveal.forEach(section => {
        revealObserver.observe(section);
    });

    // --- Lógica para el Carrusel de Imágenes (Revisada y Optimizada) ---
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");
    const carouselSlidesContainer = document.querySelector('.carousel-slides');

    // Función principal para mostrar diapositivas
    function showSlides(n) {
        // Asegurarse de que el índice esté dentro de los límites
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        // Mover el contenedor de las diapositivas
        // Esto crea el efecto de deslizamiento.
        // La animación 'fade' en CSS puede ser redundante si usas transform.
        carouselSlidesContainer.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;

        // Remover la clase 'active' de todos los puntos
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // Marcar el punto indicador como activo
        if (dots.length > 0) {
            dots[slideIndex - 1].classList.add("active");
        }

        // Importante: Aquí es donde ajustamos la visibilidad de las diapositivas.
        // Si tienes la clase 'fade' en HTML, puede estar causando un conflicto
        // con 'display: none'. Una forma es manejar el 'display' puramente aquí.
        // Sin embargo, para no romper tu animación fade, nos enfocaremos en asegurar que la activa se vea.
        // El CSS 'fade' debería manejar la opacidad, mientras que el transform maneja el movimiento.

        // Si persisten los problemas de imagen en blanco, podrías probar:
        // 1. Quitar la clase 'fade' de los elementos .carousel-slide en index.html
        // 2. Controlar la visibilidad directamente con JS (ver código comentado abajo)

        // Forzar visibilidad de la diapositiva actual si hay problemas con 'fade'
        // Esto es una solución alternativa si el 'fade' CSS está ocultando la imagen.
        // Descomenta este bloque y comenta el CSS @keyframes fade si el problema persiste.
        /*
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
        */
    }

    // Funciones para los botones de navegación (anterior/siguiente)
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            showSlides(slideIndex += -1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            showSlides(slideIndex += 1);
        });
    }

    // Funciones para los puntos de navegación (usan la función showSlides directamente)
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    // Mostrar la primera diapositiva al cargar
    showSlides(slideIndex);

    /*
    // --- Desplazamiento automático de diapositivas (Opcional) ---
    // Descomenta este bloque si quieres que el carrusel avance automáticamente.
    let autoSlideInterval;
    function startAutoSlide() {
        stopAutoSlide(); // Asegúrate de limpiar cualquier intervalo previo
        autoSlideInterval = setInterval(function() {
            showSlides(slideIndex += 1);
        }, 5000); // 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide(); // Iniciar al cargar
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide); // Detener al pasar el ratón
    carouselContainer.addEventListener('mouseleave', startAutoSlide); // Reanudar al quitar el ratón
    */
});
