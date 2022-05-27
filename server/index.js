const express = require("express");
const app = express();
const cors = require('cors');
const db = require("./config/db");

app.use(cors());
app.use(express.json());

const PORT = 3001;

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

app.get('/employees', (req,res) => {
  db.query("SELECT * FROM employees", (err,result) =>{
    if (err){
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put('/update', (req,res) =>{
  const id = req.body.id;
  const wage = req.body.wage;
  db.query("UPDATE employees SET wage = ? WHERE id = ?", [wage, id], (err,result) =>{
    if (err){
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.delete('/delete/:id', (req,res) => {
  const id = req.params.id
  db.query("DELETE FROM employees WHERE id = ?", id, (err,result) => {
    if (err){
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Yours server is running on port ${PORT}`);
});

