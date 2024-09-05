const express = require('express')
const router = express.Router()
const con = require('../connection')


router.get('/clubs', async(req, res)=>{
    try{
        const sql = "SELECT * from clubs"
        const [clubs] = await con.query(sql);

        res.json(clubs);

    }catch(e){
        console.log(e)
    }
})

router.get('/users', async(req, res)=>{
    try{
        const sql = "SELECT * from users"
        const [users] = await con.query(sql);

        res.json(users);

    }catch(e){
        console.log(e)
    }
})

app.post('/join-room', async (req, res) => {
    const { userId, roomId } = req.body;

    try {
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        const [room] = await pool.query('SELECT * FROM rooms WHERE id = ?', [roomId]);

        if (user.length > 0 && room.length > 0) {
            // Add logic to handle user joining a room (e.g., update user record with room information)
            // ...

            res.status(200).send('User joined room successfully');
        } else {
            res.status(404).send('User or room not found');
        }
    } catch (error) {
        console.error('Error joining room:', error);
        res.status(500).send('Internal Server Error');
    }
});