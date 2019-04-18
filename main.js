

// Save Bookmarks
const saveBookmark = e => {
  // Prevent from page reloading
  e.preventDefault();

  // Get site name and site url
  const siteName = document.querySelector("#siteName").value;
  const siteUrl = document.querySelector("#siteUrl").value;
  
  // Create a bookmark object
  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  let bookmarks = [];

  // Check if the local storage is empty
  if(localStorage.getItem("bookmarks") !== null) {
    // Get current bookmarks from local storage
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }

   // Adding first bookmark
   bookmarks.push(bookmark);
   // Set bookmarks to localstorage
   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Reset the form
  document.querySelector("form").reset();

  // Fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
const fetchBookmarks = () => {
  // Get bookmarks from local storage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Select the bookmarks div
  const output = document.querySelector("#bookmarks");

  // Reset the bookmarks div
  output.innerHTML = "";

  // Loop over bookmarks
  for(let bookmark of bookmarks) {
    // Create div
    const div = document.createElement("div");
    // Create h3
    const h3 = document.createElement("h3");
    h3.textContent = bookmark.name;

    // Create visit link
    const a = document.createElement("a");
    a.href = bookmark.url;
    a.className = "btn btn-success";
    a.textContent = "Visit"

    // Create delete button
    const button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Delete";
    
    button.addEventListener("click", e => {
        const name = e.target.parentElement.children[0].textContent;
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

const deleteBookmark = name => {
    // Get bookmarks from localStorage;
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // Loop over bookmarks
    for(let i in bookmarks) {
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

// Find the form and add an event listener to it
document.querySelector("form").addEventListener("submit", saveBookmark);

// adding an event listener for page load
window.addEventListener("load", fetchBookmarks);