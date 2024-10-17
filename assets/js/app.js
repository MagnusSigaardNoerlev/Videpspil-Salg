document.addEventListener('DOMContentLoaded', () => {
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

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const orderTotal = document.getElementById('order-total');
    const confirmOrder = document.getElementById('confirm-order');
    const newOrder = document.getElementById('new-order');

    let cart = [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
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
            productList.appendChild(productDiv);
        });
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <img src="./assets/img/cart-shopping-solid.svg" alt="svg af en vogn">
                    <p>Dine tilføjet varer bliver vist her</p>
                </div>`;
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <p>${item.name} x ${item.quantity}</p>
                    <p>DKK ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="removeButton" onclick="removeFromCart(${index})">x</button>`;
                cartItems.appendChild(cartItem);
                total += item.price * item.quantity;
            });
        }
        orderTotal.innerHTML = `Beløb i alt: <strong>DKK ${total.toFixed(2)}</strong>`;
    }

    window.addToCart = function(index) {
        const product = products[index];
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        renderCart();
    };

    confirmOrder.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Order confirmed! Thank you for your purchase.');
        } else {
            alert('Din kurv er tom. Tilføj nogle spil først!');
        }
    });

    newOrder.addEventListener('click', () => {
        cart = [];
        renderCart();
    });

    renderProducts();
    renderCart();
});
