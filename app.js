const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 80;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'userdb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User added', id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
