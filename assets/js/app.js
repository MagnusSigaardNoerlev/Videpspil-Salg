document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { "image": "./assets/img/image-waffle-desktop.jpg", "name": "Cristiano Ronaldo", "category": "Match Attack", "price": 6.50 },
        { "image": "./assets/img/image-creme-brulee-desktop.jpg", "name": "Vanilla Bean Crème Brûlée", "category": "Crème Brûlée", "price": 7.00 },
        { "image": "./assets/img/image-macaron-desktop.jpg", "name": "Macaron Mix of Five", "category": "Macaron", "price": 8.00 },
        { "image": "./assets/img/image-tiramisu-desktop.jpg", "name": "Classic Tiramisu", "category": "Tiramisu", "price": 5.50 },
        { "image": "./assets/img/image-baklava-desktop.jpg", "name": "Pistachio Baklava", "category": "Baklava", "price": 4.00 },
        { "image": "./assets/img/image-meringue-desktop.jpg", "name": "Lemon Meringue Pie", "category": "Pie", "price": 5.00 },
        { "image": "./assets/img/image-cake-desktop.jpg", "name": "Red Velvet Cake", "category": "Cake", "price": 4.50 },
        { "image": "./assets/img/image-brownie-desktop.jpg", "name": "Salted Caramel Brownie", "category": "Brownie", "price": 4.50 },
        { "image": "./assets/img/image-panna-cotta-desktop.jpg", "name": "Vanilla Panna Cotta", "category": "Panna Cotta", "price": 6.50 }
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
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${index})">
                    Add to Cart
                </button>
                <div class="quantity-selector" id="quantity-selector-${index}">
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span class="quantity-display" id="quantity-${index}">1</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
            `;
            productList.appendChild(productDiv);
        });
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <img src="./assets/img/illustration-empty-cart.svg" alt="Empty Cart">
                    <p>Your added items will appear here</p>
                </div>
            `;
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <p>${item.name} x ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="removeButton" onclick="removeFromCart(${index})">x</button>
                `;
                cartItems.appendChild(cartItem);
                total += item.price * item.quantity;
            });
        }
        cartCount.textContent = cart.length;
        orderTotal.textContent = total.toFixed(2);

        // Display total in a formatted style
        const totalSection = document.querySelector('.cart-total');
        totalSection.innerHTML = `Order Total: <strong>$${total.toFixed(2)}</strong>`;
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
        showQuantitySelector(index);
    };

    function showQuantitySelector(index) {
        const quantitySelector = document.getElementById(`quantity-selector-${index}`);
        quantitySelector.style.display = 'flex';
    }

    window.increaseQuantity = function(index) {
        const existingItem = cart.find(item => item.name === products[index].name);
        if (existingItem) {
            existingItem.quantity++;
            document.getElementById(`quantity-${index}`).textContent = existingItem.quantity;
        }
        renderCart();
    };

    window.decreaseQuantity = function(index) {
        const existingItem = cart.find(item => item.name === products[index].name);
        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity--;
            document.getElementById(`quantity-${index}`).textContent = existingItem.quantity;
        } else if (existingItem && existingItem.quantity === 1) {
            cart = cart.filter(item => item.name !== products[index].name);
            document.getElementById(`quantity-selector-${index}`).style.display = 'none';
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
            alert('Your cart is empty. Add some items first!');
        }
    });

    newOrder.addEventListener('click', () => {
        cart = [];
        renderCart();
    });

    renderProducts();
    renderCart();
});