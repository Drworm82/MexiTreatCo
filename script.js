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

    // --- Lógica para el Carrusel de Imágenes ---
    let slideIndex = 1; // La diapositiva actual, empezando por 1
    showSlides(slideIndex); // Muestra la primera diapositiva al cargar

    // Función para avanzar/retroceder las diapositivas
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    // Función para ir a una diapositiva específica (usada por los puntos)
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("carousel-slide");
        const dots = document.getElementsByClassName("dot");
        const carouselSlidesContainer = document.querySelector('.carousel-slides');

        // Reinicia el índice si se pasa del final o del principio
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        // Oculta todas las diapositivas y quita la clase 'active' de los puntos
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; // Se ocultan para el fade effect
            // Si usas transform para deslizamiento, es mejor usar la propiedad transform directamente en el contenedor
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Muestra la diapositiva actual
        slides[slideIndex-1].style.display = "block"; // Se muestra la diapositiva actual

        // Ajusta la posición de las diapositivas para el efecto de deslizamiento
        // Calcula el desplazamiento necesario para que la diapositiva actual esté visible
        // `slideIndex - 1` es el índice base 0 de la diapositiva actual
        // Multiplicamos por -100% para mover el contenedor de diapositivas
        carouselSlidesContainer.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;

        // Marca el punto indicador como activo
        if (dots.length > 0) { // Asegura que haya puntos antes de intentar marcarlos
            dots[slideIndex-1].className += " active";
        }
    }

    /*
    // --- Desplazamiento automático de diapositivas (Opcional) ---
    // Descomenta este bloque si quieres que el carrusel avance automáticamente.
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            plusSlides(1); // Avanza una diapositiva cada 5 segundos
        }, 5000); // 5000 milisegundos = 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Iniciar el auto-desplazamiento al cargar la página
    startAutoSlide();

    // Detener el auto-desplazamiento cuando el usuario interactúa (opcional)
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide); // Al pasar el ratón por encima
    carouselContainer.addEventListener('mouseleave', startAutoSlide); // Al quitar el ratón
    */
});
