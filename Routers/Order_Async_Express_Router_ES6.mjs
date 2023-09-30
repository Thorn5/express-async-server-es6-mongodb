// Order_Async_Express_Router_ES6.mjs
import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Order from "../Models/Order_MongoDB_Schema.mjs";

const collection =
  router.get("/", async (req, res) => {
    try {
      const data = await Order.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'customer_id',
            foreignField: '_id',
            as: 'customer'
          }
        },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product_id',
            foreignField: '_id',
            as: 'products'
          }
        },
        {
          $project: {
            customer: {
              $arrayElemAt: ['$customer', 0]
            },
            items: {
              $map: {
                input: '$items',
                as: 'item',
                in: {
                  product_id: '$$item.product_id',
                  sale_price: '$$item.sale_price',
                  quantity: '$$item.quantity',
                  name: {
                    $arrayElemAt: [
                      '$products.name',
                      {
                        $indexOfArray: ['$products._id', '$$item.product_id']
                      }
                    ]
                  },
                  description: {
                    $arrayElemAt: [
                      '$products.description',
                      {
                        $indexOfArray: ['$products._id', '$$item.product_id']
                      }
                    ]
                  },
                  image: {
                    $arrayElemAt: [
                      '$products.image',
                      {
                        $indexOfArray: ['$products._id', '$$item.product_id']
                      }
                    ]
                  },
                  price: {
                    $arrayElemAt: [
                      '$products.price',
                      {
                        $indexOfArray: ['$products._id', '$$item.product_id']
                      }
                    ]
                  }
                }
              }
            },
            in_cart: 1,
            status: 1
          }
        }
      ])
      if (!data) {
        return res.sendStatus(404);
      }
      res.json(data);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  });

router.get("/:orderId", async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.orderId) },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product_id",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $project: {
          customer: { $arrayElemAt: ["$customer", 0] },
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                product_id: "$$item.product_id",
                sale_price: "$$item.sale_price",
                quantity: "$$item.quantity",
                name: {
                  $arrayElemAt: [
                    "$products.name",
                    { $indexOfArray: ["$products._id", "$$item.product_id"] },
                  ],
                },
                description: {
                  $arrayElemAt: [
                    "$products.description",
                    { $indexOfArray: ["$products._id", "$$item.product_id"] },
                  ],
                },
                image: {
                  $arrayElemAt: [
                    "$products.image",
                    { $indexOfArray: ["$products._id", "$$item.product_id"] },
                  ],
                },
                price: {
                  $arrayElemAt: [
                    "$products.price",
                    { $indexOfArray: ["$products._id", "$$item.product_id"] },
                  ],
                },
              },
            },
          },
          in_cart: 1,
          status: 1,
        },
      },
    ]);
    if (!data) {
      return res.sendStatus(404);
    }
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { customer_id, items } = req.body;
    const order = new Order({ customer_id, items });
    await order.save();
    res.header('Access-Control-Allow-Origin', '*');
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

export default router;