import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { fetchAllOrders, orderStatus } from "../../services/Apis";
import { Select } from "antd";
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Helper";
const { Option } = Select;

const AdminOrders = () => {
  const [auth] = useAuth();
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      let tokenData = localStorage.getItem("authData");
      let authData = JSON.parse(tokenData);
      const token = authData.token;
      const response = await fetchAllOrders(null, token);
      setOrders(response);
    } catch (error) {
      toast.error(error.message)
    }
  };
  const handleChange = async (orderId,value) =>{
    try {
        let tokenData = localStorage.getItem("authData");
      let authData = JSON.parse(tokenData);
      const token = authData.token;
        const response = await orderStatus(orderId,{status:value},token);
        if(response){
        getOrders()}
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"All Orders- Delicious"}>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id,value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
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
                          <h6 className="fw-bold">{p?.name?.toUpperCase()}</h6>
                    <Card.Text>{p.description.substring(0, 20)}</Card.Text>
                    <h5 className="fw-bold">₹{p.price}</h5>
                    
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

export default AdminOrders;
