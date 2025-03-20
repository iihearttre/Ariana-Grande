const shop = {
    username: "truelovescats",
    products: [
        { id: 1, name: "T-Shirt", price: 19.99, image: "tshirt.jpg" },
        { id: 2, name: "Hoodie", price: 39.99, image: "hoodie.jpg" },
        { id: 3, name: "Jeans", price: 49.99, image: "jeans.jpg" },
        { id: 4, name: "Sweatpants", price: 29.99, image: "sweatpants.jpg" }
    ],
    cart: [],

    addToCart: function(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem) {
                alert(`${product.name} is already in the cart!`);
            } else {
                this.cart.push(product);
                this.updateCartUI();
            }
        }
    },

    removeFromCart: function(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
    },

    updateCartUI: function() {
        const cartList = document.getElementById("cart-items");
        const totalPrice = document.getElementById("cart-total");
        cartList.innerHTML = "";
        let total = 0;

        if (this.cart.length === 0) {
            cartList.innerHTML = "<p>Your cart is empty.</p>";
            totalPrice.textContent = "$0.00";
            return;
        }

        this.cart.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)}
                            <button onclick="shop.removeFromCart(${item.id})">Remove</button>`;
            cartList.appendChild(li);
            total += item.price;
        });

        totalPrice.textContent = `$${total.toFixed(2)}`;
    }
};

// Display products dynamically
document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("products");
    shop.products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="shop.addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });

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