import React from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <ListGroup as="ul">
          <h4>Dashboard</h4>
          <NavLink as="li" to="/dashboard/user/profile" className="list-group-item">
            Profile
          </NavLink>
          <NavLink as="li" to="/dashboard/user/orders" className="list-group-item">
            Orders
          </NavLink>
        </ListGroup>
      </div>
    </>
  );
};

export default UserMenu;
