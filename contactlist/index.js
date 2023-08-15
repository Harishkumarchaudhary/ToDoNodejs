const express = require('express');
const port = 8000;
const path = require('path');

const Contact = require('./models/contact');
const db = require('./config/mongoose');

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
        phone: "1111001"
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
    // return res.render('home', {
    //     title: "I have send the value of title that will be rendered in Browser",
    //     contact_list: contactList
    // });

    //Fetch from db now
    Contact.find({}).then((contacts)=>{
        return res.render('home', {
            title: "My Contact List",
            contact_list: contacts
        });
    }).catch((err)=>{
        console.log('error in fetching contacts from db');
        return;
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
    
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if (contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
    
});


//Controller to get playground
// app.get('/playground', function(req, res){
//     return res.render('playground', {
//       title: "Play with ejs"
//     });
// });

app.post('/create-contact', function(req, res){
   // return res.redirect('/playground');
//    contactList.push({
//      name: req.body.name,
//      phone: req.body.phone
//    });
   //or contactList.push(req.body);

   Contact.create({
    name: req.body.name,
    phone: req.body.phone
   }).then((newContact)=>{
       console.log('****', newContact);
       return res.redirect('/')
   }).catch((err)=>{
       console.log('Error in creating contact in Db', err);
       return;
   });
   //return res.redirect('/') //or res.redirect('back') in case or longer URLs;
})

app.listen(port, function(err){
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port:', port);
});