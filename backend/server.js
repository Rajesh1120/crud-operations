const express = require('express');
const mysql = require('mysql')
const cors= require('cors');

const app= express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: "signup"
})

app.post ("/signup",(req,res) => {
    const sql =  " INSERT INTO students (`username`,`email`,`phonenumber`,`password`,`conformpassword`) VALUES(?)";
    
    const emailvalidation= 'select * from students where `email` = ?';
    
    db.query (emailvalidation,[req.body.email],(err,data)=>{
        if (err){
            return res.json('error');
        }
        if (data.length > 0){
            return res.json("email is already exist")
        }
        else{
            const values = [
                req.body.username,
                req.body.email,
                req.body.phonenumber,
                req.body.password,
                req.body.conformpassword
            ]
            
            db.query(sql,[values], (err,data) => {
                if(err){
                    return res.json("error");
                }
                return res.json(data);
            })
        }
    })
    
})

app.post ("/signin",(req,res) => {
    const sql =  " SELECT * FROM students WHERE `email` = ? AND `password` = ? ";
    db.query(sql,[req.body.email,req.body.password], (err,data) => {
        if(err){
            return res.json("error");
        }
        if (data.length > 0){

            return res.json('success')
        }else{
            return res.json('Failed');
        }
    })
})

app.listen(8081,()=>{
    console.log("server is started....!")
})