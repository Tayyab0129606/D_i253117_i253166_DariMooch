// pg7.js — Order Confirmation Page

document.addEventListener('DOMContentLoaded', () => {
  console.log('Order Success page loaded. Fetching order details from localStorage.');

  let pricing = null;
  let lastOrder = null;
  try { pricing = JSON.parse(localStorage.getItem('orderPricing')); } catch(e) {}
  try { lastOrder = JSON.parse(localStorage.getItem('lastOrder')); } catch(e) {}

  // Only show success alert if there is actual order data (not a refresh)
  const hasOrder = pricing || lastOrder;

  document.getElementById('orderRef').textContent = lastOrder?.ref || 'DM-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('orderName').textContent = lastOrder?.name || 'Valued Customer';
  document.getElementById('orderItems').textContent = pricing?.itemsText || 'Grooming essentials';
  document.getElementById('orderSubtotal').textContent = pricing?.subtotal || '—';
  document.getElementById('orderShipping').textContent = pricing?.shipping || '—';
  document.getElementById('orderTax').textContent = pricing?.tax || '—';
  document.getElementById('orderTotal').textContent = pricing?.total || '—';

  console.log('Order details rendered:', pricing, lastOrder);

  // Animate timeline progress
  setTimeout(() => {
    const bar = document.getElementById('timelineProgress');
    if (bar) bar.style.width = '33%';
  }, 500);

  // Only alert + clean up if this is a fresh order load (not a refresh)
  if (hasOrder) {
    alert('🎉 Order placed successfully! Thank you for shopping with Dari Mooch. Your grooming essentials are on their way!');
    console.log('Cart cleared after successful order placement.');
    localStorage.removeItem('cart');
    localStorage.removeItem('orderPricing');
    localStorage.removeItem('lastOrder');
    updateGlobalCartCount();
  }
});
