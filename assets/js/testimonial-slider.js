$(document).ready(function() {
    initialize();
});

function initialize() {
    setTimeout(() => {
        var workSlide = new Swiper('.testimonials', {
            slidesPerView: 4,
            cssMode: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            loop: false,
            centeredSlides: false,
            speed: 900,
            spaceBetween: 0,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 1
                },
                // when window width is >= 640px
                990: {
                    slidesPerView: 1
                }
            }
            // mousewheel: true,
        });

        workSlide.on('slideChange', function() {
            TweenMax.to('.text-1', 0.3, {
                y: '80',
            })
            TweenMax.to('.text-2', 0.3, {
                y: '80',
            })
        });

        workSlide.on('slideChangeTransitionEnd', function() {
            TweenMax.to('.text-1', 0.3, {
                y: '0',
            })
            TweenMax.to('.text-2', 0.3, {
                y: '0',
            })
        });
    }, 700);
}

function reinitialiseCarousel() {
    initialize();
}