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
var eventFormDB = firebase.database().ref("RESEARCHevents");
var storageRef = firebase.storage().ref();

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
