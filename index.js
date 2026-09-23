/* 
Steps: 
1. Array for a library for storing books - Done
2. Book Constructor - Done
3. Function that can take some arguments, create a book from those arguments, 
and store the new book object into an array. - Done
4. Each book needs to have an unique id - Done
*/

const myLibrary = [];

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

  /*
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ISBN: ${this.isbn}, ${this.pages} pages, ${this.status}`,
    );
  };
  */
}

function addBookToLibrary(title, author, isbn, pages, status) {
  //1. Create the book
  const book = new Book(title, author, isbn, pages, status);
  console.log(book);

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
