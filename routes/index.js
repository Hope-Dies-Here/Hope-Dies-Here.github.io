import bodyParser from 'body-parser';
import 'dotenv/config'
import MongoConnet from 'connect-mongo'
import express from 'express'
import session from 'express-session';
import { getDb, connectToDb } from '../configs/database.js'
import limitter from 'express-rate-limit'

import path from 'path';
import {fileURLToPath} from 'url';
import { appendFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express()
const limitLogin = limitter({
    windowMs: 1000 * 10,
    max: 5,
    // message: 
})

router.set('view engine', 'ejs')
router.set('views', path.join(__dirname, '../server'))
router.use(express.static('server'))
router.use(express.static('server/port'))


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false}))
router.use(express.json())

router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoConnet.create({ mongoUrl: process.env.MONGODB_STR }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

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
        const port = 5000
        router.listen(process.env.PORT  || 5000, () => console.log(`testing ${port}...`))
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

    if(req.session.auth){
 
        res.redirect('/home')
    } else 
    if(req.session.data){
        
        res.render('index', {username: req.session.data})
    } else {
        res.render('index', {username: ''})
    }
})

router.post('/login', limitLogin,async (req, res) => {
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
})

router.get('/home', (req, res) => {
    if(req.session.auth){
        res.render('eEhome-page', {name: req.session.auth})

    } else {
        res.send(`<a href ='/'> <h1> login </h1> </a>`)
    }
})
router.get('/projects', (req, res) => {
    if(req.session.auth){
        res.render('eEprojects-page', {name: req.session.auth})

    } else {
        res.send(`<a href ='/'> <h1> login </h1> </a>`)
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