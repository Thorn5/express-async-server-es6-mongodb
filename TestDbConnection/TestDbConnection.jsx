// TestDbConnection.jsx

// Host the frontend and backend on a service like Render...
// https://dashboard.render.com/

// Example multiCall using product & customer data

import useAsyncAwait from "../Hooks/useAsyncAwait"

const productUrl = "https://express-async-server-es6-mongodb.onrender.com/api/products";
const customerUrl = "https://express-async-server-es6-mongodb.onrender.com/api/customers";

const { // * fetch product data
  loading: productLoading,
  error: productError,
  apiData: productData,
  moduleCalled: productModuleCalled,
} = useAsyncAwait(productUrl);

const { 
    // * fetch customer data
    loading: customerLoading,
    error: customerError,
    apiData: customerData,
    moduleCalled: productModuleCalled,
  } = useAsyncAwait(customerUrl);

useEffect(() => { // * API diagnostics
  console.log("%c*+*+*+*+*+*+ API useEffect diagnostics *+*+*+*+*+*+", "color: #35e859");
  console.log("Product", productModuleCalled, productData);
  console.log("Customer", productModuleCalled, customerData);
  console.log("%c*+*+*+*+*+*+ /API useEffect diagnostics/ *+*+*+*+*+*+", "color: #35e859");
