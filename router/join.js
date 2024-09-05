const express = require('express')
const router = express.Router();
const con = require('../connection')
const path = require('path');
const bodyParser = require('body-parser');

// router.get('/', (req, res) => {
//     const userId = req.session.userId;
//     const userEmail = req.session.email;
//     // console.log(userId)
//     // console.log(userId)
//     console.log(req.session.email)
//     const clubId = req.params.clubId;

//     res.send("hwllo")
//     // Insert user-group relationship into the database
//     // try {
//     //   con.query('INSERT INTO user_clubs (user_id, club_id) VALUES (?, ?)', [userId, clubId]);
//     //   res.send('Joined group successfully!');
//     // } catch (error) {
//     //   res.status(500).send('Error joining group.');
//     // }
    
// });

router.post('/',  (req, res) => {
  const user = {
    userId: 1,
    groupId: 1
  };

  // Check if the user is already a member of the group
  const existingMembership = con.query(
      'SELECT * FROM user_clubs WHERE user_id = ? AND club_id = ?',
      [user.userId, user.groupId]
  );

  if (existingMembership.length > 0) {
      return res.status(400).json({ error: 'User is already a member of the group' });
  }

  // Insert a new membership record
  con.query('INSERT INTO user_clubs (user_id, club_id) VALUES (?, ?)', [user.userId, user.groupId]);

  res.status(200).json({ message: 'User joined the group successfully' });
});

module.exports = router;