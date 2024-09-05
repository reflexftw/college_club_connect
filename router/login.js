const express = require('express')
const router = express.Router();
const con = require('../connection')
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname,'../login_club.html')


router.get('/', (req, res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.sendFile(filePath)
})  


// router.post('/', (req, res)=> {
//     //     const { email, password } = req.body;
      
//     //     try {
//     //       const [rows] =  con.query('SELECT * FROM users WHERE uemail = ? AND upassword = ?', [
//     //         email,
//     //         password,
//     //       ]);
      
//     //       if (rows.length === 1) {
//     //         req.session.userId = rows[0].id;
//     //         res.redirect('/dashboard');
//     //       } else {
//     //         res.send('Invalid username or password.');
//     //       }
//     //     } catch (error) {
//     //       console.error(error);
//     //       res.status(500).send('Error during login.');
//     //     }
//     // });

//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(req.session)
//     console.log(email)

//     if (email && password) {
//         con.query('SELECT * FROM users WHERE uemail = ? AND upassword = ?', [email, password], (error, results, fields) => {
//             if (error) {
//                 console.error('Error executing MySQL query:', error);
//                 res.status(500).send('Internal Server Error');
//                 return;
//             }
//             if (results.length===1) {
//                 req.session.isLoggedIn = true;
//                 req.session.email = email;
//                 console.log('Success');
//                 console.log(req.session)
//                 console.log(req.session.email)
//                 console.log(req.session.userId)
//                 res.redirect('/dashboard');
//             }
//             // res.end();
//         });

//     } else {
//         res.send('Please enter Username and Password!');
//     }

// })

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(email)

  
    try {
      const [user] = await con.query('SELECT * FROM users WHERE uemail=? AND upassword=?', [email, password]);
      console.log(user)  
      if (user.length > 0) {
        req.session.isAuthenticated = true;
        req.session.email = email;
        res.redirect('/dashboard');
      } else {
        console.log("Incorrect credentials")
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  });
module.exports = router;
