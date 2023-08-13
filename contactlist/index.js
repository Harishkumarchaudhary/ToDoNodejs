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

app.use(express.static('assets'));

//middleware-1
// app.use(function(req, res, next){
//     req.myname = 'Harish'; //Changing request in middleware
//     //console.log('Middleware-1 is called');
//     next();
// })


// //middleware-2
// app.use(function(req, res, next){
//     console.log('My name in MW-2', req.myname);
//     //console.log('Middleware-2 is called');
//     next();
// })

app.get('/', function(req, res){
    //console.log(__dirname); //Directory from which server started
    //res.send('<h1>Cool it is running</h1>')
    //console.log('My name in controller', req.myname);
    return res.render('home', {
        title: "I have send the value of title that will be rendered in Browser",
        contact_list: contactList
    });
});

//Through URL params
// app.get('/delete-contact/:phone', function(req, res){
//     console.log(req.params);
//     console.log(req.params.phone);
// });

//Now through query params
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    console.log(req.query.phone);
});


//Controller to get playground
// app.get('/playground', function(req, res){
//     return res.render('playground', {
//       title: "Play with ejs"
//     });
// });

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