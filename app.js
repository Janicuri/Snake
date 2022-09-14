const { response } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
require("dotenv").config()

const Datastore = require('nedb')

const database = new Datastore("database.db")
database.loadDatabase()


const port = process.env.PORT || 3000

app.use(express.static('View'))
app.use(express.json({limit:'1mb'}))

function exists(a  , array){
for (let i = 0;i<array.length;i++){
    if(a === array[i].username){
        return true
    }
}
return false
}


app.post("/register",(req,res)=>{
    let data = req.body
    data.score = 0
    database.find({},(err,info)=>{
    if (err){
        response.end()
        return
    }
    if(exists(data.username,info)){
        res.json({
            stat : "Success",
            message: "This account already exists"
        })
        return 
    }
    else{
    database.insert(data)
    res.json({
        stat : "Success",
        message: "Account has been created"
    })    
}
    })
    console.log(data)
    
})

function logger(a,b,array){
    for (let i = 0;i<array.length;i++){
        if(a === array[i].username && b === array[i].password){
            return true
        }
    }
    return false  
}


function position(a,b,array){
    for (let i = 0;i<array.length;i++){
        if(a === array[i].username && b === array[i].password){
            return i
        }
    }
    return 0;
}


app.post("/login",(req,res)=>{
let data = req.body
database.find({},(err,info)=>{
if(err){
    res.end()
    return
}
if(logger(data.username,data.password,info)){
    res.json({stat : "Success",
    message: `Welcome back ${data.username}`,
    score :info[position(data.username,data.password,info)].score,
    condition:true,
    color:info[position(data.username,data.password,info)].color
})
}
else{
    res.json({stat : "Success",
    message: "Wrong username or password",
    condition:false
})
}
})
})


app.post("/score",(req,res)=>{
let data = req.body
console.log(data)
database.update({ username: data.username }, { $set: { score:data.score  } }, { multi: true }, function (err, numReplaced) {

  });

res.json({message:"success"})

})


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
