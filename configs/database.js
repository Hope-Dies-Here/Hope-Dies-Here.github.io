import { MongoClient } from 'mongodb'
import 'dotenv/config'

const uri = 'mongodb://localhost:27017/heroku'
let dbConnetion


const connectToDb = async (dbName, cb) => {
    try {
        const client = await MongoClient.connect(uri)
        dbConnetion = client.db(dbName)
        console.log('db connected')
        return cb()
    } catch (error) {
        console.log(error)
        return cb(error)
    }
}

const getDb = () => dbConnetion

export { getDb, connectToDb }