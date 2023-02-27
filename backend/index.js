const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

//Middleware dla parsowania JSON
app.use(express.json());
// allow requests from http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173'
}));


app.post('/prompt', (req, res) => {
  const language = req.body.language;
  const text = req.body.text;

  // Wykonaj odpowiednie operacje na podstawie przesłanych danych
    console.log("text = "+text)
    console.log("lang = "+ language)

  res.status(200).json({ message: 'Success' }); // Zwróć odpowiedź w formacie JSON
});

app.listen(
    PORT,
    () => console.log('http://localhost:'+ PORT)
)