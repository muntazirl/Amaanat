const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const cors=require('cors')
dotenv.config()
// or import 'dotenv/config' // for esm

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const app = express()
app.use(cors())
const port = 3000
app.use(bodyparser.json())

const dbName = 'amaanat';

client.connect();

//for getting passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passswords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//for saving passwords
app.post('/', async (req, res) => {
  let pass=await req.body
  const db = client.db(dbName);
  const collection = db.collection('passswords');
  const findResult = await collection.insertOne(pass);
  res.send({success: true, result: findResult})
})
//for deleting
app.delete('/', async (req, res) => {
  let pass=await req.body
  const db = client.db(dbName);
  const collection = db.collection('passswords');
  const findResult = await collection.deleteOne(pass);
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})