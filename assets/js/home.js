var products1 = new Array();
var loadTL = new TimelineMax();
var logo = $('.logo-load');
$(document).ready(function() {
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    initialize();
});

function initialize() {
    fetch('https://gojek-day2-api.herokuapp.com/slider', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
            let sliders = "";
            $.each(data, (ele, ele1) => {
                sliders += `<div class="swiper-slide centered"><div class="container"><div class="row"><div class="col-md-8 offset-md-2"><div class="img-slide"><a href="work-detail-2.html" class="load-spiral cursorExplore"><img class="img-fluid" src="${ele1['Slider URL']}" alt=""></a></div></div><div class="col-md-12 text-center"><div class="text-head-slide"><div class="main-title text-slide main-title-before" style="overflow: inherit;"><h2 class="text-1">${ele1['Title']}</h2><h2 class="text-2">${ele1['Title']}</h2></div></div></div></div></div></div>`
            })
            $(".swiper-wrapper").append(sliders);
            setTimeout(() => {
                var workSlide = new Swiper('.swiper-container', {
                    slidesPerView: 1,
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

                });
            }, 200);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    fetch('https://gojek-day2-api.herokuapp.com/new-release', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
            let newRelease = "";
            $.each(data.products, (ele, ele1) => {
                // newRelease += `<div class="col-md-6"><div class="folio-item"><article class="popular"><div class="popular__left"><a class="popular__image" href="#"data-bg="${ele1.Image}"style="background-image: url(${ele1.Image});"></a></div><div class="popular__right"><h4 class="popular__title"><a class="popular__link" href="#">${ele1.Description} </a></h4><button class="product-add__button button" onclick="buyNow('${ele1['Buy Button Link']}')"><span class="button__text">Buy Now</span></button></div></article></div></div>`
                newRelease += `<div class="col-md-6"><div class="folio-item"><article class="popular"><div class="card"><div class="row no-gutters"><div class="col-md-4"><img src="${ele1.Image}" class="card-img" style="height:100%;" alt="..."></div><div class="col-md-8"><div class="card-body"><p class="card-text" style="display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;overflow: hidden;">${ele1.Description}</p><p class="card-text"><button class="product-add__button button" onclick="buyNow('${ele1['Buy Button Link']}')"><span class="button__text">Buy Now</span></button></p></div></div></div></div></article></div></div>`
            })
            $(".new-arrival").append(newRelease);

            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function buyNow(link) {
    window.open(link, '_blank');
}