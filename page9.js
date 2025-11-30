// Log when Contact Us page loads
console.log("Contact Us page loaded successfully.");

// Form validation with alert
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent actual submission for demo
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting.");
    console.log("Form submission failed: missing fields.");
  } else {
    alert("Thank you for contacting Dari Mooch! We will reply soon.");
    console.log("Form submitted:", { name, email, message });
  }
});
