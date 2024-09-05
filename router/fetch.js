const express = require('express')
const router = express.Router()
const path = require('path');
const con = require('../connection')
const filePath = path.join(__dirname,'../dashboard.html')

router.get('/', (req, res)=>{
    const sql = 'Select * from discussions';

    con.query(sql, (error, results)=>{
        if(error) throw error;
        res.json(results);
        // res.sendFile(filePath)
    })
})

module.exports = router;