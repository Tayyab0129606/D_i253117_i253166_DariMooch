// Log page load
console.log("Quiz page loaded successfully.");

// Handle quiz submission
document.getElementById("blendQuiz").addEventListener("submit", function(e) {
  e.preventDefault();

  const length = document.getElementById("length").value;
  const health = document.getElementById("health").value;
  const skin = document.getElementById("skin").value;
  const style = document.getElementById("style").value;

  if (!length || !health || !skin || !style) {
    alert("Please answer all questions before submitting.");
    console.log("Quiz submission failed: incomplete answers.");
    return;
  }

  let suggestion = "";

  // Suggestion logic
  if (style === "oil") {
    if (skin === "dry") {
      suggestion = "We recommend our **Hydrating Beard Oil** with natural argan and jojoba oils.";
    } else if (skin === "oily") {
      suggestion = "Try our **Lightweight Beard Oil** — nourishes without greasiness.";
    } else {
      suggestion = "Our **Balanced Beard Oil** is perfect for combination skin.";
    }
  } else if (style === "balm") {
    if (length === "short") {
      suggestion = "Our **Soft Hold Beard Balm** keeps short beards neat and stylish.";
    } else {
      suggestion = "Go for our **Strong Hold Beard Balm** — ideal for medium to long beards.";
    }
  } else if (style === "wash") {
    if (health === "dry") {
      suggestion = "Use our **Moisturizing Beard Wash** to restore softness and shine.";
    } else {
      suggestion = "Our **Refreshing Beard Wash** keeps your beard clean and healthy.";
    }
  }

  // Show result
  const resultBox = document.getElementById("resultBox");
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>Your Personalized Blend</h3>
    <p>${suggestion}</p>
  `;

  console.log("Quiz submitted:", { length, health, skin, style, suggestion });
});