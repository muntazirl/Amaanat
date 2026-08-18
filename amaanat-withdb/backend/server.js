const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const cors=require('cors')
dotenv.config()
// or import 'dotenv/config' // for esm

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const app = express()
app.use(cors())
const port = 3000
app.use(bodyparser.json())

const dbName = 'amaanat';



client.connect();

const algorithm='aes-256-cbc'
const key=Buffer.from(process.env.ENCRYPTION_KEY,'hex')

function encrypt(text){
  const iv=crypto.randomBytes(16)
  const cipher=crypto.createCipheriv(algorithm,key,iv)

  let encrypted=cipher.update(text,'utf8','hex')
  encrypted+=cipher.final('hex')

  return iv.toString('hex') + ':'+encrypted
}

function decrypt(data) {
  const [ivHex, encrypted] = data.split(':')                 // pull the iv back out
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

function auth(req,res,next){
    const header=req.headers.authorization
    if(!header){
      return res.status(401).json({error: "No token"})

    }

    const token=header.split(' ')[1]
    try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      req.userId=decoded.userId
      next()
    } catch(err){
      return res.status(401).json({error: "Invalid Token"})
    }
}

//for getting passwords
const db = client.db(dbName);
app.get('/',auth, async (req, res) => {
  const collection = db.collection('passswords');
  const findResult = await collection.find({userId: req.userId}).toArray();
  const decrypted=findResult.map(item=>({
    ...item,password: decrypt(item.password)
  }))
  res.json(decrypted)
})

app.post('/signup', async (req,res)=>{
  const collection=db.collection('users')
  const {email,password}=req.body
  const emailcheck=await collection.findOne({email})

  if(emailcheck){
    return res.status(400).json({error: "user exists"})
  }
  const passhash=await bcrypt.hash(password,10)
  const result=await collection.insertOne({email,passhash})

  const token=jwt.sign({userId: result.insertedId}, process.env.JWT_SECRET,{expiresIn: '7d'})
  res.status(201).json({token})
})

app.post('/login', async (req,res)=>{
  const collection=db.collection('users')
  const {email,password}=req.body
  const isemail=await collection.findOne({email})

  if(!isemail){
    return res.status(401).json({error: "No user exists"})
  }

  const ok=await bcrypt.compare(password,isemail.passhash)

  if(!ok){
    return res.status(401).json({error: "Invalid Credentials"})
  }
  const token=jwt.sign({userId: isemail._id}, process.env.JWT_SECRET,{expiresIn: '7d'})

  res.json({token})
})

//for saving passwords
app.post('/',auth, async (req, res) => {

  const body=req.body
  const pass={...body,password: encrypt(body.password),userId: req.userId}
  const collection = db.collection('passswords');
  const findResult = await collection.insertOne(pass);
  res.send({success: true, result: findResult})
})
// //for deleting
app.delete('/',auth, async (req, res) => {
  const {id}=req.body

  const collection = db.collection('passswords');
  const findResult = await collection.deleteOne({id, userId: req.userId});
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})