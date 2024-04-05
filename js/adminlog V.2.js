const container = document.getElementById('container');
const registerBtn = document.getElementById('registerpage');
const loginBtn = document.getElementById('loginpage');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});


loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// text limit
document.addEventListener("DOMContentLoaded", function() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    usernameInput.addEventListener('input', function() {
        if (this.value.length > 30) {
            this.value = this.value.slice(0, 30);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length > 20) {
            this.value = this.value.slice(0, 20);
        }
    });
});