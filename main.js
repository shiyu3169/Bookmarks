// adding an event listener for page load
window.addEventListener("load", fetchBookmarks);

// Find the form and add an event listener to it
document.querySelector("form").addEventListener("submit", saveBookmark);

// Save Bookmarks
function saveBookmark(e) {
  // Prevent from page reloading
  e.preventDefault();

  // Get site name and site url
  var siteName = document.querySelector("#siteName").value;
  var siteUrl = document.querySelector("#siteUrl").value;
  
  // Create a bookmark object
  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Check if the local storage is empty
  if(localStorage.getItem("bookmarks") === null) {
    // Init bookmarks array
    var bookmarks = [];
    // Adding first bookmark
    bookmarks.push(bookmark);
    // Set bookmarks to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get current bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Push new bookmark into bookmarks
    bookmarks.push(bookmark);
    // set bookmarks to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Reset the form
  document.querySelector("form").reset();

  // Fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Select the bookmarks div
  var output = document.querySelector("#bookmarks");

  // Reset the bookmarks div
  output.innerHTML = "";

  // Loop over bookmarks
  for(var i=0;i<bookmarks.length;i++) {
    // Create div
    var div = document.createElement("div");
    // Create h3
    var h3 = document.createElement("h3");
    h3.textContent = bookmarks[i].name;

    // Create visit link
    var a = document.createElement("a");
    a.href = bookmarks[i].url;
    a.className = "btn btn-success";
    a.textContent = "Visit"

    // Create delete button
    var button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Delete";
    
    button.addEventListener("click", function(e){
        var name = e.target.parentElement.children[0].textContent;
        deleteBookmark(name);
    })


    // append h3, a and button into div
    div.appendChild(h3);
    div.appendChild(a);
    div.appendChild(button);

    // append div into output;
    output.appendChild(div);
  }
}

function deleteBookmark(name) {
    // Get bookmarks from localStorage;
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // Loop over bookmarks
    for(var i=0; i<bookmarks.length;i++) {
      // looking for bookmark by given name
      if(bookmarks[i].name === name) {
        bookmarks.splice(i, 1);
        break;
      }
    }

    // Reset bookmarks into localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Re-fetch bookmarks output
    fetchBookmarks();
}