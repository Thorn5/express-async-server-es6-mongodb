// Async_Express_Server_ES6.mjs
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = process.env.PORT || 8001;
// const port = 8001;
import morgan from 'morgan';
import cors from 'cors';
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
import "../Database/Async_Express_DB_Client_ES6.mjs";
import customer from '../Routers/Customer_Async_Express_Router_ES6.mjs';
import product from '../Routers/Product_Async_Express_Router_ES6.mjs';
import order from '../Routers/Order_Async_Express_Router_ES6.mjs';

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/customers', customer);
app.use('/api/products', product);
app.use('/api/orders', order);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


