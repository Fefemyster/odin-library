/* 
Steps: 
1. Array for a library for storing books - Done
2. Book Constructor - Done
3. Function that can take some arguments, create a book from those arguments, 
and store the new book object into an array. - Done
4. Each book needs to have an unique id - Done
5. Function that loops through the array and displays each book on the page. 
You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books 
to your array so you can see the display.
*/

const myLibrary = [];

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

/*
addBookToLibrary(
  "The Lord of the Rings",
  "J.R.R Tolkien",
  "9780395647387",
  "295",
  "not read yet",
);

addBookToLibrary(
  "NieR: Automata World Guide Volume 2 ",
  "Square Enix",
  "1506715753",
  "304",
  "Reading",
)*/

/*
5. Function that loops through the array and displays each book on the page.
6. Display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books 
to your array so you can see the display.
NOTE: Consider the logic for displaying books to the user and the book structures that hold all information as distinct entities. 
*/

//Next step: Gather the info from the form, research FormData for this

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
  console.log(allValues);

  //3. Need to create a book with the form data and added it to library

  addBookToLibrary(title, author, isbn, pages, status);
  console.log(myLibrary);
  formEl.reset();
});

function displayBook(book) {
  //Creating table
  const table = document.createElement("table");
  const div = document.createElement("div");
  const tr = document.createElement("tr");
  const tr2 = document.createElement("tr");
  const deleteButton = document.createElement("button");

  //Assigning dataset to each individual table / Associate DOM element with the book
  table.dataset.id = book.id;

  //When creating table element, it wil look like this: <table data-id = "id generated above" >

  deleteButton.textContent = "Remove Book !";

  document.body.appendChild(div);
  div.appendChild(table);
  table.appendChild(tr);
  table.appendChild(tr2);
  table.appendChild(deleteButton);

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

  rowContent.forEach((rowContent) => {
    const td = document.createElement("td");
    td.textContent = rowContent;
    tr2.appendChild(td);
  });

  deleteButton.addEventListener("click", () => {
    //1. To find book you need its index, and for getting its index you need the book id

    const bookId = table.dataset.id;

    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    myLibrary.splice(bookIndex, 1);

    table.remove();
    console.log(myLibrary);
  });
}
