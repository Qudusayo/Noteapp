const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const server = express();
const User = require('./Model/User');


server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
})
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost/noteapp', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('Mongoose Coonected'))
    .catch(err => console.log(err));

server.post('/login', (req, res) => {
    User
        .find({ username: req.body.username, password: req.body.password })
        .then(users => {
            if (users.length === 1) {
                res.json({ type: 'success', message: 'User Login Successful' })
            } else {
                res.json({ type: 'error', message: 'Invalid Username or Password' })
            }
        })

})

server.post('/', (req, res) => {
    User
        .find({ username: req.body.username })
        .then(users => {
            if (users.length === 0) {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    notes: [],
                    notesNum: 0
                })
                newUser.save().then(user => res.json(user));
            } else {
                res.json({ type: 'error', message: 'User already exist' })
            }
        })
})

server.post('/users', (req, res) => {
    User
        .find({})
        .then(users => {
            let usernames = users.map(user => user.username)
            res.json(usernames)
        })
})

server.post('/checkuser', (req, res) => {
    User
        .find({})
        .then(users => {
            let alluser = users.map(user => [user.username, user.password])
            res.json(alluser)
        })
})

server.post('/userInfo', (req, res) => {
    User
        .find({ username: req.body.username, password: req.body.password })
        .then(info => {
            res.json(info[0])
        })
})

server.post('/getNotes', (req, res) => {
    User
        .find({ username: req.body.username })
        .then(users => res.json(users[0].notes))
})

server.post('/insertNote', (req, res) => {
    const date = new Date
    User
        .find({ username: req.body.username })
        .then(users => {
            notes = users[0].notes;
            notes.push({
                title: req.body.title,
                content: req.body.content,
                date: date.toLocaleDateString(),
                id: users[0].notesNum ? users[0].notesNum : 0
            })
            User
                .updateOne({ username: req.body.username }, { $set: { notes: notes, notesNum: users[0].notesNum ? users[0].notesNum + 1 : 1 } })
                .then(result => res.json(result));
        })
})

server.post('/editNote', (req, res) => {
    User
        .find({ username: req.body.username })
        .then(users => {
            notes = users[0].notes;
            const found = notes.some(note => note.id === req.body.id)

            if (found) {
                notes.forEach(note => {
                    if (note.id === req.body.id) {
                        note.title = req.body.title ? req.body.title : note.title
                        note.content = req.body.content ? req.body.content : note.content
                    }
                })
            }

            User
                .updateOne({ username: req.body.username }, { $set: { notes: notes } })
                .then(result => res.json(result));
        })
})

server.post('/findNote', (req, res) => {
    User
        .find({ username: req.body.username })
        .then(users => {
            const notes = users[0].notes;
            const find = notes.find(note => note.id === req.body.id)
            res.json(find);
        })
})

server.post('/delNote', (req, res) => {
    User
        .find({ username: req.body.username })
        .then(users => {
            const notes = users[0].notes;
            const newNote = notes.filter(note => note.id !== req.body.id)

            User
                .updateOne({ username: req.body.username }, { $set: { notes: newNote } })
                .then(result => res.json(result));
        })
})

server.use(express.static('client/build'));
server.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 4500;
server.listen(port, () => console.log(`Server on * ${port}`));