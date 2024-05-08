require('dotenv').config();
const express = require('express');
const { sequelize } = require('./connection');
const { Author, Book } = require('./models');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi database II class');
});

app.post('/author', async (req, res) => {
    let nombre = req.body.name;
    let edad = req.body.age;

    if(!nombre || !edad) {
      res.status(400).send('Falto edad o nombre');
    }
    try {
      let almacenar = await Author.create({
        name: nombre,
        age: edad
      });
      res.status(201).json({
        author: almacenar
      })
    } catch (error){
      res.status(500).send('Error al escribir');
    }
  }
)

app.post('/book', async(req, res) => {
  try {
    const isbn = req.body.isbn ? req.body.isbn : "";
    const name = req.body.bookName;
    const cantPages = req.body.numberPages ? req.body.numberPages : 0;
    const author = req.body.authorId;

    if(!name || !authorId) {
      res.status(400).json({
        message: "Falta id de autor o nombre del libro"
      })
    }
    const newBook = await Book.create({
      isbn,
      name,
      cantPages,
      authorId: author
    })
    res.status(201).json({
      book: newBook
    });
  } catch(error){
    console.log("Error ", error);
    res.status(500).json({
      message : 'Internal server error'
    });
  }
})


async function main() {
  try{
    await sequelize.authenticate()
    console.log('conectado a la base de datos');
    await sequelize.sync();
    console.log('modelos sincronizados');
    app.listen(port, () => {
      console.log('Servidor escuchando en el puerto ' + port);
    })
  } catch(error) {
    console.log('Error al conctar a la base de datos' + error);
  }
}

main ()

