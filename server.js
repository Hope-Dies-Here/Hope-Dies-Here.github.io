const express = require('express');
const { copyFile } = require('fs');
const path = require('path');
const { users } = require('./data')
const app = express();

function folder(req, res, next) {

    app.use(express.static(path.join(__dirname, 'server')))
    next()
}

function secure(req, res, next) {

    app.use(express.static(path.join(__dirname, 'server/actual')))
    next()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', folder, (req, res) => {
    res.sendFile(path.join(__dirname, './server/index.html'));
})

let some = false

app.post('/login', folder, (req, res) => {
    const { username, password } = req.body
    const check = users.find(user => user.name === username)
    const checkP = users.find(user => user.password === password)

    if(check === undefined || checkP === undefined) {
        // res.send('user not found')
        res.sendFile(path.join(__dirname, '/server/next copy.html'))
    } else if(check.name === username && check.password === password) {
        res.redirect('/goo');
        some = true
        res.end()
    } else {
        res.sendFile(path.join(__dirname, '/server/next copy.html'))
        // res.sendFile('server/next copy.html')
    }
});

app.get('/actual/login.html', (req, res) => {
    res.status(401)
})

app.get('/goo', secure, (req, res) => {
    if(some){

        res.sendFile(path.join(__dirname, './server/actual/login.html'));
        some = false
    } else {
        res.send(`login again <a href= 'index.html'> Here </a>`)
    }
})

app.listen(process.env.PORT  || 3000)