var products1 = new Array();
var loadTL = new TimelineMax();
var logo = $('.logo-load');
var productTitle = ''
$(document).ready(function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    productTitle = params.name;
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    initialize();
});

function initialize() {
    fetch('https://gojek-day2-api.herokuapp.com/', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            let productDetails = data.products.filter(ele => ele["Product Title"].trim().toLowerCase() === productTitle.toLowerCase());
            if (productDetails.length) {
                $("#noFound").hide()
                $("#found").show()
                $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
                let imageSlides = "";
                productDetails[0].Image = [productDetails[0].Image]
                $.each(productDetails[0].Image, (ele, ele1) => {
                    imageSlides += "<div class='product-slider__item'><a class='product-slider__link' href='https://via.placeholder.com/486x500'data-fancybox='gallery'><img class='product-slider__image' src='" + ele1 + "'alt=''></a></div>"
                })
                $(".js-product-slider").slick('destroy');
                $('.js-product-slider').append(imageSlides);
                setTimeout(() => {
                    if ($(".js-product-slider").length) {
                        $(".js-product-slider").on(
                            "init",
                            function() {
                                $(".js-product-slider").removeClass("loaded");
                            }
                        );
                        $(".js-product-slider").slick({
                            dots: true,
                            arrows: false,
                            infinite: true,
                            autoplay: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            touchThreshold: 200,
                            speed: 500,
                            waitForAnimate: false
                        });
                    }
                }, 200)
                $("#lastBread").text(productDetails[0]["Product Title"]);
                $(".product__title").text(productDetails[0]["Product Title"] + ", " + productDetails[0]["Author"]);
                $(".product__text").text(productDetails[0].Description);
                $("#genre").text(productDetails[0].Genre);
                $(".product__price").text(productDetails[0].Price);
                $(".chars__status").text(productDetails[0]["Status (Sold Out/ In Stock)"]);
                document.getElementById("buyNow").onclick = function() {
                    window.open(productDetails[0]["Buy Button Link"], '_blank');
                }
            } else {
                $("#found").hide()
                $("#noFound").show()
            }
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}