import bodyParser from 'body-parser';
import 'dotenv/config'
import express from 'express'
import session from 'express-session';
import { getDb, connectToDb } from '../configs/database.js'

import path from 'path';
import {fileURLToPath} from 'url';
import { appendFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express()

router.set('view engine', 'ejs')
router.set('views', path.join(__dirname, '../server'))
router.use(express.static('server'))

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false}))
router.use(express.json())

router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

console.log(process.env)
/*
------------ middleware ------------
*/

const errHandle = (err, req, res, next) => {
    if(err){
        console.log(err)
        res.send('there is an error try again later <a href="/">refresh</a>')
    }
    next()
}

/*
    ------------ setup databse ------------
*/
let db
connectToDb(process.env.DB_NAME, (err) => {
    if(!err){
        const port = 3000
        router.listen(process.env.PORT  || 3000, () => console.log(`testing ${port}...`))
    }
    db = getDb()
})
/*
    ------------ setup routers ------------
*/
const c = (data) => {
    return console.log(data)
}

router.get('/', (req, res) => {
    console.log(req.session.auth)
    if(req.session.auth){
 
        res.redirect('/home')
    } else 
    if(req.session.data){
        
        res.render('index', {username: req.session.data})
    } else {
        res.render('index', {username: ''})
    }
})

router.post('/login', async (req, res) => {
    const result = await db.collection(process.env.COL_NAME).findOne({username: req.body.username, password: req.body.password})
    if(result){
        req.session.data = null
        req.session.auth = result.name
        res.redirect('/home')
    } else {
        let string = req.body.username + ' not found'
        req.session.data = string
        res.redirect('/')
    }
    console.log(req.session.data)
})

router.get('/home', (req, res) => {
    if(req.session.auth){
        res.render('login', {name: req.session.auth})

    } else {
        res.send(`<a href ='/'> login </a>`)
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy((err => {
        if(err) return console.log(err)
    }))
    res.redirect('/')
})

/*
    ------------ export stuffs ------------
*/

export {router, errHandle} 