var blogId = '';
$(document).ready(function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    blogId = params.id;
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    initialize();
});

function initialize() {
    fetch('https://Gojek One-api.herokuapp.com/blogs', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
            if (blogId) {
                let blogDetails = data.products.filter(ele => ele["Blog ID"] === blogId);
                if (blogDetails.length) {
                    let details = `<div class="col-md-8 offset-md-2"><div class="article"><div class="author"><p>${blogDetails[0].Author} <br> ${blogDetails[0].Date}</p></div><h3>${blogDetails[0]['Blog Title']}</h3><p>${blogDetails[0].Content}</p></div></div>`
                    $(".blogDetails").append(details);
                    $(".bg-detail-blog").css("background", `url(${blogDetails[0]['Cover Image']}) center no-repeat`);
                    $(".detail-title").append(blogDetails[0]['Blog Title']);
                }
            } else {
                let blogs = "";
                $.each(data.products, (ele, ele1) => {
                    blogs += `<div class="col-md-6 mt-40"><div class="blog-item"><a class="cursorExplore load-spiral" href="blog-detail.html?id=${ele1['Blog ID']}"><div class="blog-img"><img class="img-fluid" src="${ele1['Article List Image']}" alt=""></div><div class="blog-text wrap-text"><h3>${ele1['Blog Title']}</h3><p>${ele1['Content']}</p></div></a></div></div>`
                })
                $(".blogs").append(blogs);
            }
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}