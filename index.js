//importing libraries
const express = require('express');
const http = require('http')
const socket = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socket(server)
const {formatDiscussions,getTime} = require('./utils/discussions')
const {formatComments} = require('./utils/comment')

const {userJoin, getCurrentUser} = require('./utils/users')

const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const con = require('./connection')



const qs = require('querystring')
const loginRoute = require('./router/login')
const registerRoute = require('./router/register')
const dashboardRoute = require('./router/dashboard')
const logoutRoute = require('./router/logout')
const fetchRoute = require('./router/fetch')
// const saveRoute = require('./router/save')




// const router = require('./router')
const port = 3000;


app.use(session({
    secret: 'usersession',
    resave: false,
    saveUninitialized:true,
}))



app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/dashboard', dashboardRoute);
app.use('/logout', logoutRoute);
app.use('/fetch', fetchRoute);
// app.use('/posts', postRoute);
// app.use('/join', joinRoute);


app.get('/', (req, res)=>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.sendFile(path.join(__dirname)+'/landing.html')
})

app.post('/',(req, res)=>{
    res.redirect('/login')

})

// app.get('/api/data', async (req, res) => {
//     try {
//       const [rows, fields] = await con.execute('SELECT * FROM discussions');
//       res.json(rows);
//     } catch (err) {
//       console.error('Error fetching data from MySQL:', err);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });
// app.get('/pages/robotics.html', (req, res) => {
//     // Extract query parameters from the URL
//     const username = req.query.username;
//     const room = req.query.room;
    
//     con.query('SELECT * FROM discussions').then(results=>{
//         const jsonData = JSON.stringify(results);
//         const username = req.query.username;
//         const room = req.query.room;
//         res.sendFile(path.join(__dirname, 'views', 'robotics.html'), {
//                 jsonData,
    
//         });
//     }).catch(error=>console.log(error))
        
//     // Query to fetch data from the database
    
// })

app.get('/data', (req, res) => {
    const club = req.query.room;

    // Execute the query
    var sql = `SELECT * FROM discussions WHERE room='${club}'`
        con.query(sql).then((response)=>{
            res.json(response);
            const jsonData = JSON.stringify(response)
            const data = JSON.parse(jsonData);
            const [[{username, title, description , time}]] = data;
            // const {id, username, title}= jsonData
            console.log(username, title)
        }).catch(e=>console.log(e))
});

app.get('/comments', (req, res)=>{
    
    var showComments = `SELECT * FROM comments`

    con.query(showComments).then((response)=>{
        res.json(response);
        const jsonData = JSON.stringify(response)
        const data = JSON.parse(jsonData);
        const [[{username, comment, time}]] = data;
        // const {id, username, title}= jsonData
    }).catch(e=>console.log(e))
})

// app.get('/data', (req, res) => {
//     const { username, room } = req.query;
//     con.query('SELECT * FROM discussions').then(results=>res.json(results)).catch(e=>console.log(e))
// });


// let rooms = {}

// let room;
// app.get('/pages/robotics.html', (req, res) => {
//     // Access the query parameters from the request object
//     const queryParams = querystring.parse(req.query);

//     // Access the 'room' parameter
//     room = queryParams.room;

// });

io.on('connection', socket=>{
    console.log("New socket connection")
      
    socket.on('join-room', ({username, room})=>{
        
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        // socket.emit('discussion', formatDiscussions('Admin', `Welcome to ${user.room} club`))

        // socket.broadcast.to(user.room).emit('discussion', formatDiscussions('Admin', `${user.username} has joined the room`))


    })

    socket.on('discussion-create', ({title,description,room})=>{
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('discussion',formatDiscussions(user.username, title, description))
        console.log(socket.id)

        var id = socket.id
        var username = user.username;
        var title = title;
        var club = room;
        var time = getTime();
        // console.log(club)

        var sql = "INSERT INTO discussions(id,username,title,description,room,time) VALUES (?,?,?,?,?,?)"
        con.query(sql,[id, username, title,description,room, time],(err,results)=>{
            if(err) throw err
            console.log("Data inserted successfully")
        })
    })  

    socket.on('comment', ({room,threadTitleText,comment})=>{
        const user = getCurrentUser(socket.id)
        console.log(comment)
        io.to(user.room).emit('post-comment',formatComments(user.username, comment))

        var id = socket.id
        var username = user.username;
        var title = threadTitleText
        var comment = comment;
        var club = user.room;
        var time = getTime();
        // console.log(club)

        var sql = "INSERT INTO comments(id,username,title,comments,room,time) VALUES (?,?,?,?,?,?)"
        con.query(sql,[id, username,title, comment, club, time],(err,results)=>{
            if(err) {
                console.error("error inserting data", err)
            }
            console.log("Data inserted successfully")
        })
    })  
})

// app.get('/get-profile',(req, res)=>{
//     const query = 'Select uname from users'

//     con.query(query, (err, result)=>{
//         if(err) throw err;

//         if (result.length > 0) {
//             res.json({ data: result[0].uname });
//         } else {
//             res.json({ data: null });
//         }
//     })
// })


// app.post('/user-join', (req, res)=>{
//     res.send("User joined the group")
// })
//server start
server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})