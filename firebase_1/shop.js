// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import {
  getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your web app's Firebase configuration (update with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyD7xioBWpKaTYkNR5pnZa37ayO1Ul9fsmU",
  authDomain: "tres-1dcc8.firebaseapp.com",
  projectId: "tres-1dcc8",
  storageBucket: "tres-1dcc8.firebasestorage.app",
  messagingSenderId: "769925689530",
  appId: "1:769925689530:web:aa2673f5712b3bf8be5283",
  measurementId: "G-ZB5JX0VLEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Shop logic with Firestore integration
const shop = {
  username: "truelovescats",
  products: [
    { id: 1, name: "star corset", price: 10.00, image: "starcorset.jpg" },
    { id: 2, name: "heart Hoodie", price: 15.54, image: "hoodie.jpg" },
    { id: 3, name: "flare Jeans", price: 19.99, image: "flare.jpg" },
    { id: 4, name: "oversized Sweatpants", price: 17.89, image: "sweat.jpg" },
  ],
  cart: [],

  async addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    await this.saveCartToFirestore();
    this.updateCartUI();
  },

  async removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    await this.saveCartToFirestore();
    this.updateCartUI();
  },

  async updateQuantity(productId, action) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (action === 'increase') {
        item.quantity += 1;
      } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
      }
      await this.saveCartToFirestore();
      this.updateCartUI();
    }
  },

  updateCartUI() {
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

    this.addCartEventListeners();
  },

  addCartEventListeners() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        this.removeFromCart(productId);
      });
    });

    document.querySelectorAll('.increase-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        this.updateQuantity(productId, 'increase');
      });
    });

    document.querySelectorAll('.decrease-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        this.updateQuantity(productId, 'decrease');
      });
    });
  },

  async saveCartToFirestore() {
    const user = auth.currentUser;
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await setDoc(cartRef, { cart: this.cart });
  },

  async loadCartFromFirestore() {
    const user = auth.currentUser;
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    const docSnap = await getDoc(cartRef);
    if (docSnap.exists()) {
      this.cart = docSnap.data().cart || [];
      this.updateCartUI();
    }
  },

  async clearCartFromFirestore() {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "carts", user.uid));
    this.cart = [];
    this.updateCartUI();
  }
};

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
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

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id);
      shop.addToCart(productId);
    });
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async function () {
      if (shop.cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        alert(`Thanks ${shop.username}! Total: ${document.getElementById("cart-total").textContent}`);
        await shop.clearCartFromFirestore();
      }
    });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      shop.username = user.displayName || "user";
      await shop.loadCartFromFirestore();
    } else {
      alert("Please log in to use the cart.");
    }
  });
});

// Modal control function (export if needed)
export function openCart() {
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}
