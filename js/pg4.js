// pg4.js — Product Detail Page (FIXED & CUSTOMIZED PER PRODUCT)

const CATALOG = {
  'oil-01': {
    name: 'Beard Growth Oil Kit',
    price: 2500,
    cat: 'Beard Oils',
    img: 'images/image1.png',
    desc: 'Our signature cold-pressed argan & jojoba blend promotes thick, lustrous beard growth from root to tip, eliminating patchiness and conditioning facial hair.',
    specs: 'Volume: 100ml / 3.4 fl. oz.<br/>Ingredients: Organic Jojoba Oil, Argan Oil, Vitamin E, Tea Tree Extract<br/>Suitable For: Patchy & dry beards<br/>Usage: Apply 4-6 drops daily after washing.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'balm-01': {
    name: 'Beard Nourishing Balm',
    price: 3200,
    cat: 'Beard Balms',
    img: 'images/image2.png',
    desc: 'Deep conditioning shea butter balm that softens coarse beard hair, tames flyaways, and provides all-day moisture with a light styling hold.',
    specs: 'Weight: 50g / 1.7 oz<br/>Ingredients: Beeswax, Pure Shea Butter, Sweet Almond Oil, Cedarwood essential oil<br/>Suitable For: Dry, coarse, and curly beard hair<br/>Usage: Scoop a dime-sized amount, melt between palms, and apply.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'wash-01': {
    name: 'Beard Cleanse Wash',
    price: 2500,
    cat: 'Beard Wash',
    img: 'images/image3.png',
    desc: 'Gentle, sulfate-free beard wash designed to cleanse thoroughly without stripping your beard and skin of their natural moisturizing oils.',
    specs: 'Volume: 120ml / 4 fl. oz.<br/>Ingredients: Aloe Vera Juice, Chamomile Extract, Pro-Vitamin B5, Sandalwood oil<br/>Suitable For: Sensitive skin & regular cleaning<br/>Usage: Lather into wet beard, massage for 60 seconds, and rinse.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'oil-02': {
    name: 'Urban Beard Oil',
    price: 2200,
    cat: 'Beard Oils',
    img: 'images/image5.png',
    desc: 'A light, non-greasy sandalwood & cedarwood formula for the urban professional — absorbs fast, styling your beard with a subtle, premium scent.',
    specs: 'Volume: 30ml / 1 fl. oz.<br/>Ingredients: Grapeseed Oil, Apricot Kernel Oil, Sandalwood Essential Oil<br/>Suitable For: Daily office styling & light scenting<br/>Usage: Apply 3-4 drops in the morning.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'oil-03': {
    name: 'Castor Beard Oil',
    price: 1800,
    cat: 'Beard Oils',
    img: 'images/image6.png',
    desc: 'Dense castor oil blend specifically formulated to target patchy spots, reduce hair breakage, and boost follicle density over time.',
    specs: 'Volume: 30ml / 1 fl. oz.<br/>Ingredients: Cold-pressed Castor Oil, Olive Oil, Peppermint Extract<br/>Suitable For: Patchy areas & growth boosting<br/>Usage: Massage directly onto skin patches before sleeping.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'oil-04': {
    name: 'Growth Blend Oil',
    price: 2000,
    cat: 'Beard Oils',
    img: 'images/image7.png',
    desc: 'Premium 7-oil power growth blend featuring black seed and rosemary to stimulate blood circulation and accelerate healthy, thick growth.',
    specs: 'Volume: 50ml / 1.7 fl. oz.<br/>Ingredients: Black Seed Oil, Rosemary Oil, Peppermint Oil, Avocado Oil, Jojoba Oil<br/>Suitable For: All beard styles & slow growers<br/>Usage: Massage 4-5 drops into beard roots daily.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'balm-02': {
    name: 'Premium Lip Balm',
    price: 800,
    cat: 'Beard Balms',
    img: 'images/image8.png',
    desc: 'Deeply moisturizing, non-greasy lip balm made with organic beeswax and cooling peppermint to soothe dry, chapped lips and maintain moisture.',
    specs: 'Weight: 15g / 0.5 oz<br/>Ingredients: Organic Beeswax, Coconut Oil, Vitamin E, Menthol<br/>Suitable For: Chapped, dry, and wind-burned lips<br/>Usage: Glide evenly over lips as needed.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'styling-01': {
    name: 'Matte Hair Clay',
    price: 800,
    cat: 'Hair Styling',
    img: 'images/image9.png',
    desc: 'High-performance matte hair clay that offers strong, re-workable hold and a natural textured finish for effortless modern hairstyles.',
    specs: 'Weight: 50g / 1.7 oz<br/>Ingredients: Kaolin Clay, Bentonite, Organic Beeswax, Sandalwood essence<br/>Suitable For: Textured styles, short to medium length hair<br/>Usage: Rub a small amount in hands, work through dry or damp hair.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'shampoo-01': {
    name: 'Anti-Hairfall Shampoo',
    price: 1500,
    cat: 'Hair Care',
    img: 'images/image10.png',
    desc: 'Biotin and keratin-infused cleansing shampoo that strengthens hair shafts from the root, dramatically reducing hairfall from the first week of use.',
    specs: 'Volume: 250ml / 8.4 fl. oz.<br/>Ingredients: Biotin, Hydrolyzed Keratin, Argan Extract, Caffeine<br/>Suitable For: Thinning, weak hair<br/>Usage: Apply to wet hair, lather well, leave for 2 minutes, and rinse.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'bundle-01': {
    name: 'Starter Grooming Kit',
    price: 3500,
    cat: 'Bundles',
    img: 'images/Beard_Growth_Bundle__1_-removebg-preview (1).png',
    desc: 'The ultimate all-in-one grooming starter pack: containing our famous Beard Growth Oil Kit, Beard Balm, and Beard Wash. Absolute essentials for every beard.',
    specs: 'Contents: Beard Oil Kit (50ml), Nourishing Balm (50g), Cleanse Wash (120ml)<br/>Includes: Signature magnetic box & styling comb<br/>Save: Save 20% compared to buying individually.',
    shipping: 'FREE SHIPPING across Pakistan (since order exceeds PKR 2,000).<br/>Delivered in premium gift packaging within 3-5 business days.'
  },
  'bundle-02': {
    name: 'Detox Bundle',
    price: 2200,
    cat: 'Bundles',
    img: 'images/image11.png',
    desc: 'A deep cleansing and detoxifying combination designed to clear impurities from skin and beard, leaving you refreshed.',
    specs: 'Contents: Activated Charcoal Beard Wash, Exfoliating Face Scrub<br/>Suitable For: Oily skin & heavy product builders<br/>Usage: Use wash daily, scrub 2-3 times a week.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  },
  'bundle-03': {
    name: 'Face Bundle',
    price: 1500,
    cat: 'Bundles',
    img: 'images/image12.png',
    desc: 'Complete face wash and moisturizer set to keep your facial skin hydrated, smooth, and free of excess oil.',
    specs: 'Contents: Gentle Face Wash, Oil-Free Moisturizer<br/>Suitable For: Daily morning and evening skin routines<br/>Usage: Wash face first, then apply moisturizer.',
    shipping: 'Standard Shipping: 3-5 Business Days (PKR 200)<br/>FREE Shipping on orders over PKR 2,000.<br/>Hassle-free 14-day replacement warranty.'
  }
};

let currentProductId = 'oil-01';
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
  initTabLinks();
});

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id && CATALOG[id]) currentProductId = id;

  const prod = CATALOG[currentProductId];
  if (!prod) return;

  document.getElementById('prodTitle').textContent = prod.name;
  document.getElementById('prodPrice').textContent = `PKR ${prod.price.toLocaleString()}`;
  document.getElementById('prodDesc').textContent = prod.desc;
  document.getElementById('mainImg').src = prod.img;
  document.getElementById('mainImg').alt = prod.name;

  // Custom descriptions & specs in tabs
  const tabDetails = document.getElementById('tab-details');
  const tabSpecs = document.getElementById('tab-specs');
  const tabShipping = document.getElementById('tab-shipping');
  if (tabDetails) tabDetails.innerHTML = `<p>${prod.desc}</p>`;
  if (tabSpecs) tabSpecs.innerHTML = `<p>${prod.specs}</p>`;
  if (tabShipping) tabShipping.innerHTML = `<p>${prod.shipping}</p>`;

  // Update page title
  document.title = `Dari Mooch — ${prod.name}`;

  // Generate Multi-angle Views of the *same* item dynamically
  const thumbContainer = document.getElementById('thumbnailContainer');
  if (thumbContainer) {
    const views = [
      { label: 'Front View',  style: 'object-fit: contain; transform: none;' },
      { label: 'Cap Detail',  style: 'object-fit: cover; transform: scale(1.6); object-position: top;' },
      { label: 'Label Detail',style: 'object-fit: cover; transform: scale(1.8); object-position: bottom;' }
    ];

    thumbContainer.innerHTML = views.map((view, i) => `
      <div class="thumbnail ${i === 0 ? 'active' : ''}" onclick="switchView(this, '${view.style}')" style="position:relative; overflow:hidden; border:2px solid #e0e0e0; border-radius:8px; width:75px; height:75px; cursor:pointer; background:#fff; transition:0.3s;">
        <img src="${prod.img}" alt="${prod.name} ${view.label}" style="width:100%; height:100%; transition:0.3s; ${view.style}" onerror="this.src='images/image1.png'"/>
        <span class="view-tag" style="position:absolute; bottom:2px; left:50%; transform:translateX(-50%); font-size:8px; background:rgba(0,0,0,0.65); color:#fff; padding:1px 4px; border-radius:3px; white-space:nowrap; font-weight:600;">${view.label}</span>
      </div>`
    ).join('');
  }

  // Minus / Plus
  document.getElementById('minusBtn').addEventListener('click', () => {
    if (currentQuantity > 1) {
      currentQuantity--;
      document.getElementById('qtyDisplay').textContent = currentQuantity;
    }
  });

  document.getElementById('plusBtn').addEventListener('click', () => {
    currentQuantity++;
    document.getElementById('qtyDisplay').textContent = currentQuantity;
  });

  // Add to cart
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    addToCart(currentProductId, prod.name, prod.price, prod.img, currentQuantity);
  });

  // Buy Now
  const buyNowBtn = document.getElementById('buyNowBtn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      buyNow(currentProductId, prod.name, prod.price, prod.img);
    });
  }

  // Wishlist
  document.getElementById('wishlistBtn').addEventListener('click', () => {
    alert(`"${prod.name}" has been added to your wishlist! ❤️`);
  });
}

function switchView(element, styleText) {
  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    // Apply styling to main image dynamically to zoom/adjust position
    mainImg.style.cssText = `max-width: 100%; max-height: 100%; transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); ${styleText}`;
  }
  document.querySelectorAll('.thumbnail').forEach(t => t.style.borderColor = '#e0e0e0');
  element.style.borderColor = 'var(--accent-color)';
  console.log('Switched product detail view:', styleText);
}

function initTabLinks() {
  document.querySelectorAll('.tab-link').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(`tab-${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
}
