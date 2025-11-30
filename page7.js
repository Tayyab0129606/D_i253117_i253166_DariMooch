<script>
// Example 1: Alert when someone clicks a social link
document.querySelectorAll('.footer-social-list a').forEach(link => {
  link.addEventListener('click', function() {
    alert("You are leaving Dari Mooch to visit our social page!");
    console.log("Social link clicked:", this.textContent);
  });
});

// Example 2: Alert when someone clicks a contact email
const emailLink = document.querySelector('.footer-contact a[href^="mailto"]');
if (emailLink) {
  emailLink.addEventListener('click', function() {
    alert("Opening your email app to contact Dari Mooch.");
    console.log("Email link clicked:", this.href);
  });
}

// Example 3: Console log footer load
console.log("Footer loaded successfully with logo and links.");
</script>
