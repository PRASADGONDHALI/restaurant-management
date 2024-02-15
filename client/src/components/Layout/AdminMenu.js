import React from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <ListGroup as="ul">
          <h4>Admin Panel</h4>
          <NavLink as="li" to="/dashboard/admin/create-category" className="list-group-item" >
            Create Category
          </NavLink>
          <NavLink as="li" to="/dashboard/admin/create-product" className="list-group-item" >
            Create Product
          </NavLink>
          <NavLink as="li" to="/dashboard/admin/products" className="list-group-item" >
            Products
          </NavLink>
          <NavLink as="li" to="/dashboard/admin/orders" className="list-group-item" >
            Orders
          </NavLink>
          <NavLink as="li" to="/dashboard/admin/users" className="list-group-item" >
            Users
          </NavLink>
        </ListGroup>
      </div>
    </>
  );
};

export default AdminMenu;
