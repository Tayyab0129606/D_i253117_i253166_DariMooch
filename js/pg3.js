// pg3.js — Product Listing Page (ALIGNED AND CORRECTED WITH BUY NOW)

const PRODUCTS_DATA = [
  { id: 'oil-01',   name: 'Beard Growth Oil Kit',    price: 2500, category: 'oils',    rating: 5, img: 'images/image1.png',  desc: 'Organic argan & jojoba growth blend to stimulate roots.' },
  { id: 'balm-01',  name: 'Beard Nourishing Balm',   price: 3200, category: 'balms',   rating: 5, img: 'images/image2.png',  desc: 'Conditioning shea butter balm that tames and softens beard hair.' },
  { id: 'wash-01',  name: 'Beard Cleanse Wash',       price: 2500, category: 'wash',    rating: 4, img: 'images/image3.png',  desc: 'Gentle sulfate-free wash designed specifically for facial skin.' },
  { id: 'oil-02',   name: 'Urban Beard Oil',          price: 2200, category: 'oils',    rating: 4, img: 'images/image5.png',  desc: 'Light daily oil with a premium sandalwood aroma.' },
  { id: 'oil-03',   name: 'Castor Beard Oil',         price: 1800, category: 'oils',    rating: 4, img: 'images/image6.png',  desc: 'Castor blend targeted to fill patchy areas and increase volume.' },
  { id: 'oil-04',   name: 'Growth Blend Oil',         price: 2000, category: 'oils',    rating: 5, img: 'images/image7.png',  desc: 'Seven organic botanical oils for thick beard growth.' },
  { id: 'balm-02',  name: 'Premium Lip Balm',         price: 800,  category: 'balms',   rating: 4, img: 'images/image8.png',  desc: 'Moisturizing mint balm to soothe and protect dry lips.' },
  { id: 'styling-01', name: 'Matte Hair Clay',        price: 800,  category: 'styling', rating: 4, img: 'images/image9.png',  desc: 'Strong hold kaolin clay wax with a natural matte finish.' },
  { id: 'shampoo-01', name: 'Anti-Hairfall Shampoo',  price: 1500, category: 'wash',    rating: 4, img: 'images/image10.png', desc: 'Biotin and keratin shampoo designed to reduce hair fall.' },
  { id: 'bundle-01', name: 'Starter Grooming Kit',    price: 3500, category: 'bundles', rating: 5, img: 'images/Beard_Growth_Bundle__1_-removebg-preview (1).png', desc: 'Ultimate bundle: Beard Growth Oil Kit, Beard Balm, and Cleanse Wash.' },
  { id: 'bundle-02', name: 'Detox Bundle',            price: 2200, category: 'bundles', rating: 5, img: 'images/image11.png', desc: 'Deep purifying charcoal wash and exfoliating face scrub bundle.' },
  { id: 'bundle-03', name: 'Face Bundle',             price: 1500, category: 'bundles', rating: 4, img: 'images/image12.png', desc: 'Hydrating face wash and daily moisturizer set.' }
];

const currentFilters = { category: 'all', search: '', sort: 'default' };

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  parseUrlParams();
  renderProducts();
});

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  const cat = params.get('category');
  if (search) {
    currentFilters.search = search.trim().toLowerCase();
    document.querySelectorAll('.search-box input').forEach(input => {
      input.value = search.trim();
    });
  }
  if (cat) {
    currentFilters.category = cat;
    updateActiveCategoryUI(cat);
  }
}

function initFilters() {
  document.querySelectorAll('.filter-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentFilters.category = link.dataset.category || 'all';
      updateActiveCategoryUI(currentFilters.category);
      renderProducts();
      console.log('Category filter changed to:', currentFilters.category);
    });
  });

  const sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      currentFilters.sort = sortSel.value;
      renderProducts();
      console.log('Sorting changed to:', currentFilters.sort);
    });
  }
}

