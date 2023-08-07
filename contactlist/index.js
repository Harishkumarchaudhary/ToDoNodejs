const express = require('express');
const port = 8000;


const app = express();

app.get('/', function(req, res){
    res.send('<h1>Cool it is running</h1>')
})

app.listen(port, function(err){
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port:', port);
});