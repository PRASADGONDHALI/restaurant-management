import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../../styles/AuthStyles.css";
import { loginFunc } from "../../services/Apis";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginFunc({
        email,
        password,
      });
      if (response.success) {
        const authData = {
          token: response.result,
          user: response.user,
        };
        setAuth({
          ...auth,
          user: response.result.user,
          token: response.result.token,
        });
        localStorage.setItem("authData", JSON.stringify(authData));
        navigate(location.state || "/");
        window.location.reload(false);
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
    <Layout title={"Register- Delicious"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
