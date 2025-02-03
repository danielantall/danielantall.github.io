document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.testimonial-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    //Initialize the starting position of each card
    //each horizzontal slide comes froma  different direction every other card
    cards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.style.transform = 'translateX(-20%)';
        } else {
            card.style.transform = 'translateX(20%)';
        }
    });

    function slideInCard(card) {
        setTimeout(() => {
            card.style.opacity = 1;
            //delay for smooth transitions
            card.style.transform = 'translateX(0)';
        }, 200);
    }
    //slide in card into user's viewport
    //once a card enters the viewport perfrom the slide-in animation
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                slideInCard(card);
                //only perform animation once
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});