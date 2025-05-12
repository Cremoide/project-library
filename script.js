const myLibrary = [
    {
        id: crypto.randomUUID(),
        book: "A Tale of Two Cities",
        author: "Charles Dickens",
        pages: 489,
        read: true
    },
    {
        id: crypto.randomUUID(),
        book: "The Da Vinci Code",
        author: "Dan Brown",
        pages: 454,
        read: true
    },
    {
        id: crypto.randomUUID(),
        book: "The Hobbit",
        author: "J. R. R. Tolkien",
        pages: 310,
        read: false
    }
];

const booklist = document.getElementById("booklist");

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

function renderBook(bookData) {
    const book = document.createElement('div');
    book.dataset.id = bookData.id;

    book.innerText =
        `Title: ${bookData.book}\n` +
        `Author: ${bookData.author}\n` +
        `Pages: ${bookData.pages}\n` +
        `Read: ${bookData.read ? "Yes" : "No"}\n` +
        `ID: ${bookData.id}`;

    const delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';

    delBtn.addEventListener('click', () => {
        book.remove();
        const index = myLibrary.findIndex(b => b.id === bookData.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    });

    book.appendChild(document.createElement('br'));
    book.appendChild(delBtn);
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
        return;
    }

    const newBook = new Book(bookName, bookAuthor, pageNumber, read);
    myLibrary.push(newBook);
    renderBook(newBook);
}

// Submit button dialog
const newbook = document.getElementById("newbook");
const form = document.getElementById("bookForm");
const dialog = document.getElementById("modal");
const closeButton = document.getElementById("closeDialog");

newbook.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    addBookToLibrary();
    dialog.close();
    form.reset();
});

myLibrary.forEach(renderBook);