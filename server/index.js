const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'epicodus',
  database: 'employeeSystem'
});

app.post('/create', (req,res) => {
  const name = req.body.name;
  const age = req.body.age;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query('INSERT INTO employees (name, age, position, wage) VALUES (?,?,?,?)',
  [name, age, position, wage], 
  (err,result) => {
    if (err){
      console.log(err)
    }
    else {
      res.send("Values Inserted")
    }
  })
})

app.listen(3001, ()=>{
  console.log("Yours server is running on port 3001");
});
