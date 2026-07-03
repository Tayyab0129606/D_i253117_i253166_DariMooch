// ======= LOGIN INTERACTIVITY & VALIDATION =======

document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("loginBtn");
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    
    if (!loginBtn) return;
    
    // Log page load for debugging
    console.log("Login page script loaded successfully.");
    
    // Track email input typing (Console Log Requirement)
    emailInput.addEventListener("input", function() {
        console.log("User email input changed:", this.value);
    });

    loginBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation Checks
        if (!email || !password) {
            // Alert 2: Form validation warning (Required Alert)
            alert("Error: Please enter both email and password.");
            console.log("Login failed: Empty fields."); // Console Log 2
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Error: Please enter a valid email address containing '@' and '.'");
            console.log("Login failed: Invalid email formatting.", email);
            return;
        }

        if (password.length < 6) {
            alert("Error: Password must be at least 6 characters long.");
            console.log("Login failed: Password length is less than 6 characters.");
            return;
        }

        // Simulating successful login
        const userSession = {
            email: email,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem("userSession", JSON.stringify(userSession));
        
        // Alert 3: Success Notification
        alert("Login successful! Welcome back to Dari Mooch.");
        console.log("Login successful! Session initialized:", userSession); // Console Log 3
        
        // Redirect to index page
        window.location.href = "index.html";
    });
});
