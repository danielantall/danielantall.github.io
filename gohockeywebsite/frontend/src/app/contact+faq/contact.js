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

