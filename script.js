document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Header ===
    const header = document.getElementById('main-header');
    const stickyThreshold = 50; // Pixeles para activar el sticky header

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // === Mobile Menu Toggle ===
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open'); // Clase para deshabilitar scroll en el body
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.main-nav ul li a').forEach(item => {
        item.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // === Scroll Reveal Animation ===
    const contentSections = document.querySelectorAll('.content-section');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        contentSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 100) { // Adjust 100px as needed
                section.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load to reveal elements already in view

    // === Accordion (FAQs) ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close all other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('show');
                }
            });

            // Toggle current accordion
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.classList.toggle('show');
            content.style.maxHeight = content.classList.contains('show') ? content.scrollHeight + "px" : "0";
        });
    });

    // === Carousel Functionality ===
    let slideIndex = 1;
    let autoSlideInterval;

    const showSlides = (n) => {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    };

    const plusSlides = (n) => {
        showSlides(slideIndex += n);
        resetAutoSlide();
    };

    const currentSlide = (n) => {
        showSlides(slideIndex = n);
        resetAutoSlide();
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000); // Change image every 5 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Attach event listeners for prev/next buttons
    document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));

    // Attach event listeners for dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index + 1));
    });

    showSlides(slideIndex); // Initialize carousel
    startAutoSlide(); // Start auto slide

    // === Personaliza Tu Caja - Funcionalidad del Carrito ===
    const productItems = document.querySelectorAll('.product-item');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const minPurchaseMsg = document.getElementById('min-purchase-msg');
    const minPurchaseAmount = 24.99; // Define tu mínimo de compra aquí

    let cart = []; // Array para almacenar los productos en el carrito

    const updateCart = () => {
        cartItemsDiv.innerHTML = ''; // Limpiar el carrito antes de actualizar
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Tu caja está vacía.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <span>${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-index="${index}">&times;</button>
                `;
                cartItemsDiv.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
        }

        cartTotalSpan.textContent = `$${total.toFixed(2)}`;

        // Habilitar/Deshabilitar botón de checkout y mostrar mensaje de mínimo de compra
        if (total >= minPurchaseAmount) {
            checkoutBtn.disabled = false;
            minPurchaseMsg.style.display = 'none';
        } else {
            checkoutBtn.disabled = true;
            minPurchaseMsg.style.display = 'block';
        }
    };

    // Añadir producto al carrito
    productItems.forEach(item => {
        const addButton = item.querySelector('.add-item-btn');
        addButton.addEventListener('click', () => {
            const productName = item.dataset.name;
            const productPrice = parseFloat(item.dataset.price);

            const existingItem = cart.find(cartItem => cartItem.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            updateCart();
        });
    });

    // Quitar producto del carrito
    cartItemsDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const indexToRemove = parseInt(event.target.dataset.index);
            cart.splice(indexToRemove, 1); // Elimina el elemento del array
            updateCart();
        }
    });

    // Acción del botón "Terminar y Solicitar Caja"
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu caja está vacía. Por favor, añade algunos productos.');
            return;
        }

        const total = parseFloat(cartTotalSpan.textContent.replace('$', ''));
        if (total < minPurchaseAmount) {
            alert(`Necesitas añadir productos por un valor mínimo de $${minPurchaseAmount.toFixed(2)}.`);
            return;
        }

        let orderSummary = 'Pedido de Caja Personalizada:\n\n';
        cart.forEach(item => {
            orderSummary += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
        });
        orderSummary += `\nTotal: $${total.toFixed(2)}\n\n`;
        orderSummary += 'Por favor, completa el formulario de contacto con tus datos y copia este resumen en el campo "Mensaje". Nos pondremos en contacto contigo para finalizar tu pedido.';

        // Redirigir al formulario de contacto y pre-llenar el mensaje si es posible (limitado por Formspree)
        // Para Formspree, no podemos pre-llenar un textarea directamente en el href.
        // Lo más sencillo es que el usuario copie y pegue. Podemos mejorar la UX aquí.
        // Por ahora, solo copiamos al portapapeles y dirigimos al contacto.

        // Copiar al portapapeles (requiere HTTPS o localhost para funcionar en algunos navegadores)
        navigator.clipboard.writeText(orderSummary).then(() => {
            alert('¡Tu resumen de pedido ha sido copiado al portapapeles!\n\nAhora serás redirigido a la sección de Contacto. Por favor, pega este resumen en el campo de mensaje para finalizar tu solicitud.');
            window.location.href = '#contacto';
        }).catch(err => {
            console.error('No se pudo copiar el texto al portapapeles:', err);
            alert('No se pudo copiar el resumen al portapapeles. Por favor, anota tu pedido y luego ve a la sección de Contacto para enviárnoslo:\n\n' + orderSummary);
            window.location.href = '#contacto';
        });
    });

    updateCart(); // Inicializar el carrito al cargar la página
});
