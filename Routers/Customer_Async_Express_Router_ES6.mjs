// Customer_Async_Express_Router_ES6.mjs
import express from 'express';
const router = express.Router();
// import mongoose from "mongoose";
import Customer from '../Models/Customer_MongoDB_Schema.mjs';

const collection =
  router.get('/', async (req, res) => {
    try {
      const data = await Customer.find({});
      if (!data) {
        return res.sendStatus(404);
      }
      res.json(data);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Customer.findById(id);
    if (!data) {
      return res.sendStatus(404);
    }
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.get('/lookupfirstname/:firstName', async (req, res) => {
  try {
    const { firstName } = req.params;
    const data = await Customer.find({ first_name: firstName });
    if (!data) {
      return res.sendStatus(404);
    }
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

export default router;