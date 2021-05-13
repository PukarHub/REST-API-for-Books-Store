const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')

const app = express();
const port = 3000;

//Where we will keep books
let books = [];

app.use(cors());

//configuring bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


//Getting All the Books
app.get('/books', (req, res) => {
    res.json(books)
})

//Adding The Books
app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book)
    res.send('Book is added to the database')
})

//Getting Books by isbn number
app.get('/book/:isbn', (req, res) => {
    //Reading Isbn from URL
    const isbn = req.params.isbn
    
    //Searching books for isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return
        }
    }

    res.status(404).send('Book not Found');
})

//Deleting the book
app.delete('/book/:isbn', (req, res) => {
    //Reading isbn from the URL
    const isbn = req.params.isbn;

    //Remove item from the book array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false
    });
    res.send('Book is deleted')
});

//Updating the book
app.post('/book/:isbn', (req, res) => {
    //Reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is Edited');
})

app.listen(port, () => console.log(`Pukar Server running on port ${port}`.cyan.bold))