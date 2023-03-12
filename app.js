// Task1: initiate app and run server at 3000
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

const Employee = require("./model/empModel")
const PORT = 3000
const path=require('path');

const app = new express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


dotenv.config({path:"config/.env"})
// Task2: create mongoDB connection 

connectDatabase()


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist",async(req,res)=>{
    try {
        const data = await Employee.find()
        res.send(data)
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
})




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Employee.findOne({"_id":id})
        res.send(data)
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",async(req,res)=>{
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({
            success:true,
            employee
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
})






//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",async(req,res)=>{
    try {
        const data = req.body
        const id = req.params.id
        const deleteResult = await Employee.findByIdAndDelete({"_id":id},data)
        res.send(deleteResult)
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",async(req,res)=>{
    try {
        let data ={
            name : req.body.name,
            location :  req.body.location,
            position :  req.body.position,
            salary :  req.body.salary,
        }
        let id = req.body._id
        const updatedResult = await Employee.findOneAndUpdate({"_id":id},data)
        res.send(updatedResult)
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(PORT,()=>{
    console.log(`server is running on : http://localhost:${PORT}`);
})



