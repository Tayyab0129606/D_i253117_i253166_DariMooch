// Log when Checkout page loads
console.log("Checkout page loaded successfully.");

// Payment method selection
document.querySelectorAll('.payment-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const method = btn.getAttribute('data-method');
    document.getElementById('selectedPayment').textContent = "Selected: " + method;
    alert("Payment method selected: " + method);
    console.log("Payment method chosen:", method);
  });
});

// Place order button
document.getElementById('placeOrderBtn').addEventListener('click', () => {
  alert("Your order has been placed successfully!");
  console.log("Order placed with items:", document.getElementById('orderItems').innerText);
});
