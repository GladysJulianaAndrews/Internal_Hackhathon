const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  port:4306,
  user: 'root',
  password: '',
  database: 'studentReg'
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL!');
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.post('/register', (req, res) => {
  const { name, email, age } = req.body;
  const student = { name, email, age};
  const query = 'INSERT INTO students SET ?';
  connection.query(query, student, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database: ', err);
      res.send('Error registering student.');
      return;
    }
    console.log('Student registered successfully!');
    res.send('Student registered successfully!');
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
