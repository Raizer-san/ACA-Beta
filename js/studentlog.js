// text limit
document.addEventListener("DOMContentLoaded", function() {
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');

    usernameInput.addEventListener('input', function() {
        if (this.value.length > 50) {
            this.value = this.value.slice(0, 50);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length > 20) {
            this.value = this.value.slice(0, 20);
        }
    });
});

// pop-up
function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
    setTimeout(function() {
        popup.classList.add("fade-in");
    }, 10);
}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("fade-in");
    setTimeout(function() {
        popup.style.display = "none";
    }, 300); // Same duration as the transition in CSS
}

