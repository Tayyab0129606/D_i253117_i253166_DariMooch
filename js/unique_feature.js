// unique_feature.js — Grooming Recommended (ALIGNED & UPDATED WITH BUY NOW)

const ALL_PRODUCTS = [
  { id: 'oil-01',   name: 'Beard Growth Oil Kit',   price: 2500, img: 'images/image1.png',  tags: ['dry', 'patchy', 'short', 'oil'] },
  { id: 'balm-01',  name: 'Beard Nourishing Balm', price: 3200, img: 'images/image2.png',  tags: ['dry', 'normal', 'medium', 'long', 'balm'] },
  { id: 'wash-01',  name: 'Beard Cleanse Wash',    price: 2500, img: 'images/image3.png',  tags: ['oily', 'combination', 'wash', 'normal'] },
  { id: 'oil-02',   name: 'Urban Beard Oil',        price: 2200, img: 'images/image5.png',  tags: ['oily', 'combination', 'short', 'medium', 'oil'] },
  { id: 'oil-03',   name: 'Castor Beard Oil',       price: 1800, img: 'images/image6.png',  tags: ['patchy', 'dry', 'short', 'oil'] },
  { id: 'oil-04',   name: 'Growth Blend Oil',       price: 2800, img: 'images/image7.png',  tags: ['patchy', 'dry', 'long', 'medium', 'oil'] },
  { id: 'balm-02',  name: 'Premium Lip Balm',       price: 800,  img: 'images/image8.png',  tags: ['dry', 'normal', 'short', 'balm'] },
  { id: 'styling-01',name: 'Matte Hair Clay',       price: 800,  img: 'images/image9.png',  tags: ['normal', 'medium', 'short', 'balm'] },
  { id: 'shampoo-01',name:'Anti-Hairfall Shampoo',  price: 1500, img: 'images/image10.png', tags: ['oily', 'combination', 'normal', 'wash'] },
  { id: 'oil-05',   name: 'Premium Argan Oil',      price: 3500, img: 'images/image11.png', tags: ['dry', 'long', 'medium', 'oil', 'normal'] }
];

document.addEventListener('DOMContentLoaded', () => {
  console.log('Grooming Recommended page initialized.');
  const form = document.getElementById('blendQuiz');
  const results = document.getElementById('quizResults');
  if (!form || !results) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const length = document.getElementById('length')?.value;
    const health = document.getElementById('health')?.value;
    const skin   = document.getElementById('skin')?.value;
    const style  = document.getElementById('style')?.value;

    if (!length || !health || !skin || !style) {
      alert('Please answer all questions to get your personalized recommendation.');
      return;
    }

    console.log('Recommended answers:', { length, health, skin, style });

    const userTags = [length, health, skin, style];
    const scored = ALL_PRODUCTS.map(p => ({
      ...p,
      score: p.tags.filter(t => userTags.includes(t)).length
    })).sort((a, b) => b.score - a.score);

    const top3 = scored.slice(0, 3);
    renderResults(top3, results);
  });
});

function renderResults(products, container) {
  container.style.display = 'block';
  container.innerHTML = `
    <h2>Your Personalized <span>Recommendations</span></h2>
    <p class="results-sub">Based on your grooming profile, we recommend these products:</p>
    <div class="results-grid">
      ${products.map(p => `
        <div class="result-product-card">
          <div class="result-card-img">
            <img src="${p.img}" alt="${p.name}" onerror="this.src='images/image1.png'"/>
          </div>
          <div class="result-card-body">
            <div class="result-card-name">${p.name}</div>
            <div class="result-card-price">PKR ${p.price.toLocaleString()}</div>
            <div class="result-card-actions" style="display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; gap:6px; width:100%;">
                <a href="pg4.html?id=${p.id}" class="result-view-btn" style="flex:1; text-align:center;">Details</a>
                <button class="result-cart-btn" style="flex:1;" onclick="addToCartFromQuiz('${p.id}','${p.name}',${p.price},'${p.img}')">Add</button>
              </div>
              <button class="result-buy-now-btn" style="width:100%; background:var(--accent-color); color:#fff; border:none; border-radius:6px; padding:9px 12px; font-size:12px; font-weight:700; cursor:pointer; font-family:var(--font-primary); transition:var(--transition);" onclick="buyNow('${p.id}','${p.name}',${p.price},'${p.img}')">
                Buy Now
              </button>
            </div>
          </div>
        </div>`
      ).join('')}
    </div>`;

  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addToCartFromQuiz = function(id, name, price, img) {
  console.log(`Recommended item "${name}" added to cart.`);
  addToCart(id, name, price, img, 1);
};

// Add simple hover style for result buy now button
const style = document.createElement('style');
style.innerHTML = `
  .result-buy-now-btn:hover {
    background: var(--accent-hover) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(184,138,90,0.3);
  }
`;
document.head.appendChild(style);