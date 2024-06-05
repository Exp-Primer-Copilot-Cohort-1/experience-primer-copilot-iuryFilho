// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create a middleware to parse the body of the request
app.use(express.json());

// Data
const comments = [
    { id: 1, author: 'John', comment: 'Hello' },
    { id: 2, author: 'Jane', comment: 'Hi' },
    { id: 3, author: 'Bob', comment: 'Good morning' }
];

// Routes
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).end();
    }
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    if (!comment.author || !comment.comment) {
        res.status(400).send('Missing author or comment');
    } else {
        comment.id = comments.length + 1;
        comments.push(comment);
        res.status(201).json(comment);
    }
});

app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        comment.author = req.body.author;
        comment.comment = req.body.comment;
        res.json(comment);
    } else {
        res.status(404).end();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

// Run the server
// node comments.js

// Test the server
// curl -X GET http://localhost:3000/comments
// curl -X GET http://localhost:3000/comments/1
// curl -X POST http://localhost:3000/comments -H 'Content-Type: application