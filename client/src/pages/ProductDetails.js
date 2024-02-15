import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { getRelatedProducts, getSingleProducts } from "../services/Apis";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/Helper";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const response = await getSingleProducts(params.slug);
      setProduct(response?.products);
      getSimilarProducts(
        response?.products._id,
        response?.products.category._id
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getSimilarProducts = async (pid, cid) => {
    try {
      const response = await getRelatedProducts(pid, cid);
      setRelatedProducts(response?.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout title={"Product Details - Delicious"}>
      <div className="container-fluid mt-4 product-details">
        {product && (
          <Row>
            <Col md={6}>
              <img
                src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                alt="Product Image"
                className="img-fluid rounded product-image"
              />
            </Col>
            <Col md={6} className="product-details-info">
              <Row className="p-3 ">
                <h3 className="mb-4 text-center">PRODUCT DETAILS</h3>
                <h5>{product.name.toUpperCase()}</h5>
                <h4>{product.description}</h4>
                <h5>Category: {product.category.name.toUpperCase()}</h5>
                <Row>
                  <h5 className="fw-bold">₹{product.price}</h5>
                </Row>

                <Button
                  variant="dark"
                  className="mt-3 add-to-cart-btn"
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
                  style={{ width: "300px" }}
                >
                  ADD TO CART
                </Button>
              </Row>
            </Col>
          </Row>
        )}
      </div>
      <hr />
      <div className="container mt-4 mb-3">
        <h2 className="mb-4">Similar Products</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {relatedProducts.map((product) => (
            <Col key={product._id}>
              <Card className="h-100 similar-product-card">
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                  alt="Product Image"
                  className="img-fluid rounded similar-product-image"
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{product.name}</Card.Title>
                  <Card.Text>{product.description.substring(0, 20)}</Card.Text>
                  <Card.Text>
                    <h5 className="fw-bold">₹{product.price}</h5>
                  </Card.Text>
                  <Button
                    variant="dark"
                    className="mt-3 add-to-cart-btn"
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
                    style={{ width: "300px" }}
                  >
                    ADD TO CART
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
        {relatedProducts.length < 1 && (
          <p className="text-center mt-4">No Similar Products Found</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
