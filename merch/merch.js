
window.addEventListener('load', () => {
    const img = new Image();
    img.src = '../clothing_photos/sizing_chart.jpg';
});

// Function to open the overlay with the clicked image
function openOverlay(imageSrc) {
    const overlay = document.getElementById("imageOverlay");
    const fullViewImage = document.getElementById("fullViewImage");
    fullViewImage.src = imageSrc; // Set the clicked image as the overlay image
    overlay.style.display = "flex"; // Display the overlay

    // Add a slight delay to apply the opacity transition
    setTimeout(() => {
        fullViewImage.classList.add("show-image");
    }, 10);
}

function closeOverlay() {
    const overlay = document.getElementById("imageOverlay");
    const fullViewImage = document.getElementById("fullViewImage");
    
    // Remove the fade-in class before hiding
    fullViewImage.classList.remove("show-image");
    overlay.style.display = "none"; // Hide the overlay
}

//If user leaves a FAQ box open close it once it is out of view
const faqItems = document.querySelectorAll('.collapse');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0 });

//Observe each FAQ item individually
faqItems.forEach(item => observer.observe(item));

