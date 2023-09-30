// Customer_MongoDB_Schema.mjs
import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  surname: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    house_number: { type: String, required: true },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    country: String
  },
  contact_details: {
    email: { type: String, required: true },
    landline: String,
    cell: String
  },
  payment_details: {
    preferred_method: { type: String, required: true },
    IBAN: { type: String, required: true },
    bank: String
  }
}, { timestamps: true });


const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;