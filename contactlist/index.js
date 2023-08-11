const express = require('express');
const port = 8000;
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //It will looks for views under __dirname

app.get('/', function(req, res){
    //console.log(__dirname); //Directory from which server started
    //res.send('<h1>Cool it is running</h1>')
    return res.render('home');
})

app.listen(port, function(err){
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port:', port);
});