import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../services/Apis";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    const { email, name, phone, address } = auth.token.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.token?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let tokenData = localStorage.getItem("authData");
      let authData = JSON.parse(tokenData);
      const token = authData.token;
      const response = await updateUserDetails(
        {
          name,
          email,
          password,
          phone,
          address,
        },
        token
      );
      if (response.success) {
        tokenData = JSON.parse(tokenData);
        tokenData.token.user = response.updatedUser;
        localStorage.setItem("authData",JSON.stringify(tokenData))
        toast.success("User details updated successful!", {
          position: "top-center",
        });
      } else {
        toast.error(`User details updation failed: ${response.message}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(`User details updation failed: ${error}`, {
        position: "top-center",
      });
    }
  };
  return (
<Layout title="Profile">
  <Container fluid className="m-3 p-3">
    <Row>
      <Col md={3}>
        <UserMenu />
      </Col>
      <Col md={9}>
        <div className="form-container shadow p-5" style={{ minHeight: "90vh" }}>
          <form onSubmit={handleSubmit} className="w-75 mx-auto">
            <h4 className="title mb-4">USER PROFILE</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Your Name"
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Enter Your Phone"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="Enter Your Address"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              UPDATE
            </button>
          </form>
        </div>
      </Col>
    </Row>
  </Container>
</Layout>

  );
};

export default Profile;
