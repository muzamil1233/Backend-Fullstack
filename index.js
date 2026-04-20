import express from 'express'
import cors from 'cors';

import dotenv from 'dotenv'


// import Authrouter from './Route/Auth.rout.js'
// import { dbConnection } from './DbConnection/connection.js'
dotenv.config({path : '.env'})
const app = express();
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://frontend-fulstack-lel1.vercel.app',
//     'https://worldfitcom.netlify.app'
//   ],
//   credentials: true
// }));
//allowing all:
app.use(cors({
  origin: true,
  credentials: true
}));


import { fileURLToPath } from "url";
import path from 'path'

import Authrouter from './Route/Auth.route.js';
import clothrouter from './Route/cloth.route.js';
import { dbConnection } from './DbConnection/connection.js';
import Adminrouter from './Route/AuthAdmin.route.js';
import Bagrouter from './Route/Bag.route.js';
import Emailrouter from './Route/mailExport.route.js';
import Razorpayrouter from './Route/razorpay.route.js';
// import cookieParser from 'cookie-parser'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "view")));
// ✅ Serve uploaded images correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.json())
// app.use(cookieParser())
app.use(express.urlencoded({extended : false}))
dbConnection()
const PORT = process.env.PORT || 8000;


app.use("/api/user" ,  Authrouter);
app.use("/api/cloth",clothrouter );
app.use("/api/Admin", Adminrouter);
app.use("/api/Bag", Bagrouter);
app.use("/api/query", Emailrouter)
app.use("/api/payment", Razorpayrouter);





app.get("/", (req, res) => {
  res.send("Thrift backend is live...");
});
app.get("/test", (req, res) => {
  res.json({ msg: "test route works", routes: ["/api/Bag", "/api/user", "/api/cloth"] });
});


app.listen(PORT , ()=>console.log(`server is connected in port ${PORT}`))
