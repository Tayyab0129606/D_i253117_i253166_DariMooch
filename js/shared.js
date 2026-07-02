// shared.js — Global Utilities

// In-memory catalog database for search suggestions on every page
const SEARCH_DATABASE = [
  { id: 'oil-01',   name: 'Beard Growth Oil Kit',     price: 2500, img: 'images/image1.png' },
  { id: 'balm-01',  name: 'Beard Nourishing Balm',   price: 3200, img: 'images/image2.png' },
  { id: 'wash-01',  name: 'Beard Cleanse Wash',       price: 2500, img: 'images/image3.png' },
  { id: 'oil-02',   name: 'Urban Beard Oil',          price: 2200, img: 'images/image5.png' },
  { id: 'oil-03',   name: 'Castor Beard Oil',         price: 1800, img: 'images/image6.png' },
  { id: 'oil-04',   name: 'Growth Blend Oil',         price: 2000, img: 'images/image7.png' },
  { id: 'balm-02',  name: 'Premium Lip Balm',         price: 800,  img: 'images/image8.png' },
  { id: 'styling-01', name: 'Matte Hair Clay',        price: 800,  img: 'images/image9.png' },
  { id: 'shampoo-01', name: 'Anti-Hairfall Shampoo',  price: 1500, img: 'images/image10.png' },
  { id: 'bundle-01', name: 'Starter Grooming Kit',    price: 3500, img: 'images/Beard_Growth_Bundle__1_-removebg-preview (1).png' },
  { id: 'bundle-02', name: 'Detox Bundle',            price: 2200, img: 'images/image11.png' },
  { id: 'bundle-03', name: 'Face Bundle',             price: 1500, img: 'images/image12.png' }
];

document.addEventListener('DOMContentLoaded', () => {
  initGlobalCart();
  initGlobalUserSession();
  initGlobalSearch();
  initStatsAnimation();
});

function initGlobalCart() {
  updateGlobalCartCount();
}

function updateGlobalCartCount() {
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { cart = []; }
  const total = cart.reduce((s, i) => s + (i.quantity || 1), 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  });
}

function addToCart(id, name, price, img, quantity = 1, silent = false) {
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch(e) { cart = []; }

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + quantity;
  } else {
    cart.push({ id, name, price: Number(price), img: img || 'images/image1.png', quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateGlobalCartCount();
  console.log('Cart updated:', cart);
  if (!silent) {
    alert(`"${name}" has been added to your cart! 🛍️`);
  }
}

// Global Buy Now Function to add and immediately checkout
window.buyNow = function(id, name, price, img) {
  addToCart(id, name, price, img, 1, true);
  console.log(`Buy Now triggered for "${name}". Redirecting to checkout...`);
  window.location.href = 'page10.html';
};

function initGlobalUserSession() {
  let session = null;
  try { session = JSON.parse(localStorage.getItem('userSession')); } catch(e) {}

  const rightSection = document.querySelector('.right-section');
  const userIcon = rightSection?.querySelector('.fa-regular.fa-user');
  if (!userIcon) return;

  if (session && session.email) {
    const prefix = session.email.split('@')[0];
    const menu = document.createElement('div');
    menu.className = 'user-menu icon-btn';
    menu.innerHTML = `
      <span>Hi, ${prefix}</span>
      <div class="user-dropdown">
        <button id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
      </div>`;
    userIcon.replaceWith(menu);

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      localStorage.removeItem('userSession');
      alert('You have been logged out.');
      location.reload();
    });
  } else {
    const link = document.createElement('a');
    link.href = 'pg2.html';
    link.className = 'icon-btn';
    link.innerHTML = '<i class="fa-regular fa-user"></i>';
    link.title = 'Login';
    userIcon.replaceWith(link);
  }
}

function initGlobalSearch() {
  document.querySelectorAll('.search-box').forEach(box => {
    const input = box.querySelector('input');
    if (!input) return;

    // Create suggestions container
    const suggContainer = document.createElement('div');
    suggContainer.className = 'search-suggestions';
    box.appendChild(suggContainer);

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      suggContainer.innerHTML = '';

      if (!q) {
        suggContainer.style.display = 'none';
        if (window.location.pathname.includes('pg3.html') && typeof currentFilters !== 'undefined') {
          currentFilters.search = '';
          renderProducts();
        }
        return;
      }

      const matches = SEARCH_DATABASE.filter(p => p.name.toLowerCase().includes(q));

      if (matches.length > 0) {
        suggContainer.style.display = 'block';
        suggContainer.innerHTML = matches.map(prod => `
          <div class="suggestion-item" onclick="window.location.href='pg4.html?id=${prod.id}'">
            <img src="${prod.img}" class="suggestion-img" alt="${prod.name}" onerror="this.src='images/image1.png'"/>
            <div class="suggestion-info">
              <span class="suggestion-name">${prod.name}</span>
              <span class="suggestion-price">PKR ${prod.price.toLocaleString()}</span>
            </div>
          </div>
        `).join('');
      } else {
        suggContainer.style.display = 'block';
        suggContainer.innerHTML = `<div style="padding:12px; font-size:12px; color:#888; text-align:center;">No items found</div>`;
      }

      if (window.location.pathname.includes('pg3.html') && typeof currentFilters !== 'undefined') {
        currentFilters.search = q;
        renderProducts();
      }
    });

    document.addEventListener('click', (e) => {
      if (!box.contains(e.target)) {
        suggContainer.style.display = 'none';
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q && !window.location.pathname.includes('pg3.html')) {
          window.location.href = `pg3.html?search=${encodeURIComponent(q)}`;
        }
      }
    });
  });

  document.querySelectorAll('.fa-search').forEach(icon => {
    icon.addEventListener('click', () => {
      const input = icon.closest('.search-box')?.querySelector('input');
      const q = input?.value.trim() || '';
      if (q && !window.location.pathname.includes('pg3.html')) {
        window.location.href = `pg3.html?search=${encodeURIComponent(q)}`;
      }
    });
  });
}

function initStatsAnimation() {
  const statNumbers = document.querySelectorAll('.stat-num, .stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetString = el.textContent.trim();
        const hasPlus = targetString.includes('+');
        const hasK = targetString.toLowerCase().includes('k');
        const hasYrs = targetString.toLowerCase().includes('yrs');
        
        let targetNum = parseInt(targetString.replace(/[^0-9]/g, ''), 10);
        if (isNaN(targetNum)) return;

        let start = 0;
        const duration = 1200;
        const steps = 30;
        const stepVal = Math.ceil(targetNum / steps);
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
          start += stepVal;
          if (start >= targetNum) {
            start = targetNum;
            clearInterval(timer);
          }
          let suffix = '';
          if (hasK) suffix += 'K';
          if (hasPlus) suffix += '+';
          if (hasYrs) suffix += ' Yrs';
          el.textContent = start + suffix;
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(num => observer.observe(num));
}
