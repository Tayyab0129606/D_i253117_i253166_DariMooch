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

  alert("Your personalized blend is being prepared!");
  console.log("Quiz submitted:", { length, health, skin, style });
});
