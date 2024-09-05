const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const filePath = path.join(__dirname,'../dashboard.html')


router.get('/', (req, res) => {
    if(!req.session.isAuthenticated){
        res.redirect('/login')
    }   
    res.sendFile(filePath)
});

module.exports = router;