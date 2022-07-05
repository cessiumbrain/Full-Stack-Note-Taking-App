const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser= require('body-parser')

const firebase = require('firebase')

const app = express()
const port = 5000

//middleware
app.use(bodyParser())
app.use(cors())

app.listen( port || 5000, ()=>{
    console.log(`listening on port ${port}`)
} )

//Connect DB
mongoose.connect('mongodb://localhost/note-taking-users')
    .then(()=>{
        console.log('connected!')
    })

//schema---------->
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
})   
const notebookSchema = new mongoose.Schema({
    title: String,
    notes: [noteSchema]
})    
const userSchema = new mongoose.Schema({
    id: String,
    notebooks: [notebookSchema]
})

//model---------->
const User = mongoose.model('user', userSchema)

const createUser = async(userId)=>{

    const newUser = new User({
        id: userId
    })


    newUser.save()
}

//routes
//create new user
app.post('/:uid/notebooks', (req, res)=>{
    createUser(req.params.uid)
})
//create new notebook
