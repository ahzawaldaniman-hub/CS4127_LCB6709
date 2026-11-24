
/*Feature 1: IMAGE LIGHTBOX */

document.querySelectorAll(".destination-card").forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function(event) {
        // Allow Google Maps links to work normally
        if (event.target.closest("a")) {
            return;
        }

        const image = card.querySelector("img");
        if (!image) return;

        const overlay = document.createElement("div");
        overlay.className = "image-lightbox";

        const enlargedImage = document.createElement("img");
        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;

        const closeButton = document.createElement("button");
        closeButton.className = "lightbox-close";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close image");

        overlay.appendChild(enlargedImage);
        overlay.appendChild(closeButton);
        document.body.appendChild(overlay);

        function closeLightbox() {
            overlay.remove();
            document.removeEventListener("keydown", handleEscape);
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                closeLightbox();
            }
        }

        closeButton.addEventListener("click", closeLightbox);

        overlay.addEventListener("click", function(event) {
            if (event.target === overlay) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", handleEscape);
    });
});


/* Feature 2: CONTACT FORM AND EMAIL PREPARATION */
function prepareEnquiry(event) {
    event.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please complete all required fields.");
        return;
    }

    const emailBody =
        "Full Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + (phone || "Not provided") + "\n\n" +
        "Message:\n" + message;

   
const gmailLink =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent("info@tourism.gov.bn") +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(emailBody);

window.open(gmailLink, "_blank");

}


/* Feature 3: BACK-TO-TOP BUTTON */
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.textContent = "↑";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.setAttribute("title", "Back to top");
document.body.appendChild(backToTop);

window.addEventListener("scroll", function () {
    backToTop.classList.toggle("visible", window.scrollY > 300);
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth"
    });
});
