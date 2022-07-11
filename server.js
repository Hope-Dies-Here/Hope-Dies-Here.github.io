const express = require('express');
const { copyFile } = require('fs');
const path = require('path');
const { users } = require('./data')
const app = express();

app.use(express.static(path.join(__dirname, 'server')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/server/index.html'));
})
let some = false

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const check = users.find(user => user.name === username)
    if(check === undefined) {
        // res.send('user not found')
        res.sendFile(path.join(__dirname, 'server/next copy.html'))
    } else if(check.name === username && check.password === password) {
        res.redirect('/goo');
        some = false
        res.end()
    } else {
        res.sendFile('next copy.html')
    }
});

app.get('/goo', (req, res) => {
    if(some){

        res.sendFile(path.join(__dirname, 'server/login.html'));
    } else {
        res.send(`login first <a href= 'index.html'> Here </a>`)
    }
})

app.listen(process.env.PORT  || 3000)