const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');


const dbConfig = {
  host: 'dam.inspedralbes.cat',
  user: 'a21adahidsan_userTR2',
  password: 'Paco1234',
  database: 'a21adahidsan_TR2',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

app.get('/api/ValidateLogin', (req, res) => {
  const user = req.query.user;
  const password = req.query.password;

  const sqlQuery = 'SELECT * FROM USERS WHERE username = ? AND password = ?';

  connection.query(sqlQuery, [user, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en la consulta');
    } else {
      if (results.length > 0) {
        res.send('Verificado');
      } else {
        res.send('Usuario o contraseña incorrectos');
      }
    }
  });
  //connection.release();
});

app.get('/api/getQuestions', (req, res) => {
  const filePath = path.join(__dirname, 'questions.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    try {
      if (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer el archivo');
      } else {
        const questions = JSON.parse(data);
        res.json(questions);
      }
    } catch (error) {
      console.error('Error al analizar el JSON:', error);
      res.status(500).send('Error al analizar el JSON');
    }
  });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



