function login_success(response) {
    Cookies.set("login_token", response.data.token);
    var status = document.getElementById("login_status");
    status.innerText = "Login Success!"
    window.location.href = "/home.html"

    if(login_success === true) {
        location.href = "/home.html"
    }
}

function login_fail(error) {
    var status = document.getElementById("login_status")
    status.innerText = "Sorry, invalid login"
}

function attempt_login(e) {
    var email_input = document.getElementById("email_input");
    var password_input = document.getElementById("password_input");

    axios.request({
        url: "https://reqres.in/api/login",
        method: "POST",
        data: {
            email: email_input.value,
            password: password_input.value
        }
    }).then(login_success).catch(login_fail)
}

function todo_success(response) {
    var user_id = response['data'][0]['userId'];
    var user_div = document.querySelector(`div[user_id="${user_id}"]`)
    // div[user_id="0"]

    for(var i=0; i < response.data.length; i++){
        var todo_text = document.createElement("p");
        todo_text.innerText = response['data'][i]['title'];
        user_div.appendChild(todo_text);
    }
}

function todo_fail(error) {
    console.log(error);
}

function user_clicked(e) {
    axios.request({
        url: "https://jsonplaceholder.typicode.com/todos",
        params: {
            userId: this.getAttribute('user_id')
        }
    }).then(todo_success).catch(todo_fail)
}

function function_success(response) {
    var card_selection = document.getElementById("users_container");

    for(var i=0; i < response.data.length; i++) {
        var user_div = document.createElement("div");
        user_div.addEventListener('click', user_clicked);
        user_div.setAttribute('user_id', response['data'][i]['id']);

        var users_name = document.createElement("h4");
        users_name.innerText = response['data'][i]['name'];

        var users_email = document.createElement("h5");
        users_email.innerText = response['data'][i]["email"];

        var users_phone = document.createElement("h6");
        users_phone.innerText = response['data'][i]['phone'];

        var users_wesbite = document.createElement("a");
        users_wesbite.innerText = "Wesbite";
        users_wesbite.href = response['data'][i]['website'];

        user_div.appendChild(users_name);
        user_div.appendChild(users_email);
        user_div.appendChild(users_phone);
        user_div.appendChild(users_wesbite)
        card_selection.appendChild(user_div);
    }
}

function function_failed(error) {
    var container = document.getElementById("users_container");
    var error_message = document.createElement("h2");
    error_message.innerText = "Sorry refresh the page";
    container.appendChild(error_message);
}



axios.request({
    url: "https://jsonplaceholder.typicode.com/users/",
    method: "GET"
}).then(function_success).catch(function_failed)

var login_button = document.getElementById("login_submit");
login_button.addEventListener('click', attempt_login);
