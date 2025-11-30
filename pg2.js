// ======= LOGIN BUTTON INTERACTIVITY =======

document.getElementById("loginBtn").addEventListener("click", function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // ALERT 1: Invalid email
    if (!email.includes("@")) {
        alert("Please enter a valid email address");
        console.log("Invalid email submitted:", email); // console.log 1
        return;
    }

    // ALERT 2: Login button clicked
    alert("Login button clicked!");
    console.log("Login attempted with:", { email, password }); // console.log 2
});

// CONSOLE LOG 3: For debugging empty fields
document.getElementById("loginEmail").addEventListener("input", function() {
    console.log("Email input changed:", this.value);
});
