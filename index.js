// Dependencies 
import  express  from "express";
const app = express();
import session from "express-session";
import dotenv from 'dotenv'
dotenv.config() ;

// Session 
app.use(session({
    secret : "new secret key",
    saveUninitialized : true,
    resave : true
}))
app.use((req, res, next) => {
    res.locals.message = req.session.message ;
    delete req.session.message ;
    next()
})

//To parse the Form and json Data 
app.use(express.urlencoded({ extended : true })) ;
app.use(express.json())
app.use(express.static('uploads'))

// Db connection 
import { dbConnection } from "./utils/dbConnect.js";
dbConnection()

//View engine
app.set('view engine', 'ejs') ;
app.set('views', './views') ;

// Routes 
import  homeRoute  from "./routes/homeRoute.js"

app.use("/", homeRoute);

app.listen(process.env.PORT, () => {
  console.log(`app was listening on port ${process.env.PORT}`);
});


