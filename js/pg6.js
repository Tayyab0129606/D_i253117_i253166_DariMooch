// ======= SIGN UP INTERACTIVITY & VALIDATION =======

document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passInput = document.getElementById("signupPassword");
    const confirmPassInput = document.getElementById("signupConfirmPassword");
    const termsCheck = document.getElementById("signupTerms");
    
    if (!signupForm) return;
    
    console.log("Sign Up script initialized successfully.");

    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passInput.value;
        const confirmPassword = confirmPassInput.value;

        // Validation Checks
        if (!name || !email || !password || !confirmPassword) {
            alert("Error: All form fields are required.");
            console.log("Signup validation failed: empty fields.");
            return;
        }

        // Validate name structure (should contain letters only)
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            alert("Error: Full Name must contain alphabetic characters only.");
            console.log("Signup validation failed: invalid character in name.", name);
            return;
        }

        // Validate email structure
        if (!email.includes("@") || !email.includes(".")) {
            alert("Error: Please enter a valid email address.");
            console.log("Signup validation failed: invalid email.", email);
            return;
        }

        // Validate password length
        if (password.length < 6) {
            alert("Error: Password must be at least 6 characters long.");
            console.log("Signup validation failed: short password.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Error: Passwords do not match. Please verify.");
            console.log("Signup validation failed: password mismatch.");
            return;
        }

        // Check if terms are accepted
        if (!termsCheck.checked) {
            alert("Error: You must accept the Terms & Conditions to register.");
            console.log("Signup validation failed: terms not checked.");
            return;
        }

        // Simulating user account creation
        const newUser = {
            name: name,
            email: email,
            registeredAt: new Date().toISOString()
        };
        
        // Save in localStorage (could support multiple users if we push to a list, but a single user mock is fine)
        localStorage.setItem("registeredUser", JSON.stringify(newUser));
        
        // Alert Requirement (Successful sign up)
        alert(`Account created successfully for ${name}! Please log in with your credentials.`);
        console.log("New user registered successfully:", newUser);
        
        // Redirect to Login Page
        window.location.href = "pg2.html";
    });
});
