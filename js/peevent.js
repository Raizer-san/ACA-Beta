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


const firebaseConfig = {
  apiKey: "AIzaSyBhscabbNJo4YRJPEV80Kh1XOvKCvkcxnk",
  authDomain: "neoacadb.firebaseapp.com",
  databaseURL: "https://neoacadb-default-rtdb.firebaseio.com",
  projectId: "neoacadb",
  storageBucket: "neoacadb.appspot.com",
  messagingSenderId: "497933192563",
  appId: "1:497933192563:web:7dd8fac202d25c04c74906",
  measurementId: "G-EEV5VK6PF5"
};


firebase.initializeApp(firebaseConfig);

// Reference to Firebase Database
var eventFormDB = firebase.database().ref("PEevents");
var storageRef = firebase.storage().ref();

function submitForm(event) {
  event.preventDefault(); // Prevent default form submission

  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var imageFile = document.getElementById("imageSelector").files[0];

  if (title.trim() !== "" && description.trim() !== "" && imageFile) {
    uploadImage(imageFile).then((storageImageUrl) => {
      saveMessage(title, description, storageImageUrl);
      document.getElementById("eventForm").reset(); // Reset form after successful submission
      requestNotificationPermission();
    }).then(() => {
      closePopup(); // Isara ang popup window pagkatapos ng pag-save ng data
    }).catch((error) => {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    });
  } else {
    alert("Please fill out all fields and select an image.");
  }
  var li = document.createElement("li");
    var titleValue = document.getElementById("title").value;
    var descriptionValue = document.getElementById("description").value;
    var titleSpan = document.createElement("SPAN");
    titleSpan.className = "title";
    titleSpan.textContent = titleValue;
    var descriptionSpan = document.createElement("SPAN");
    descriptionSpan.className = "description";
    descriptionSpan.textContent = descriptionValue;
    li.appendChild(titleSpan);

    if (titleValue === '') {
        alert("You must write something!");
    } else {
        var ul = document.getElementById("myUL");
        var listItem = document.createElement("li");
        listItem.textContent = titleValue;
        listItem.onclick = function() {
            eventpopup(titleValue, descriptionValue);
        };
        ul.appendChild(listItem);
    }
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    
    // Add close button to the new list item
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    
    // Add functionality to the new close button
    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }

    closePopup();

}

function uploadImage(imageFile) {
  return new Promise((resolve, reject) => {
    var imagesRef = storageRef.child("images/" + imageFile.name);

    imagesRef.put(imageFile).then((snapshot) => {
      imagesRef.getDownloadURL().then((storageImageUrl) => {
        resolve(storageImageUrl); // Resolve with the storageImageUrl
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

function saveMessage(title, description, imageUrl) {
  var newEventForm = eventFormDB.push();

  newEventForm.set({
    title: title,
    description: description,
    imageUrl: imageUrl
  });
}

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById('selectedImage');
    output.src = reader.result;
    output.style.display = "block"; // Show the image preview
  };
  reader.readAsDataURL(event.target.files[0]);
}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // I-set ang style na display: none para itago ang popup
}

// Function to load events from Firebase Database
function loadEvents() {
  eventFormDB.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var eventData = childSnapshot.val();
      var title = eventData.title;
      var description = eventData.description;
      var imageUrl = eventData.imageUrl;

      // Create list item
      var li = document.createElement("li");
      var titleSpan = document.createElement("span");
      titleSpan.className = "title";
      titleSpan.textContent = title;
      var descriptionSpan = document.createElement("span");
      li.appendChild(titleSpan);

      // Add click event to open event popup
      li.addEventListener("click", function() {
        eventpopup(title, description, imageUrl);
      });

      // Add close button to the new list item
      var span = document.createElement("span");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      // Add functionality to the new close button
      span.onclick = function(event) {
        event.stopPropagation(); // Prevent event propagation
    
        // Display confirmation popup
        openConfirmationPopup();
    
        // Store a reference to the current list item
        var listItem = this.parentElement;
    
        // Function to handle confirmation popup
        function openConfirmationPopup() {
            var confirmationPopup = document.getElementById("confirmation-popup");
            confirmationPopup.style.display = "block";
          
            // Create overlay
            var overlay = document.createElement("div");
            overlay.className = "confirmation-overlay";
            document.body.appendChild(overlay);

            // Yes button functionality
            document.getElementById("confirm-yes").onclick = function() {
                // Close confirmation popup
                confirmationPopup.style.display = "none";
                document.body.removeChild(overlay);
    
                // Remove the list item from the screen
                listItem.remove();
    
                // Get the title of the event
                var title = listItem.querySelector(".title").textContent;
    
                // Call function to remove data from the database
                removeEventData(title);
            };
    
            // No button functionality
            document.getElementById("confirm-no").onclick = function() {
                // Close confirmation popup
                confirmationPopup.style.display = "none";
                document.body.removeChild(overlay);
            };
        }
    };
    

// Function to remove event data from the database
function removeEventData(title) {
  // Reference the event in the database using its title or any unique identifier
  var eventRef = eventFormDB.orderByChild("title").equalTo(title);

  // Remove the event data from the database
  eventRef.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          // Remove the event data
          childSnapshot.ref.remove()
          .then(function() {
              console.log("Event data removed successfully!");
          })
          .catch(function(error) {
              console.error("Error removing event data: ", error);
          });
      });
  });
}      

      // Append list item to the events list
      var ul = document.getElementById("myUL");
      ul.appendChild(li);
    });
  });
}

// Call loadEvents function when the page loads
document.addEventListener("DOMContentLoaded", function() {
  loadEvents();
});
