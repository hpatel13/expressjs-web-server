const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs');



app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append tp server.log');
        }
    });
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name:'Harsh',
    //     places:["USA","India"]
    // })
    res.render('home.hbs',{
        title:'Home',
        message:'Welcome to My Website',
    });
});

app.get('/about',function(req,res){
    res.render('about.hbs',{
        title:'About'
    });
});

app.get('/projects',function(req,res){
    res.render('projects.hbs',{
        title:'Project'
    });
});

app.get('/bad',function(req,res){
    res.send({
        errorMessage:'Unable to handle error. Error Occured!'
    })
});
app.listen(port,()=>{
    console.log("server is up on port: ",port);
});