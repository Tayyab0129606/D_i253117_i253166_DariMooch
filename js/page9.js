// ======= CONTACT US PAGE INTERACTIVITY =======

document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact page loaded successfully.");

    // ---- Contact Form Submission ----
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name    = document.getElementById("contactName").value.trim();
            const email   = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            // Field checks
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address.");
                return;
            }

            if (message.length < 20) {
                alert("Your message is too short. Please provide more detail (minimum 20 characters).");
                return;
            }

            // Success alert (Alert Requirement)
            alert(`Thank you, ${name}! Your message has been sent. Our team will reply to ${email} within 24 hours.`);
            console.log("Contact form submitted:", { name, email, subject, message });

            contactForm.reset();
        });
    }

    // ---- FAQ Accordion ----
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", function () {
            const isOpen = item.classList.contains("open");

            // Close all
            faqItems.forEach(i => i.classList.remove("open"));

            // Toggle current
            if (!isOpen) {
                item.classList.add("open");
            }
        });
    });
});
