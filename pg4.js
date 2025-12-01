// ======= QUANTITY BUTTONS =======
let qty = 1;
const qtyNum = document.getElementById("qtyNum");
document.getElementById("plusBtn").addEventListener("click", function() {
    qty++;
    qtyNum.textContent = qty;
    console.log("Quantity increased:", qty); // console log 1
});
document.getElementById("minusBtn").addEventListener("click", function() {
    if(qty > 1) qty--;
    qtyNum.textContent = qty;
    console.log("Quantity decreased:", qty); // console log 2
});

// ======= ADD TO CART =======
document.getElementById("addCartBtn").addEventListener("click", function() {
    alert("Product added to cart successfully!"); // alert 1
    console.log("Cart updated. Quantity:", qty); // console log 3
});

// ======= WISHLIST BUTTON =======
document.getElementById("wishlistBtn").addEventListener("click", function() {
    alert("Product added to wishlist!"); // alert 2
});

// ======= THUMBNAIL CLICK =======
const mainImg = document.getElementById("mainImg");
document.querySelectorAll(".thumb").forEach(thumb => {
    thumb.addEventListener("click", function() {
        mainImg.src = this.src;
        alert("Image updated!"); // alert 3
        console.log("Thumbnail clicked, main image changed to:", this.src);
    });
});
