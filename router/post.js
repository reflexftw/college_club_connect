const express = require('express')
const router = express.Router();

router.post('/', (req, res) => {
    const { content } = req.body;
    const sql = 'INSERT INTO posts (content) VALUES (?)';
    connection.query(sql, [content], (err, result) => {
      if (err) {
        console.error('Error inserting post:', err);
        return res.status(500).json({ error: 'Failed to submit post' });
      }
      res.status(201).json({ message: 'Post submitted successfully' });
    });
  });

module.exports = router;