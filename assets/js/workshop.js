$(document).ready(function() {
    $(".logo-load").css({ "visibility": "inherit", "opacity": "1" });
    initialize_workshop();
});

function initialize_workshop() {
    fetch('https://gojek-day2-api.herokuapp.com/workshops', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            $(".logo-load").css({ "visibility": "hidden", "opacity": "0" });
            let workshop = "";
            $.each(data.workshops, (ele, ele1) => {
                workshop += `<div style="display:flex!important"><p>${ele1['Date']}</p><p style="margin-left: 30px">${ele1['Name']}</p></div>`
            })
            $(".workshops").append(workshop);
            document.getElementById("register").onclick = function() {
                window.open(data.workshops[0]["Registration Link"], '_blank');
            }
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}