document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de la cabecera sticky y menú responsive ---
    const header = document.getElementById('main-header');
    const toggleButton = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    toggleButton.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open'); // Para ajustar el padding del body
    });

    // --- Observador para Scroll Reveal ---
    const contentSections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Revela cuando el 10% de la sección es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Deja de observar una vez revelado
            }
        });
    }, observerOptions);

    contentSections.forEach(section => {
        // Excluir el hero-section de la observación inicial si ya tiene la clase 'revealed' en HTML
        if (!section.classList.contains('hero-section')) {
            observer.observe(section);
        }
    });


    // --- Lógica para el carrusel ---
    const carouselSlides = document.querySelector('.carousel-slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let slideIndex = 0;

    if (carouselSlides) { // Asegúrate de que el carrusel exista
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        // Crear puntos de navegación
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => currentSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');

        function showSlides() {
            carouselSlides.style.transform = `translateX(${-slideIndex * 100}%)`;
            dots.forEach((dot, index) => {
                if (index === slideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function plusSlides(n) {
            slideIndex = (slideIndex + n + totalSlides) % totalSlides;
            showSlides();
        }

        function currentSlide(n) {
            slideIndex = n;
            showSlides();
        }

        prevButton.addEventListener('click', () => plusSlides(-1));
        nextButton.addEventListener('click', () => plusSlides(1));

        showSlides(); // Mostrar la primera diapositiva al cargar
    }

    // --- Lógica para el acordeón (FAQ) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active'); // Activa/desactiva la clase en el header
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                content.style.maxHeight = null; // Quita la altura para animación de cerrar
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
            } else {
                content.classList.add('show');
                // Establece maxHeight para la animación de abrir, usando scrollHeight para el tamaño real
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '15px';
                content.style.paddingBottom = '15px';
            }
        });
    });

    // --- Lógica para el personalizador de caja (Carrito) ---
    const addProductBtns = document.querySelectorAll('.add-item-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const minItems = 2; // Ejemplo: mínimo de 2 items en la caja
    let cart = []; // Array para almacenar los items en el carrito

    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Limpia el contenido actual
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">Tu caja está vacía.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <span>${item.name} ($${item.price.toFixed(2)})</span>
                    <button class="remove-item-btn" data-index="${index}">&#x2715;</button>
                `;
                cartItemsContainer.appendChild(itemDiv);
                total += item.price;
            });
        }

        cartTotalSpan.textContent = total.toFixed(2); // Actualiza el total
        checkoutBtn.disabled = cart.length < minItems; // Deshabilita/habilita el botón de checkout
    }

    // Event listeners para añadir items al carrito
    addProductBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card'); // Busca la tarjeta del producto padre
            const productName = productCard.querySelector('.product-title').textContent; // Obtiene el título
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '').replace(' MXN', '')); // Obtiene el precio

            cart.push({ name: productName, price: productPrice }); // Añade el producto al array
            updateCart(); // Actualiza la interfaz del carrito
        });
    });

    // Event listener para eliminar items del carrito
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const index = parseInt(event.target.dataset.index); // Obtiene el índice del item a eliminar
            cart.splice(index, 1); // Elimina el item del array
            updateCart(); // Actualiza la interfaz del carrito
        }
    });

    // --- Lógica para el cálculo de envío (Nacional e Internacional) ---
    const shippingTypeSelect = document.getElementById('shippingType');
    const nationalShippingFields = document.getElementById('nationalShippingFields');
    const internationalShippingFields = document.getElementById('internationalShippingFields');
    const calculateShippingBtn = document.getElementById('calculateShippingBtn');
    const zipCodeInput = document.getElementById('zipCode');
    const countrySelect = document.getElementById('countrySelect');
    const quantityInput = document.getElementById('quantity');
    const shippingCostResult = document.getElementById('shippingCostResult');
    const shippingDisclaimer = document.getElementById('shippingDisclaimer');

    // **Define tus tarifas de envío Nacional aquí**
    // Adapta estos rangos de códigos postales y precios a tus necesidades reales.
    const nationalShippingRates = {
        '00000-09999': { base: 80, perItem: 10, name: 'CDMX - Zona Central' },
        '10000-19999': { base: 95, perItem: 12, name: 'CDMX - Zona Sur/Poniente' },
        '20000-49999': { base: 120, perItem: 15, name: 'Centro de México (Puebla, Qro, EdoMex, etc.)' },
        '50000-99999': { base: 180, perItem: 20, name: 'Norte/Sur de México' },
        'default': { base: 250, perItem: 25, name: 'Otras Zonas Nacionales' }
    };

    // **Define tus tarifas de envío Internacional aquí**
    // Estos son EJEMPLOS. NECESITAS INVESTIGAR TUS TARIFAS REALES con la paquetería para cada país.
    const internationalShippingRates = {
        'US': { base: 35.00, perItem: 5.00, currency: 'USD' }, // Estados Unidos
        'CA': { base: 40.00, perItem: 6.00, currency: 'USD' }, // Canadá
        'DE': { base: 50.00, perItem: 7.00, currency: 'EUR' }, // Alemania
        'JP': { base: 55.00, perItem: 8.00, currency: 'JPY' }, // Japón (solo ejemplo, JPY es grande, ajustar)
        'FR': { base: 50.00, perItem: 7.00, currency: 'EUR' }, // Francia
        'GB': { base: 55.00, perItem: 8.00, currency: 'GBP' }, // Reino Unido
        'default': { base: 70.00, perItem: 10.00, currency: 'USD' } // Para cualquier otro país no especificado
    };

    // Función para alternar campos de envío
    shippingTypeSelect.addEventListener('change', () => {
        if (shippingTypeSelect.value === 'national') {
            nationalShippingFields.style.display = 'block';
            internationalShippingFields.style.display = 'none';
            shippingDisclaimer.style.display = 'none'; // Ocultar disclaimer internacional para envíos nacionales
            zipCodeInput.setAttribute('required', 'required'); // Hacer CP requerido para nacional
            countrySelect.removeAttribute('required'); // Quitar requerido para país internacional
        } else {
            nationalShippingFields.style.display = 'none';
            internationalShippingFields.style.display = 'block';
            shippingDisclaimer.style.display = 'block'; // Mostrar disclaimer internacional
            zipCodeInput.removeAttribute('required'); // Quitar requerido para CP
            countrySelect.setAttribute('required', 'required'); // Hacer país internacional requerido
        }
        // Limpiar resultado anterior al cambiar tipo
        shippingCostResult.textContent = '';
    });


    // Lógica para el botón de calcular envío
    calculateShippingBtn.addEventListener('click', () => {
        const shippingType = shippingTypeSelect.value;
        const quantity = parseInt(quantityInput.value);
        let cost = 0;
        let currency = 'MXN';
        let zoneName = '';
        let isValid = true;

        if (isNaN(quantity) || quantity < 1) {
            shippingCostResult.style.color = 'red';
            shippingCostResult.textContent = 'Por favor, ingresa una cantidad de cajas válida.';
            isValid = false;
        }

        if (isValid) {
            if (shippingType === 'national') {
                const zipCode = zipCodeInput.value.trim();
                if (!zipCode || !/^[0-9]{5}$/.test(zipCode)) {
                    shippingCostResult.style.color = 'red';
                    shippingCostResult.textContent = 'Por favor, ingresa un Código Postal válido (5 dígitos).';
                    isValid = false;
                } else {
                    let foundZone = false;
                    for (const range in nationalShippingRates) {
                        if (range === 'default') continue;
                        const [start, end] = range.split('-').map(Number);
                        const cpNum = parseInt(zipCode);

                        if (cpNum >= start && cpNum <= end) {
                            const rate = nationalShippingRates[range];
                            cost = rate.base + (rate.perItem * (quantity - 1));
                            zoneName = rate.name;
                            foundZone = true;
                            break;
                        }
                    }
                    if (!foundZone) {
                        const rate = nationalShippingRates['default'];
                        cost = rate.base + (rate.perItem * (quantity - 1));
                        zoneName = rate.name;
                    }
                    shippingCostResult.style.color = '#28a745';
                    shippingCostResult.textContent = `Costo de Envío a ${zoneName}: $${cost.toFixed(2)} ${currency}`;
                }
            } else { // international
                const selectedCountry = countrySelect.value;
                if (!selectedCountry) {
                    shippingCostResult.style.color = 'red';
                    shippingCostResult.textContent = 'Por favor, selecciona un país de destino.';
                    isValid = false;
                } else {
                    let rateInfo = internationalShippingRates[selectedCountry] || internationalShippingRates['default'];
                    cost = rateInfo.base + (rateInfo.perItem * (quantity - 1));
                    currency = rateInfo.currency;
                    zoneName = countrySelect.options[countrySelect.selectedIndex].text; // Nombre legible del país

                    shippingCostResult.style.color = '#28a745';
                    shippingCostResult.textContent = `Costo de Envío a ${zoneName}: ${currency} ${cost.toFixed(2)}`;
                }
            }
        }
    });


    // --- Lógica para filtrar productos por país de destino ---

    // Define tus restricciones aquí, basándote en tu tabla de Google Sheet.
    // Las claves son los data-product-id de tus productos en el HTML.
    // Los valores son un array de CÓDIGOS ISO de países donde ese producto está EXCLUIDO/PROHIBIDO.
    const productRestrictionsByCountry = {
        'de-la-rosa-mazapan': ['JP'], // De La Rosa Mazapán excluido en Japón
        'lucas-lucas-muecas': ['DE'], // Lucas Lucas Muecas excluido en Alemania
        'canels-gomitas': ['US', 'GB'], // Canel's Gomitas excluido en USA y Reino Unido
        'la-vaquita-cajeta-envinada': ['US', 'DE', 'JP', 'CA', 'FR'], // La Vaquita Cajeta Envinada excluido en USA, Alemania, Japón, Canadá, Francia
        // Si un dulce no está en esta lista o tiene un array vacío, se asume que está disponible en todos los países por defecto.
        // Ej: 'pelon-pelo-rico': [], // Si Pelon Pelo Rico no tiene restricciones
    };

    const customerCountrySelect = document.getElementById('customerCountry');
    const productCards = document.querySelectorAll('.product-card'); // Obtén todas las tarjetas de producto

    if (customerCountrySelect) { // Asegúrate de que el selector de país exista
        customerCountrySelect.addEventListener('change', filterProductsByCountry);

        // Llama a la función al cargar la página para aplicar el filtro inicial
        filterProductsByCountry();
    }

    function filterProductsByCountry() {
        const selectedCountry = customerCountrySelect.value; // Obtiene el valor del país seleccionado (ej. 'US', 'DE')

        productCards.forEach(card => {
            const productId = card.dataset.productId; // Obtiene el ID único del producto de la tarjeta HTML
            
            // Busca las restricciones para este producto. Si el producto no está en 'productRestrictionsByCountry',
            // o si su array está vacío, 'restrictedCountries' será undefined o un array vacío.
            const restrictedCountries = productRestrictionsByCountry[productId];

            // Lógica para mostrar/ocultar:
            // 1. Si no se ha seleccionado un país O el país es México, mostrar todos los productos.
            // 2. Si el producto tiene restricciones Y el país seleccionado está en la lista de restricciones, ocultarlo.
            // 3. En cualquier otro caso, mostrarlo.
            if (!selectedCountry || selectedCountry === 'MX') {
                card.style.display = ''; // Muestra el elemento
            } else if (restrictedCountries && restrictedCountries.includes(selectedCountry)) {
                card.style.display = 'none'; // Oculta el producto
            } else {
                card.style.display = ''; // Muestra el producto
            }
        });
    }

    // --- Inicializaciones al cargar la página ---
    updateCart(); // Inicializa el carrito
    shippingTypeSelect.dispatchEvent(new Event('change')); // Dispara el evento change para configurar campos de envío al cargar
});
