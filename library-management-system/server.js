const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// In-memory data storage for simplicity
const library = {
    books: [],
    users: [],
};

class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isBorrowed = false;
    }
}

class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (this.borrowedBooks.length >= 3) {
            return false;
        }
        if (book.isBorrowed) {
            return false;
        }
        book.isBorrowed = true;
        this.borrowedBooks.push(book);
        return true;
    }

    returnBook(ISBN) {
        const bookIndex = this.borrowedBooks.findIndex(book => book.ISBN === ISBN);
        if (bookIndex === -1) {
            return false;
        }
        const book = this.borrowedBooks[bookIndex];
        book.isBorrowed = false;
        this.borrowedBooks.splice(bookIndex, 1);
        return true;
    }
}

// Routes for managing books and users
app.post('/books', (req, res) => {
    const { title, author, ISBN } = req.body;
    const book = new Book(title, author, ISBN);
    library.books.push(book);
    res.status(201).send(book);
});

app.post('/users', (req, res) => {
    const { name, id } = req.body;
    const user = new User(name, id);
    library.users.push(user);
    res.status(201).send(user);
});

app.post('/borrow', (req, res) => {
    const { userId, ISBN } = req.body;
    const user = library.users.find(u => u.id === userId);
    const book = library.books.find(b => b.ISBN === ISBN);
    if (!user || !book) {
        return res.status(404).send('User or Book not found');
    }
    if (user.borrowBook(book)) {
        res.send('Book borrowed successfully');
    } else {
        res.status(400).send('Failed to borrow book');
    }
});

app.post('/return', (req, res) => {
    const { userId, ISBN } = req.body;
    const user = library.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    if (user.returnBook(ISBN)) {
        res.send('Book returned successfully');
    } else {
        res.status(400).send('Failed to return book');
    }
});

app.listen(port, () => {
    console.log(`Library app listening at http://localhost:${port}`);
});
