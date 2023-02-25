const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 5173;


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/form-submit', (req, res) => {
  const textPrompt = req.body.textPrompt;
  // do something with the textPrompt data
  res.send('Form submitted successfully!');
  console.log(textPrompt)

//Run python
const { spawn } = require('child_process');

// ścieżka do skryptu Pythona
const pythonScript = 'app.py';

// argumenty przekazywane do skryptu Pythona
const args = [textPrompt, 'pl'];

// uruchomienie procesu Pythona
const pythonProcess = spawn('python', [pythonScript, args]);



// obsługa błędów
pythonProcess.on('error', (error) => {
  console.error(`Błąd podczas uruchamiania procesu Pythona: ${error}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Błąd z procesu Pythona: ${data}`);
});

// obsługa zakończenia procesu Pythona
pythonProcess.on('close', (code) => {
  console.log(`Proces Pythona zakończony z kodem ${code}`);
});


});
});