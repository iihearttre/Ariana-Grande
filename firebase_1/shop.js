const shop = {
    username: "truelovescats",
    products: [
        { id: 1, name: "star corset", price: 10.00, image: "starcorset.jpg" },
        { id: 2, name: "heart Hoodie", price: 15.54, image: "hoodie.jpg" },
        { id: 3, name: "flare Jeans", price: 19.99, image: "flare.jpg" },
        {id: 4, name: "oversized Sweatpants", price: 17.89, image: "sweat.jpg" },
        

    ],
    cart: [],

    addToCart: function(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item already in cart
            } else {
                this.cart.push({...product, quantity: 1}); // Add product with quantity 1
            }
            this.updateCartUI();
        }
    },

    removeFromCart: function(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
    },

    updateCartUI: function() {
        const cartList = document.getElementById("cart-items");
        const totalPrice = document.getElementById("cart-total");
        const totalQuantity = document.getElementById("cart-quantity");
        cartList.innerHTML = "";
        let total = 0;
        let quantity = 0;

        if (this.cart.length === 0) {
            cartList.innerHTML = "<p>Your cart is empty.</p>";
            totalPrice.textContent = "$0.00";
            totalQuantity.textContent = "0 item(s)";
            return;
        }

        this.cart.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"/>
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove-btn" data-id="${item.id}">Remove</button>
                <button class="increase-btn" data-id="${item.id}">+</button>
                <button class="decrease-btn" data-id="${item.id}">-</button>
            `;
            cartList.appendChild(li);
            total += item.price * item.quantity;
            quantity += item.quantity;
        });

        totalPrice.textContent = `$${total.toFixed(2)}`;
        totalQuantity.textContent = `${quantity} item(s)`;
        
        // Attach event listeners after updating the UI
        this.addCartEventListeners();
    },

    updateQuantity: function(productId, action) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }
            this.updateCartUI();
        }
    },

    addCartEventListeners: function() {
        // Add event listeners for removing, increasing, and decreasing items in the cart
        const removeBtns = document.querySelectorAll('.remove-btn');
        const increaseBtns = document.querySelectorAll('.increase-btn');
        const decreaseBtns = document.querySelectorAll('.decrease-btn');

        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.removeFromCart(productId);
            });
        });

        increaseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.updateQuantity(productId, 'increase');
            });
        });

        decreaseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.updateQuantity(productId, 'decrease');
            });
        });
    }
};

// Display products dynamically
document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("products");
    shop.products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px;">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(div);
    });

    // Add event listeners for Add to Cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            shop.addToCart(productId);
        });
    });

    // Checkout button functionality
    document.getElementById("checkout-btn").addEventListener("click", function() {
        if (shop.cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert(`Thank you for shopping, ${shop.username}! Your total is ${document.getElementById("cart-total").textContent}.`);
            shop.cart = [];
            shop.updateCartUI();
        }
    });
});

// Handle opening the cart modal
function openCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Function to close the modal after checkout
function checkout() {
    alert("Thank you for shopping with us!");
    shop.cart = [];
    shop.updateCartUI();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.hide();
}
