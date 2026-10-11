const myLibrary = [];
let isRead = false; //Book status

//HTML Elements
const tableCell = document.querySelector(".tableCell");
const tableInfo = document.querySelector(".tableInfo");

//Book constructor
function Book(title, author, isbn, pages, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.pages = pages;
  this.status = status;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, isbn, pages, status) {
  //1. Create the book
  const book = new Book(title, author, isbn, pages, status);

  //2. Store book on library array
  myLibrary.push(book);

  //3. Display Book
  displayBook(book);
}

const formEl = document.querySelector("#myForm"); //1st. Select form

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target); // 2nd. Getting form data using JS FormData method

  //2 ways of getting info
  //1. Individually

  const title = formData.get("title"); //Using name from form field
  const author = formData.get("author");
  const isbn = formData.get("isbn");
  const pages = formData.get("pages");
  const status = formData.get("status");

  //2. All of them
  const allValues = Object.fromEntries(formData.entries()); // Take key value pairs and transform them into an object
  //NOTE: formData constructor provides a .entries() method

  //3. Need to create a book with the form data and added it to library

  addBookToLibrary(title, author, isbn, pages, status);
  formEl.reset();
});

function displayBook(book) {
  //Creating table
  const table = document.createElement("table");
  const div = document.createElement("div");
  const tr = document.createElement("tr");
  const tr2 = document.createElement("tr");
  const deleteButton = document.createElement("button");
  const updateStatus = document.createElement("button");

  //Assigning dataset to each individual table / Associate DOM element with the book
  //When creating table element, it wil look like this: <table data-id = "id generated above" >
  table.dataset.id = book.id;

  deleteButton.textContent = "Remove Book!";
  updateStatus.textContent = "Update Book Status!";

  document.body.appendChild(div);
  div.appendChild(table);
  table.appendChild(tr);
  table.appendChild(tr2);
  table.appendChild(deleteButton);
  table.appendChild(updateStatus);

  const rowHeaders = ["Title", "Author", "ISBN", "Pages", "Status", "ID"];

  rowHeaders.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    tr.appendChild(th);
  });

  const rowContent = [
    book.title,
    book.author,
    book.isbn,
    book.pages,
    book.status,
    book.id,
  ];

  rowContent.forEach((rowContent, index) => {
    const td = document.createElement("td");
    td.textContent = rowContent;

    //Adding a class to status cell
    if (index === 4) {
      td.classList.add("status-cell");
    }

    tr2.appendChild(td);
  });

  deleteButton.addEventListener("click", () => {
    const bookId = table.dataset.id;

    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    myLibrary.splice(bookIndex, 1);

    table.remove();
    console.log(myLibrary);
  });

  updateStatus.addEventListener("click", () => {
    book.updateStatus();

    const statusCell = tr2.querySelector(".status-cell");
    statusCell.textContent = book.status;
  });
}

Book.prototype.updateStatus = function () {
  if (this.status === "Reading") {
    this.status = "Not Read";

    console.log(myLibrary);
  } else {
    this.status = "Reading";
    console.log(myLibrary);
  }
};

//Updating book status

//6. Add a button on each book’s display to change its read status.
//To facilitate this you will want to create Book prototype
// function that toggles a book instance’s read status.

//6.1 Create Book Prototype function
