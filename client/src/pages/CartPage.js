import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/Cart";
import { addOrder, placeOrder } from "../services/Apis";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/Helper";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      toast.error(error.message)
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      toast.error(error.message)
    }
  };
  const handlePayment = async () => {
    try {
      const tokenData = localStorage.getItem("authData");
      const authData = JSON.parse(tokenData);
      const token = authData.token;
      const response = await placeOrder({ cart }, token);
      if (response?.success) {
        
        const options = {
          key: process.env.REACT_APP_RAZOR_URL,
          amount: response.order.amount,
          currency: "INR",
          name: "Delicious",
          description: "Payment for your order",
          order_id: response.order.id,
          handler: async function (res) {
            // Handle successful payment here
            let paymentDetails ={
                amount :response.order.amount/100,
                ...res
            }
            const data = await addOrder({ cart,paymentDetails }, token);
            if (data){
                setLoading(false);
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Payment Completed Successfully ",{
                    position:'top-center'
                });
            }
          },
          prefill: {
            name: auth?.token?.user.name,
            email: auth?.token?.user.email,
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast.error(error.message)
      setLoading(false);
    }
  };
  

  return (
    <Layout>
  <div className="cart-page">
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center bg-light p-4 mb-4 rounded">
          {!auth?.token.user
            ? "Hello Guest"
            : `Hello ${auth?.token && auth?.token?.user?.name}`}
          <p className="text-center">
            {cart?.length
              ? `You Have ${cart?.length} Items in Your Cart ${
                  auth?.token ? "" : "Please Login to Checkout!"
                }`
              : "Your Cart Is Empty"}
          </p>
        </h1>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          {cart?.map((p, index) => (
            <div className="row card card-hover flex-row mb-3" key={`${p._id}_${index}`}>
              <div className="col-md-4">
                <img
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}

                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title"><h6 className="fw-bold">{p.name.toUpperCase()}</h6></h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text"><h6 className="fw-bold">₹{p.price}</h6></p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-5 cart-summary">
          <div className="bg-light p-4 rounded mb-4">
            <h2 className="text-center">Cart Summary</h2>
            <p className="text-center">Total | Checkout | Payment</p>
            <hr />
            <h4 className="text-center">Total: {totalPrice()}</h4>
          </div>
          {auth?.user?.address ? (
            <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
              <button
                className="btn btn-warning mb-2"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <>
                  <button
                    className="btn btn-outline-dark mb-2 mx-2"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark mb-2 mx-2"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? "Processing" : "Place Order"}
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-dark"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Please Login to Checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default CartPage;
