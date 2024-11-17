document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 30,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        speed: 1000,
    });

    document.querySelector('.custom-button-prev').addEventListener('click', () => swiper.slidePrev());
    document.querySelector('.custom-button-next').addEventListener('click', () => swiper.slideNext());
});
