import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Col, Container, Row, Table } from "react-bootstrap";
import AdminMenu from "../../components/Layout/AdminMenu";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../services/Apis";
import { toast } from "react-toastify";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = localStorage.getItem("authData");
      const authData = JSON.parse(tokenData);
      const token = authData.token;

      const response = await createCategory({ name }, token);

      if (response?.success) {
        toast.success("Category Created Successfully", {
          position: "top-center",
        });
        getAllCategory();
      } else {
        toast.error(response.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const response = await getAllCategories();
      if (response?.category){
      setCategories(response.category);}
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [name]);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const tokenData = localStorage.getItem("authData");
      const authData = JSON.parse(tokenData);
      const token = authData.token;

      const response = await updateCategory(
        selected._id,
        { name: updatedName },
        token
      );
      if (response?.success) {
        toast.success("Category Updated Successfully", {
          position: "top-center",
        });
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(response.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  // delete category
  const handlDelete = async (id) => {
    try {
      const tokenData = localStorage.getItem("authData");
      const authData = JSON.parse(tokenData);
      const token = authData.token;

      const response = await deleteCategory(id, { name: updatedName }, token);
      if (response?.success) {
        toast.success("Category Deleted Successfully", {
          position: "top-center",
        });

        getAllCategory();
      } else {
        toast.error(response.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <button
                          className="btn btn-dark ms-2"
                          onClick={() => {
                            setSelected(category); // Ensure setSelected is called before other state updates
                            setVisible(true);
                            setUpdatedName(category.name);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handlDelete(category._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CreateCategory;
