const flash = require("express-flash");
const session = require("express-session");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const myRegRoutes = require("./routes/regRoutes");
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

const reged = myRegRoutes(regNo)

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

app.get("/",reged.home );
app.post("/reg_numbers",reged.regNum);
app.post("/filtering",reged.filter);
app.get("/resets",reged.resets)


const PORT = process.env.PORT || 3008;
app.listen(PORT, function () {
  console.log("APP STARTED AT PORT", PORT);
});
