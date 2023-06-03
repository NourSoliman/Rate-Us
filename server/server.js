const express = require(`express`)
const app = express();
const port = 1997
const db = require(`./db`)
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
require("dotenv").config();




app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  //Method for render.com
// app.use(cors({
//     origin: 'https://rateus.onrender.com',
//     credentials: true,
//   }));
  app.use(cookieParser());

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   next();
  // });
  
//Routers
// const loginSystemRouter = require(`./Routers/api/LoginSystem`);

// app.use(`/api` , loginSystemRouter)

const routers = require(`./Routers/api/routers`)
app.use(`/api` , routers)
app.listen(port , ()=> console.log(`server Running on port ${port}`))