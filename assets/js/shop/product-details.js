var products1 = new Array();
var loadTL = new TimelineMax();
var logo = $('.logo-load');
var productTitle = ''
var _filter = "";
let productDetails;
$(document).ready(function() {
    var url = window.location.href.split("/")
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    productTitle = params.name;
    _filter = params.filter;
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    initialize(_filter);
});

function initialize(_filter) {
    fetch('https://gojek-day2-api.herokuapp.com/', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if(_filter === "sage"){
                productDetails = data["products"].sage.filter(ele => ele["Product Title"].trim().toLowerCase() === productTitle.toLowerCase());
            }else if(_filter === "simon"){
                productDetails = data["products"].simon.filter(ele => ele["Product Title"].trim().toLowerCase() === productTitle.toLowerCase());
            }else{
                productDetails = data["products"].books.filter(ele => ele["Product Title"].trim().toLowerCase() === productTitle.toLowerCase());
            }
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
                productDetails[0]["Buy Button Text - 1"] ? $("#button-1").text(productDetails[0]["Buy Button Text - 1"]) : $("#col__1").hide()
                productDetails[0]["Buy Button Text - 2"] ? $("#button-2").text(productDetails[0]["Buy Button Text - 2"]) : $("#col__2").hide()
                document.getElementById("buyNow-1").onclick = function() {
                    window.open(productDetails[0]["Buy Button Link - 1"], '_blank');
                }
                document.getElementById("buyNow-2").onclick = function() {
                    window.open(productDetails[0]["Buy Button Link - 2"], '_blank');
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