import express  from "express";
import bodyParser from "body-parser";
import { SupplierRoute } from "./src/routes";
import {AgentRoute, LocationRoute} from "./src/routes";
import { AdminRoute } from './src/routes/AdminRoute'
import { LoginRoute } from "./src/routes/LoginRoute";
import {SearchRouter} from "./src/routes/SearchRoute";
import {ProfileRoute} from "./src/routes/ProfileRoute";
import {BookingRoute} from "./src/routes/BookingRoute";
var cors = require('cors')
// import {SupplierRoute} from './routes/SupplierRoute';
// const SupplierRoute = require('./src/routes/SupplierRoute');
// import mongoose from "mongoose";
// var cors = require('cors') 
const app = express();

app.use(cors({
    origin:"http://localhost:3000",
}));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
// app.use("/admin", AdminRoute);
// app.use("/", (req, res) => {
//     res.json({
//         "message":"done", 
//     });
// });
 
app.use("/api/V1/supplier", SupplierRoute); 
app.use("/api/V1", LoginRoute);
app.use('/api/V1/agent',AgentRoute);
app.use('/api/V1/location',LocationRoute);
app.use('/api/V1/admin',AdminRoute) 
app.use("/api/V1/data",SearchRouter)
app.use('/api/V1/view',ProfileRoute);
app.use('/api/V1/Booking',BookingRoute)
// mongoose.connect(MONGOURI).then((result) => {console.log("success")}).catch((error) => {console.error(error)});


app.listen(8000, () => {  
    console.clear();
    console.log("Server is running", );
})