const express = require('express');
const app = express();
const booksRoute = require('./routes/books');


const bodyParser = require('body-parser');
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json());

app.use('/books', booksRoute);

app.get('/', async (req, res) => {
  res.render("home"); 
});

app.get('/profile', async (req, res) => {
  res.render("profile");
});

const port = 3200;

app.listen(port);
console.log(`listening on http://localhost:${port}`);


