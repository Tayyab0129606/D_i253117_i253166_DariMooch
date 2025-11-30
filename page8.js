// Log when the About Us page loads
console.log("About Us page loaded successfully.");

// Alert when a team member image is clicked
document.querySelectorAll('.team-member img').forEach(img => {
  img.addEventListener('click', () => {
    alert("This is an AI-generated team image.");
    console.log("Team image clicked:", img.alt);
  });
});
