// DOM elements
const booklist = document.getElementById("booklist");
const newbook = document.getElementById("newbook");
const form = document.getElementById("bookForm");
const dialog = document.getElementById("modal");
const closeButton = document.getElementById("closeDialog");

// the constructor...
function Book(book, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.book = book;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype read toggle method
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

// Library initializaton
const myLibrary = [
    new Book("A Tale of Two Cities", "Charles Dickens", 489, true),
    new Book("The Da Vinci Code", "Dan Brown", 454, true),
    new Book("The Hobbit", "J. R. R. Tolkien", 310, false),
];

// Books render
function renderBook(bookData) {
    const book = document.createElement('div');
    book.dataset.id = bookData.id;

    const title = document.createElement('p');
    title.textContent = `Title: ${bookData.book}`;

    const author = document.createElement('p');
    author.textContent = `Author: ${bookData.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${bookData.pages}`;

    const readStatus = document.createElement('p');
    readStatus.textContent = `Read: ${bookData.read ? "Yes" : "No"}`;

    const id = document.createElement('p');
    id.textContent = `ID: ${bookData.id}`;
    id.style.wordBreak = "break-word";

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        book.remove();
        const index = myLibrary.findIndex(b => b.id === bookData.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    });

    // Read toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = bookData.read ? "Mark as unread" : "Mark as read";

    toggleBtn.addEventListener('click', () => {
        bookData.toggleRead();
        readStatus.textContent = `Read: ${bookData.read ? "Yes" : "No"}`;
        toggleBtn.textContent = bookData.read ? "Mark as unread" : "Mark as read";
    });

    book.append(title, author, pages, readStatus, id, toggleBtn, delBtn);
    booklist.appendChild(book);
}

// take params, create a book then store it in the array
function addBookToLibrary() {
    const bookName = document.getElementById("bookname").value.trim();
    const bookAuthor = document.getElementById("bookauthor").value.trim();
    const pageNumber = parseInt(document.getElementById("pagenumber").value);
    const read = document.querySelector('input[name="read"]:checked')?.value === "yes";

    if (!bookName || !bookAuthor || isNaN(pageNumber)) {
        alert("Every field is required!");
        closeButton.preventDefault();
        return;
    }

    const newBook = new Book(bookName, bookAuthor, pageNumber, read);
    myLibrary.push(newBook);
    renderBook(newBook);
    dialog.close();
    form.reset();
}

// Add book button (opens dialog)
newbook.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();
});

// Dialog form button (closes dialog)
closeButton.addEventListener("click", () => {
    addBookToLibrary();
    dialog.close();
    form.reset();
});

myLibrary.forEach(renderBook);