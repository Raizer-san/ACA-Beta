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

document.querySelector(".plus-button").addEventListener("click", openPopup);

document.addEventListener("DOMContentLoaded", function() {
  var textarea = document.querySelector('.event-details');
  var characterCount = document.getElementById('current-count');
  
  textarea.addEventListener('input', function() {
      var maxLength = this.getAttribute('maxlength');
      var currentLength = this.value.length;
      
      characterCount.textContent = currentLength;
  });
});