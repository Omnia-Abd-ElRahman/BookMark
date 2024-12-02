var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var bookmarksContainer = JSON.parse(localStorage.getItem("allBookmarks")) || [];

function getBookmark() {
  const bookmarkName = bookmarkNameInput.value.trim();
  const bookmarkURL = bookmarkURLInput.value.trim();


  if (!bookmarkName) {
    Swal.fire('Error', 'Please enter a Site Name!', 'error');
    return;
  }

  if (/[^a-zA-Z0-9\s]/.test(bookmarkName)) {
    Swal.fire('Error', 'Site Name should only contain letters, numbers, and spaces.', 'error');
    return;
  }


  if (!bookmarkURL) {
    Swal.fire('Error', 'Please enter a Site URL!', 'error');
    return;
  }

  if (!/^https?:\/\//i.test(bookmarkURL)) {
    Swal.fire('Error', 'Site URL must start with http:// or https://', 'error');
    return;
  }

  if (!/\.(com|org|net|edu|gov|io|co|info)$/i.test(bookmarkURL)) {
    Swal.fire('Error', 'Please enter a valid URL with a recognized domain (e.g., .com, .org)', 'error');
    return;
  }


  var bookmark = { name: bookmarkName, url: bookmarkURL };
  bookmarksContainer.push(bookmark);
  localStorage.setItem("allBookmarks", JSON.stringify(bookmarksContainer));
  displayTables();
  clearInputs();


  Swal.fire('Success', 'Your bookmark has been added!', 'success');
}

function displayTables() {
  var tableContent = bookmarksContainer.map((bookmark, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td><a href="${bookmark.url}" target="_blank" class="btn btn-outline-secondary"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
      <td><button onclick="deleteBookmark(${index})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`).join("");
  document.getElementById("tableContent").innerHTML = tableContent;
}

function clearInputs() {
  bookmarkNameInput.value = '';
  bookmarkURLInput.value = '';
}

function deleteBookmark(index) {
  bookmarksContainer.splice(index, 1);
  localStorage.setItem("allBookmarks", JSON.stringify(bookmarksContainer));
  displayTables();
  Swal.fire('Deleted!', 'Bookmark has been removed.', 'success');
}


displayTables();