function updateActiveCategoryUI(cat) {
  document.querySelectorAll('.filter-list a').forEach(a => {
    a.classList.toggle('active', (a.dataset.category || 'all') === cat);
  });
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const info = document.getElementById('resultsInfo');
  if (!grid) return;

  let list = [...PRODUCTS_DATA];

  // Filter by category
  if (currentFilters.category !== 'all') {
    list = list.filter(p => p.category === currentFilters.category);
  }

  // Filter by search (case-insensitive)
  if (currentFilters.search) {
    const q = currentFilters.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
  }

  // Sort
  if (currentFilters.sort === 'price-low')   list.sort((a, b) => a.price - b.price);
  if (currentFilters.sort === 'price-high')  list.sort((a, b) => b.price - a.price);
  if (currentFilters.sort === 'name-asc')    list.sort((a, b) => a.name.localeCompare(b.name));
  if (currentFilters.sort === 'rating-desc') list.sort((a, b) => b.rating - a.rating);

  // Results info
  if (info) {
    if (currentFilters.search || currentFilters.category !== 'all') {
      const label = currentFilters.search
        ? `"${currentFilters.search}"`
        : `<strong>${currentFilters.category}</strong>`;
      info.style.display = 'flex';
      info.innerHTML = `Showing <strong>${list.length}</strong> result${list.length !== 1 ? 's' : ''} for ${label}
        &nbsp;<a href="pg3.html" onclick="clearAllSearchFilters(event)">✕ Clear filter</a>`;
    } else {
      info.style.display = 'none';
    }
  }

  // Render cards
  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fa-regular fa-face-frown"></i>
        <h3>No products found</h3>
        <p>Try a different search or category.</p>
        <a href="pg3.html" onclick="clearAllSearchFilters(event)" class="btn" style="margin-top:16px;display:inline-block;">View All Products</a>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((prod, i) => {
    const stars = Array.from({ length: 5 }, (_, j) =>
      `<i class="${j < prod.rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`
    ).join('');

    return `
      <div class="product-card" style="animation-delay:${i * 0.05}s;">
        <div class="product-card-img" onclick="goToProductDetail('${prod.id}')">
          <img src="${prod.img}" alt="${prod.name}" onerror="this.src='images/image1.png'"/>
        </div>
        <div class="product-card-body">
          <div class="product-card-name" onclick="goToProductDetail('${prod.id}')">${prod.name}</div>
          <div class="product-card-rating">${stars} <span>(${prod.rating * 50}+)</span></div>
          <p style="font-size:12px;color:#777;margin-bottom:8px;line-height:1.5;min-height:36px;">${prod.desc}</p>
          <div class="product-card-footer" style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:between; width:100%; align-items:center;">
              <span class="product-card-price">PKR ${prod.price.toLocaleString()}</span>
            </div>
            <div style="display:flex; gap:6px; width:100%;">
              <button class="buy-btn" style="flex:1;" onclick="addToCart('${prod.id}','${prod.name}',${prod.price},'${prod.img}')">
                <i class="fa-solid fa-bag-shopping"></i> Add
              </button>
              <button class="buy-now-btn" style="flex:1.2; background:var(--accent-color); color:#fff; border:none; padding:8px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; font-family:var(--font-primary); transition:var(--transition);" onclick="buyNow('${prod.id}','${prod.name}',${prod.price},'${prod.img}')">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

window.clearAllSearchFilters = function(e) {
  if (e) e.preventDefault();
  currentFilters.search = '';
  currentFilters.category = 'all';
  document.querySelectorAll('.search-box input').forEach(input => input.value = '');
  updateActiveCategoryUI('all');
  renderProducts();
};

function goToProductDetail(id) {
  window.location.href = `pg4.html?id=${id}`;
}
// Add simple hover scale to buy-now button
const style = document.createElement('style');
style.innerHTML = `
  .buy-now-btn:hover {
    background: var(--accent-hover) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(184,138,90,0.3);
  }
`;
document.head.appendChild(style);
