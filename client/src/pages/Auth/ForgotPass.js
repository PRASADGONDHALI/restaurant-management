import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../../styles/AuthStyles.css";
import { forgotPassFunc } from "../../services/Apis";
import { toast } from "react-toastify";

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await forgotPassFunc({
          email,
          newPassword,
          answer
        });
        if (response && response.success) {
          
            navigate('/');
        } else {
          toast.error(`Login failed: ${response.message}`, {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error(error.message)
      }
    };
  
  return (
    <Layout title={'Forgot Password'}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Favorite Sport "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>  
    </Layout>
  )
}

export default ForgotPass