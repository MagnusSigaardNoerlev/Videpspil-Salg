document.addEventListener('DOMContentLoaded', () => {
    // Når DOM-indholdet er fuldt indlæst, startes denne funktion.
    // Det sikrer, at koden ikke forsøger at manipulere DOM, før alt er indlæst.

    // Definerer en liste over produkter, hver med et billede, navn, kategori og pris.
    const products = [
        { "image": "./assets/img/ac-ezio.jpeg", "name": "Assassins Creed: The Ezio Collection", "category": "PS4", "price": 16.50 },
        { "image": "./assets/img/ac-unity.jpeg", "name": "Assassins Creed: Unity", "category": "PS4", "price": 6.50 },
        { "image": "./assets/img/euro08.jpeg", "name": "EURO: 2008", "category": "PS2", "price": 2.50 },
        { "image": "./assets/img/fifa05.jpeg", "name": "FIFA: 2005", "category": "PS2", "price": 2.50 },
        { "image": "./assets/img/fifa09.jpeg", "name": "FIFA: 09", "category": "PS2", "price": 2.50 },
        { "image": "./assets/img/hp.jpeg", "name": "Harry Potter: 5", "category": "Wii", "price": 7.50 },
        { "image": "./assets/img/pes09.jpeg", "name": "PES: 09", "category": "PS2", "price": 2.50 },
        { "image": "./assets/img/pes11.jpeg", "name": "PES: 2011", "category": "PS2", "price": 2.50 },
    ];

    // Finder HTML-elementer fra DOM'en ved deres id'er og gemmer dem som variabler.
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const orderTotal = document.getElementById('order-total');
    const confirmOrder = document.getElementById('confirm-order');
    const newOrder = document.getElementById('new-order');

    // Opretter et tom array til kurven, som skal holde de produkter, brugeren tilføjer.
    let cart = [];

    // Funktion til at vise produkterne på siden. Den sletter først indholdet i 'productList', 
    // og dernæst tilføjes hvert produkt i DOM'en med en 'Tilføj til kurv' knap.
    function renderProducts() {
        productList.innerHTML = ''; // Tømmer produktlisten.
        products.forEach((product, index) => {
            // Opretter et nyt div-element for hvert produkt.
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            // Indsætter produktets billede, kategori, navn og pris i HTML-strukturen.
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <p>${product.category}</p>
                    <h3>${product.name}</h3>
                    <p>DKK ${product.price.toFixed(2)}</p>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${index})">
                    Tilføj til kurv
                </button>`;
            // Tilføjer det nye div-element til produktlisten.
            productList.appendChild(productDiv);
        });
    }

    // Funktion til at vise indholdet i kurven og opdatere det samlede beløb.
    function renderCart() {
        cartItems.innerHTML = ''; // Tømmer kurv-området.
        let total = 0; // Initialiserer den samlede pris til 0.
        if (cart.length === 0) {
            // Hvis kurven er tom, vis en besked og et billede.
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <img src="./assets/img/cart-shopping-solid.svg" alt="svg af en vogn">
                    <p>Dine tilføjet varer bliver vist her</p>
                </div>`;
        } else {
            // Hvis der er produkter i kurven, gennemgås hvert element.
            cart.forEach((item, index) => {
                // Opretter et div-element til hvert produkt i kurven.
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                // Indsætter produktets navn, antal og pris i HTML-strukturen, samt en fjern-knap.
                cartItem.innerHTML = `
                    <p>${item.name} x ${item.quantity}</p>
                    <p>DKK ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="removeButton" onclick="removeFromCart(${index})">x</button>`;
                // Tilføjer det nye cart-item til kurven.
                cartItems.appendChild(cartItem);
                // Opdaterer det samlede beløb for varerne i kurven.
                total += item.price * item.quantity;
            });
        }
        // Viser det samlede beløb nederst i kurven.
        orderTotal.innerHTML = `Beløb i alt: <strong>DKK ${total.toFixed(2)}</strong>`;
    }

    // Funktion til at tilføje et produkt til kurven. 
    window.addToCart = function(index) {
        const product = products[index]; // Henter det valgte produkt ud fra dets index.
        const existingItem = cart.find(item => item.name === product.name); // Tjekker om produktet allerede er i kurven.
        if (existingItem) {
            existingItem.quantity++; // Hvis produktet allerede findes, øges dets antal med 1.
        } else {
            cart.push({ ...product, quantity: 1 }); // Hvis produktet ikke er i kurven, tilføjes det med quantity = 1.
        }
        renderCart(); // Opdaterer kurven efter tilføjelsen.
    };

    // Funktion til at fjerne et produkt fra kurven.
    window.removeFromCart = function(index) {
        cart.splice(index, 1); // Fjerner produktet fra kurven ved dets index.
        renderCart(); // Opdaterer kurven efter fjernelsen.
    };

    // Event handler for 'Bekræft bestilling'-knappen. Viser en besked, hvis kurven ikke er tom.
    confirmOrder.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Bestilling bekræftet! Tak for dit køb.');
        } else {
            alert('Din kurv er tom. Tilføj nogle spil først!');
        }
    });

    // Event handler for 'Start ny bestilling'-knappen. Tømmer kurven og opdaterer visningen.
    newOrder.addEventListener('click', () => {
        cart = []; // Tømmer kurven.
        renderCart(); // Opdaterer kurven, så den nu er tom.
    });

    // Kalder funktionerne ved opstart for at vise produkterne og kurven (tom til at starte med).
    renderProducts();
    renderCart();
});
