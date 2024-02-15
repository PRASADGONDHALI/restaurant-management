import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/authContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  getAll,
  getAllCategories,
  getTotalCount,
  getfilteredProduct,
} from "../services/Apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";
import { BASE_URL } from "../services/Helper";
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  // get total count
  const getTotal = async () => {
    try {
      const response = await getTotalCount();
      setTotal(response?.total);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const allProducts = async () => {
    try {
      setLoading(true);
      const response = await getAll(page);
      setLoading(false);
      if (response?.products) {
        setProducts(response.products);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error in fetching products", {
        position: "top-center",
      });
    }
  };
  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const response = await getAllCategories();
      if (response?.category) {
        setCategories(response.category);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await getAll(page);
      setLoading(false);
      setProducts([...products, ...response?.products]);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Filter by category
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // get filtered products
  const filterProduct = async () => {
    try {
      const response = await getfilteredProduct({ checked, radio });
      setProducts(response?.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (!checked.length || !radio.length) allProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
    <Container fluid>
      <Row>
        <Col md={3}>
          <div className="filter-section">
            <h4 className="text-center mt-3">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name.toUpperCase()}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className=" mt-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => window.location.reload()}
                style={{width:'300px'}}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <h1 className="text-center mb-4">All Products</h1>
          <Row className="d-flex flex-wrap justify-content-center">
            {products.map((product) => (
              <Col key={product._id} md={4} className="mb-3">
                <Card className="product-card">
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                  height={250}
                  />
                  <Card.Body>
                    <h6 className="fw-bold">{product?.name?.toUpperCase()}</h6>
                    <Card.Text>{product.description.substring(0, 20)}</Card.Text>
                    <h5 className="fw-bold">₹{product.price}</h5>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        More Details
                      </Button>
                      <Button
                        variant="dark"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Item added to cart", {
                            position: "top-center",
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            {products && products.length < total && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Load More"}
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  </Layout>);
};

export default HomePage;
