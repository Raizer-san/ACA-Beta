function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function() {
        const profileImage = document.getElementById('profileImage');
        profileImage.src = reader.result;
        profileImage.style.display = 'block';
        const placeholderCircle = document.querySelector('.placeholder-circle');
        placeholderCircle.style.display = 'none';
    };

    reader.readAsDataURL(input.files[0]);
}


function sendMail() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert("Please fill out all fields.");
        return;
    }

    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    
    if (!navigator.onLine) {
        alert("No internet connection. Please try again later.");
        return;
    }

    let params = {
        name: name,
        email: email,
        message: message
    };

    emailjs.send("service_lzjbzba", "template_bt66w48", params)
        .then(function(response) {
            alert("Email Sent!!");
            clearFormFields();
        })
        .catch(function(error) {
            alert("Failed to send email. Please try again later.");
        });
}

function clearFormFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("logoutBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// Handling "No" button click
var noBtn = document.getElementById("noBtn");
noBtn.onclick = function() {
  modal.style.display = "none"; // Close the modal
}
