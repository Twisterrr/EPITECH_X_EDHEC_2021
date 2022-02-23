
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const { spawn } = require('child_process');
const fs = require("fs")
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/imageAI', (req, res) => {

    res.sendFile(path.join(__dirname, 'front.html'));
});


app.get('/salut', (req, res) => {

    
    const IA = spawn(`./runIA.sh ${req.query.imageName}`, [], {shell: true});

    console.log(`./runIA.sh ${req.query.imageName}`)
    IA.on('close', (code) => {
        if (code == -1) {
          res.send('ERROR!!!!')
          return
        }

        /*const file = fs.readFileSync('salut', 'utf8');
        

        fs.readFile('le_nom_du_fichier', (err, data) => {
            if (err) {
              res.send('ERROR!!!!')
              return
            }
        });*/
    });

});

app.get('/result.json', (req, res) => {
    delete require.cache[require.resolve('../result.json')]
    var json = require('../result.json');
    res.json(json)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

const mdr = (a) => {
  a + 1
  console.log('salut')
}

mdr(3)