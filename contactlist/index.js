const express = require('express');
const port = 8000;
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //It will looks for views under __dirname
app.use(express.urlencoded());


var contactList = [
    {
        name: "Harish",
        phone: "11111111"
    },
    {
        name: "Kong",
        phone: "11110001"
    },
    {
        name: "Hong",
        phone: "11110001"
    }
]

app.get('/', function(req, res){
    //console.log(__dirname); //Directory from which server started
    //res.send('<h1>Cool it is running</h1>')
    return res.render('home', {
        title: "I have send the value of title that will be rendered in Browser",
        contact_list: contactList
    });
})

//Controller to get playground
app.get('/playground', function(req, res){
    return res.render('playground', {
      title: "Play with ejs"
    });
});

app.post('/create-contact', function(req, res){
   // return res.redirect('/playground');
   contactList.push({
     name: req.body.name,
     phone: req.body.phone
   });
   //or contactList.push(req.body);
   return res.redirect('/') //or res.redirect('back') in case or longer URLs;
})

app.listen(port, function(err){
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port:', port);
});