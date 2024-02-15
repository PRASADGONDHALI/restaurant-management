import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteProduct,
  getAllCategories,
  getSingleProducts,
  updateProduct,
} from "../../services/Apis";
import { BASE_URL } from "../../services/Helper";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const params = useParams();
  //   get single product
  const singleProduct = async () => {
    try {
      const response = await getSingleProducts(params.slug);
      setId(response.products._id);
      setName(response.products.name);
      setDescription(response.products.description);
      setPrice(response.products.price);
      setQuantity(response.products.quantity);
      setShipping(response.products.shipping);
      setCategory(response.products.category);
    } catch (error) {
      toast.error("Product is unavailable", {
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
    getAllCategory();
  }, []);
  useEffect(() => {
    singleProduct();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const tokenData = localStorage.getItem("authData");
      const authData = JSON.parse(tokenData);
      const token = authData.token;

      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category._id);
      if (shipping) {
        productData.append("shipping", true);
      } else {
        productData.append("shipping", false);
      }

      const response = await updateProduct(id, productData, token);

      if (response?.success) {
        toast.success("Product Updated Successfully", {
          position: "top-center",
        });
        navigate('/dashboard/admin/products');
      } else {
        toast.error(`Product Creation failed: ${response.message}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
//   Delete product
const handleDelete = async (e) => {
    e.preventDefault();
    try {
        const answer = window.confirm("Are you sure you want to delete?");
            if (!answer) return

      const tokenData = localStorage.getItem("authData");
      const authData = JSON.parse(tokenData);
      const token = authData.token;

      const response = await deleteProduct(id, null, token);

      if (response?.success) {
        toast.success("Product Deleted Successfully", {
          position: "top-center",
        });
        navigate('/dashboard/admin/products');
      } else {
        toast.error(`Product Deletion failed: ${response.message}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center fw-bold">UPDATE PRODUCTS</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value); 
                }}
                value={category._id}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-dark col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${BASE_URL}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-dark" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
