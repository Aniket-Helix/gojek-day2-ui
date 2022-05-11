var products1 = new Array();
var loadTL = new TimelineMax();
var logo = $('.logo-load');
var _filter = "";
$(document).ready(function() {
    var url = window.location.href.split("/")
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    if(url[url.length-1] === "sage.html"){
        initialize(true, false);
    }else if(url[url.length-1] === "simonschuster.html"){
        initialize(false, true);
    }else{
        initialize(false, false);
    }
});

function initialize(isSage, isSimonSchuster) {
    fetch('https://gojek-day2-api.herokuapp.com/', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
            let cols = "";
            if(isSage){
                products1 = data["products"].sage;
                _filter = "sage"
            }else if(isSimonSchuster){
                products1 = data["products"].simon;
                _filter = "simon"
            }else{
                products1 = data["products"].books;
                _filter = "books"
            }
            products1.length > 0 ? $("#noFound").hide() : $("#noFound").show();
            $.each(products1, (ele, ele1) => {
                cols += "<article class='short-item'><div class='short-item__all'><a class='short-item__image-bg' href='product-details.html?name=" + ele1["Product Title"] + "&filter="+ _filter +"'><img class='short-item__image' src='" + ele1.Image + "'alt=''></a><div class='short-item__top'><div class='short-item__cols'><div class='short-item__col'><span class='item-tag item-tag_red'>Sale</span></div><div class='short-item__col'><button class='heart-button js-toggle-active'></button></div></div></div><h4 class='short-item__title'><a class='short-item__link' href='product-details.html?name=" + ele1["Product Title"] + "&filter="+ _filter +"'>" + ele1["Product Title"] + ', ' + ele1["Author"] + "</a></h4><span class='short-item__price'>" + ele1.Price + "</span></div></article>"
            })
            $(".shop-panel__text b").text(products1.length);
            $('.inner-catalog').append(cols); { /* <option value=''>--Choose Option--</option> */ }
            let genreOption = "";
            // let genreList = "";
            $.each(data.genre, (ele, ele1) => {
                genreOption += `<option>${ele1["Genre List"]}</option>`
                    // genreList += `<li class="${ele === 0 ? 'selected sel' : ''}" style=""><span>${ele1["Genre List"]}</span></li>`
            })
            $("#selectGenre").append(genreOption);
            $('select.js-formstyler').styler('destroy');
            setTimeout(() => {
                if ($(".js-formstyler").length) {
                    $("select.js-formstyler").styler({
                        onSelectClosed: function() {
                            if ($(this).find("option[data-hidden]:selected").length == 0) {
                                $(this).addClass("hide-selected");
                            }
                        },
                    });
                }
                // $(".jq-selectbox__select-text").text(data.genre[0]["Genre List"]);
                // $(".js-select-scroll").append(genreList);
            }, 300);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getval(sel) {
    // fetch('https://sambat-api.herokuapp.com/', {
    //     method: 'GET', // or 'PUT'
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    $('.inner-catalog article').remove();
    setTimeout(() => {
        let products = sel.value === "All Genre" ? products1 : products1.filter(ele => ele.Genre.toString().toLowerCase() === sel.value.toLowerCase());
        products.length > 0 ? $("#noFound").hide() : $("#noFound").show();
        let cols = "";
        $.each(products, (ele, ele1) => {
            cols += "<article class='short-item'><div class='short-item__all'><a class='short-item__image-bg' href='product-details.html?name=" + ele1["Product Title"] + "&filter="+ _filter +"'><img class='short-item__image' src='" + ele1.Image + "'alt=''></a><div class='short-item__top'><div class='short-item__cols'><div class='short-item__col'><span class='item-tag item-tag_red'>Sale</span></div><div class='short-item__col'><button class='heart-button js-toggle-active'></button></div></div></div><h4 class='short-item__title'><a class='short-item__link' href='product-details.html?name=" + ele1["Product Title"] + "&filter="+ _filter +"'>" + ele1["Product Title"] + ', ' + ele1["Author"] + "</a></h4><span class='short-item__price'>" + ele1.Price + "</span></div></article>"
        })
        $(".shop-panel__text b").text(products.length);
        $('.inner-catalog').append(cols);
        $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
    }, 200);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
}