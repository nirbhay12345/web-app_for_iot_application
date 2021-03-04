const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/info', (req, res) => {

});

app.listen(3000, (req, res) => {
    console.log('Server is running');
});