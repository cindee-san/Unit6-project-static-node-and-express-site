const express = require('express');
const data = require('./data.json');


app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.send('About Page!');
});

app.get('/projects', (req, res) => {
    res.send('Project page Wassup!');
    res.render();
});
app.listen(3000, ()=>{
    console.log('I am running on localhost 3000!')
});