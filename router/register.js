const express = require('express')
const router = express.Router();
const con = require('../connection')
const path = require('path');
const bodyParser = require('body-parser');


const filePath = path.join(__dirname,'../register_club.html')

router.get('/',(req, res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
    res.sendFile(filePath);
})
  

router.post('/', (req, res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');


    console.log(req.body);
    var uname = req.body.name
    var uemail = req.body.email;
    var upassword = req.body.password;


    var sql = "INSERT INTO users(uname,uemail,upassword) VALUES (?,?,?)"
    con.query(sql,[uname,uemail,upassword],(err, result)=>{
            if(err) throw err
            console.log("Success")
            res.redirect('/login');
    })

})
module.exports = router;
