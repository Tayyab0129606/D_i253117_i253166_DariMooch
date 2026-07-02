// pg5.js — Shopping Cart Page

let appliedDiscountPercent = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  initPromoCode();
});

function renderCart() {
  const list = document.getElementById('cartItemsList');
  const summary = document.getElementById('summaryCard');
  const countText = document.getElementById('cartCountText');
  if (!list) return;

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { cart = []; }

  const totalItems = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  if (countText) countText.textContent = `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`;

  if (!cart.length) {
    list.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="pg3.html" class="btn">Shop Products →</a>
      </div>`;
    if (summary) summary.style.display = 'none';
    return;
  }

  if (summary) summary.style.display = 'block';

  list.innerHTML = cart.map(item => {
    const imgSrc = item.img || 'images/image1.png';
    const itemTotal = (item.price * (item.quantity || 1)).toLocaleString();
    return `
      <div class="cart-item-row">
        <img class="cart-item-img" src="${imgSrc}" alt="${item.name}" onerror="this.src='images/image1.png'"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-unit">Unit Price: PKR ${Number(item.price).toLocaleString()}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn" onclick="changeCartQty('${item.id}', -1)">−</button>
          <span class="cart-qty-display">${item.quantity || 1}</span>
          <button class="cart-qty-btn" onclick="changeCartQty('${item.id}', 1)">+</button>
        </div>
        <div class="cart-item-total">PKR ${itemTotal}</div>
        <button class="delete-btn" onclick="removeCartItem('${item.id}')" title="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>`;
  }).join('');

  calculateTotals(cart);
}

window.changeCartQty = function(id, change) {
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { cart = []; }
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].quantity = (cart[idx].quantity || 1) + change;
  if (cart[idx].quantity <= 0) {
    console.log(`Cart item "${id}" removed because quantity fell to 0.`);
    cart.splice(idx, 1);
  } else {
    console.log(`Cart item "${id}" quantity updated to ${cart[idx].quantity}.`);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateGlobalCartCount();
  renderCart();
};

window.removeCartItem = function(id) {
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { cart = []; }
  cart = cart.filter(i => i.id !== id);
  console.log(`Cart item "${id}" deleted completely.`);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateGlobalCartCount();
  renderCart();
};

function calculateTotals(cart) {
  const subtotal = cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const tax = Math.round(subtotal * 0.16);
  const discount = Math.round(subtotal * (appliedDiscountPercent / 100));
  const total = subtotal + shipping + tax - discount;

  const itemsText = cart.map(i => `${i.name} × ${i.quantity || 1}`).join(', ');

  document.getElementById('sumSubtotal').textContent = `PKR ${subtotal.toLocaleString()}`;
  document.getElementById('sumShipping').textContent = shipping === 0 ? 'FREE' : `PKR ${shipping}`;
  document.getElementById('sumTax').textContent = `PKR ${tax.toLocaleString()}`;
  document.getElementById('sumTotal').textContent = `PKR ${total.toLocaleString()}`;

  const discRow = document.getElementById('discountRow');
  if (discRow) {
    discRow.style.display = discount > 0 ? 'flex' : 'none';
    const discEl = document.getElementById('sumDiscount');
    if (discEl) discEl.textContent = `− PKR ${discount.toLocaleString()}`;
  }

  const orderPricing = { subtotal: `PKR ${subtotal.toLocaleString()}`, shipping: shipping === 0 ? 'FREE' : `PKR 200`, tax: `PKR ${tax.toLocaleString()}`, total: `PKR ${total.toLocaleString()}`, itemsText };
  localStorage.setItem('orderPricing', JSON.stringify(orderPricing));
  console.log('Calculated Cart Totals:', orderPricing);
}

function initPromoCode() {
  const btn = document.getElementById('applyPromoBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const code = (document.getElementById('promoInput')?.value || '').trim().toUpperCase();
    if (!code) {
      alert('Please enter a promo code.');
      return;
    }
    if (code === 'DARIMOOCH30') {
      appliedDiscountPercent = 30;
      alert("Promo Code 'DARIMOOCH30' applied! 30% discount has been deducted from your subtotal.");
      console.log('Discount code validated successfully: 30% discount applied.');
    } else {
      appliedDiscountPercent = 0;
      alert("Invalid Promo Code. Try 'DARIMOOCH30' for 30% off!");
    }
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { cart = []; }
    calculateTotals(cart);
  });
}
