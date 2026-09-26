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
const bookTitles = document.querySelector(".bookTitles");
const bookInfo = document.querySelector(".bookInfo");

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
}

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
);

/*
5. Function that loops through the array and displays each book on the page.
6. Display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books 
to your array so you can see the display.
NOTE: Consider the logic for displaying books to the user and the book structures that hold all information as distinct entities. 
*/

function displayBook(book) {
  console.log(book);

  const table = document.createElement("table");
  table;

  const rowHeaders = ["Title", "Author", "ISBN", "Pages", "Status"];

  rowHeaders.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    bookTitles.appendChild(th);
  });

  const rowContent = [
    book.title,
    book.author,
    book.isbn,
    book.pages,
    book.status,
  ];

  rowContent.forEach((rowContent) => {
    const td = document.createElement("td");
    td.textContent = rowContent;
    bookInfo.appendChild(td);
  });

  //An individual table needs to be created per book - Done
  //Need to create table with Javascript
}

myLibrary.forEach(displayBook);
