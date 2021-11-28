// The color name
// The year the color was created
// A box that shows the actual color



function function_success(response) {
    var color_container = document.getElementById("color_container");

    for(var i=0; i < response.data.data.length; i++) {
        var color_div = document.createElement("div");
        color_div.style.backgroundColor = response['data']['data'][i]['color'];

        var color = document.createElement("h4");
        color.innerText = response['data']['data'][i]['name'];
        
        var color_year = document.createElement("h4");
        color_year.innerText = response['data']['data'][i]['year'];

        color_div.appendChild(color);
        color_div.appendChild(color_year);
        color_container.appendChild(color_div)
    }
}

function function_failed(error) {
    console.log(error);
}

    var login_status = Cookies.get("login_token");
    if(!login_status) {
        var not_logged = document.createElement("h1")
        not_logged.innerText = "Sorry, you are not logged in, we are redirecting you to the login page now!"

        document.body.appendChild(not_logged)
    setTimeout(function(){window.location.href = "/index.html"}, 3000);
    } else {
        if(login_status) {
            axios.request({
            url: "https://reqres.in/api/unknown",
            }).then(function_success).catch(function_failed)
        }
    }