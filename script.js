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

    // --- Lógica para el Carrusel de Imágenes (Revisada) ---
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");
    const carouselSlidesContainer = document.querySelector('.carousel-slides');

    // Función principal para mostrar diapositivas
    function showSlides(n) {
        // Asegurarse de que el índice esté dentro de los límites
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        // Ocultar todas las diapositivas
        // Usamos display: none para las que no son activas
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remover la clase 'active' de todos los puntos
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // Mostrar la diapositiva actual
        slides[slideIndex - 1].style.display = "block";

        // Mover el contenedor de las diapositivas
        // Esto crea el efecto de deslizamiento
        // Comenta la línea de abajo si prefieres solo el efecto de "fade" (con la propiedad display:block/none)
        carouselSlidesContainer.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;


        // Marcar el punto indicador como activo
        if (dots.length > 0) {
            dots[slideIndex - 1].classList.add("active");
        }
    }

    // Funciones para los botones de navegación (anterior/siguiente)
    // Se agregan listeners de eventos directamente en JS para mayor robustez
    // y se eliminan los onclick del HTML para estos botones.
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

    // Funciones para los puntos de navegación (se mantienen los onclick en HTML)
    // Es posible que necesitemos ajustar el currentSlide para que use la misma lógica de showSlides
    // window.currentSlide ya está definida como una función global.
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
        // Asegúrate de limpiar cualquier intervalo previo para evitar duplicados
        stopAutoSlide();
        autoSlideInterval = setInterval(function() {
            showSlides(slideIndex += 1); // Avanza una diapositiva cada 5 segundos
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
