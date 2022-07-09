import Express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express()

app.use(Express.static(path.join(__dirname, 'login')))
app.use(Express.json())
// app.use(logIn)

let auth
function logIn(req, res, next){
    if(auth) {
        next()
    } else {
        console.log('err')
    }
}

app.post('/login', (req, res) => {
    console.log(req.body.password)

    if(req.body.password === 'sarah' && req.body.username === 'sarah123') {
        // res.sendFile(__dirname, './login/next.html')
        res.json({
            username: req.body.username,
            password: req.body.password,
            status: true
        })
    } else {
        res.json({ status: false})
        console.log('err')
    }

    console.log(req.body)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'log.html'))
    console.log(req.params)
})



app.listen(process.env.PORT || 8008)