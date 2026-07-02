// ======= CHECKOUT PAGE CONTROLLER =======

document.addEventListener("DOMContentLoaded", function () {
    console.log("Checkout page initialized. Loading cart pricing from localStorage.");

    // ---- Load Order Summary from localStorage ----
    const pricing = JSON.parse(localStorage.getItem("orderPricing")) || null;
    const cart    = JSON.parse(localStorage.getItem("cart"))         || [];

    if (pricing) {
        const el = (id) => document.getElementById(id);
        // Pricing fields already contain PKR prefix from pg5.js - fixed duplication bug!
        if (el("coSubtotal")) el("coSubtotal").textContent = pricing.subtotal;
        if (el("coShipping")) el("coShipping").textContent = pricing.shipping;
        if (el("coTax"))      el("coTax").textContent      = pricing.tax;
        if (el("coTotal"))    el("coTotal").textContent    = pricing.total;
        if (el("coItems"))    el("coItems").textContent    = pricing.itemsText || "—";
    }

    // ---- Same As Billing Checkbox ----
    const sameAddressChk   = document.getElementById("sameAsbilling");
    const shippingFields   = document.getElementById("shippingFields");

    if (sameAddressChk && shippingFields) {
        // Default: checked = shipping fields hidden
        shippingFields.classList.add("hidden");

        sameAddressChk.addEventListener("change", function () {
            if (this.checked) {
                shippingFields.classList.add("hidden");
            } else {
                shippingFields.classList.remove("hidden");
            }
        });
    }

    // ---- Credit Card Number Formatting ----
    const cardInput = document.getElementById("cardNumber");
    if (cardInput) {
        cardInput.addEventListener("input", function () {
            // Remove non-digits, group into 4s
            let val = this.value.replace(/\D/g, "").substring(0, 16);
            this.value = val.replace(/(.{4})/g, "$1 ").trim();
        });
    }

    // ---- CVV Validation (max 3 digits) ----
    const cvvInput = document.getElementById("cvv");
    if (cvvInput) {
        cvvInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").substring(0, 3);
        });
    }

    // ---- Expiry Date Formatting (MM/YY) ----
    const expiryInput = document.getElementById("expiry");
    if (expiryInput) {
        expiryInput.addEventListener("input", function () {
            let val = this.value.replace(/\D/g, "").substring(0, 4);
            if (val.length >= 3) {
                val = val.substring(0, 2) + "/" + val.substring(2);
            }
            this.value = val;
        });
    }

    // ---- Payment Tab switching ----
    const payTabs = document.querySelectorAll(".pay-tab");
    payTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            payTabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // ---- Place Order ----
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", function () {
            const name    = document.getElementById("fullName").value.trim();
            const email   = document.getElementById("emailAddr").value.trim();
            const phone   = document.getElementById("phoneNum").value.trim();
            const address = document.getElementById("address").value.trim();
            const cardNum = document.getElementById("cardNumber").value.trim();
            const cvv     = document.getElementById("cvv").value.trim();
            const expiry  = document.getElementById("expiry").value.trim();

            // Basic validation
            if (!name || !email || !phone || !address) {
                alert("Please complete all billing fields before placing your order.");
                return;
            }

            if (!cardNum || cardNum.replace(/\s/g, "").length < 16) {
                alert("Please enter a valid 16-digit card number.");
                return;
            }

            if (!cvv || cvv.length < 3) {
                alert("Please enter a valid 3-digit CVV.");
                return;
            }

            if (!expiry || expiry.length < 5) {
                alert("Please enter a valid expiry date (MM/YY).");
                return;
            }

            console.log("Order placed successfully by:", name, "| Total:", pricing?.total);

            // Save lastOrder meta for success page
            const orderRef = "DM-" + Math.floor(100000 + Math.random() * 900000);
            const lastOrder = { name: name, ref: orderRef };
            localStorage.setItem("lastOrder", JSON.stringify(lastOrder));

            // Redirect to Order Success page
            window.location.href = "pg7.html";
        });
    }
});
