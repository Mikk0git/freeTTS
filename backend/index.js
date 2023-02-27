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

app.listen(
    PORT,
    () => console.log('http://localhost:'+ PORT)
)


app.post('/prompt', (req, res) => {
  const language = req.body.language;
  const text = req.body.text;


    console.log("text = "+text)
    console.log("lang = "+ language)

    const { spawn } = require('child_process');

    // Uruchomienie skryptu Pythona jako proces podrzędny
    const pythonProcess = spawn('python', ['app.py', text, language]);

    // Przechwytywanie danych z wyjścia standardowego procesu Pythona
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Received data from Python: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error received from Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
    });


  res.status(200).json({ message: 'Success' }); // Zwróć odpowiedź w formacie JSON
});



