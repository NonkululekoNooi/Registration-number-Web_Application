const flash = require("express-flash");
const session = require("express-session");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const myGreetedRoutes = require("./routes/regRoutes");
const myReg = require("./regFacFun");

const pgp = require("pg-promise")();
const app = express();

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://codex:pg123@localhost:5432/registrations";

const config = {
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = pgp(config);

const regNo = myReg(db);
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "using session http",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async function (req, res) {
  var message = await regNo.getRegistration();
  res.render("index", {
    message
  });
});

app.post("/reg_numbers", async function (req, res) {
  let enteredReg = req.body.regPlates.toUpperCase().trim();
  let validPlates =  /[A-Z]{2,3}\s[0-9]{3}(\-|\s)?[0-9]{3}/
  
  
  if(!enteredReg){
    req.flash("error", "Please type in your registration number ");
  }
  else if(validPlates.test(enteredReg) == false){
    req.flash('error',"Invalid registration number entered");
  }

  else if(await regNo.photoCopy(enteredReg) !== null){
    req.flash('error', 'THIS REGISTRATION IS ALREADY EXISTING')  
  }

  else if(validPlates.test(enteredReg) === true){
     await regNo.getRegistration();
      await regNo.storedRegistration(enteredReg);
  } 
  res.redirect("/");
});



app.post("/filtering",async function(req, res) {
  var dropdown = req.body.places
  var showed = req.body.place
  console.log(dropdown)
  if(dropdown === "SHOW ALL"){
    var regEntered = await regNo.getRegistration() 
  
  }else {
    var regEntered = await regNo.filtered(dropdown) 
}
res.render("index",{
  message:regEntered
})
});
  

app.get("/resets", async function  (req, res) {
  await regNo.rested();      
  req.flash("error","YOU RESETED EVERYTHING");
  res.redirect("/");
})


const PORT = process.env.PORT || 3008;
app.listen(PORT, function () {
  console.log("APP STARTED AT PORT", PORT);
});
