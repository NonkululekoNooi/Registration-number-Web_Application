const flash = require("express-flash");
const session = require("express-session");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const myGreetedRoutes = require('./routes/regRoutes');
const myReg = require("./regFacFun");

const pgp = require("pg-promise")();
const app = express();

const regNo = myReg()
 app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())

app.get('/', function(req,res){

 
 
    res.render('index',{

    });
});

app.post('/reg_numbers', function (req, res){
  
  let enteredReg =req.body.regPlates
  let message = regNo.errorMessages(enteredReg)
  let output = regNo.getRegistration(enteredReg)
  console.log(output)
  console.log(message)

  res.render('index',{
    message,

    
  })
})

app.post('/action', function(req,res){
    
});

app.get('/actions', function(req,res){
 
  
});

app.get('/actions/:actionType', function(req,res){

 
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("APP STARTED AT PORT", PORT);
});