// const mysql = require('mysql')
const mysql = require('mysql2/promise')

var con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collegeclubconnect'
})

// con.connect((err)=>{
//     if(err) throw err;
//     console.log("Connected to the database");
// })

con.query("Select 1").then(()=>console.log("Database connected")).catch(e=>console.log(e))
module.exports = con;