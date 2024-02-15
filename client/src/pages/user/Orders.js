import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { Col, Container, Row, Table } from "react-bootstrap";
import { fetchOrders } from "../../services/Apis";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { BASE_URL } from "../../services/Helper";
import { toast } from "react-toastify";

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      let tokenData = localStorage.getItem("authData");
      let authData = JSON.parse(tokenData);
      const token = authData.token;
      const response = await fetchOrders(null, token);
      setOrders(response);
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title="Orders">
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div key={i} className="border shadow">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>
                          {o?.payment.razorpay_payment_id
                            ? "Success"
                            : "Failed"}
                        </td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="container">
                    {o?.products.map((p, index) => (
                      <div
                        className="row card flex-row"
                        key={`${p._id}_${index}`}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100%"
                            height={"130px"}
                          />
                        </div>
                        <div className="col-md-4">
                          <h6 className="fw-bold">{p.name.toUpperCase()}</h6>
                          <p>{p.description.substring(0, 30)}</p>
                          <h6 className="fw-bold">{p.price}</h6>
                        </div>
                        <div className="col-md-4 cart-remove-btn"></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Orders;
