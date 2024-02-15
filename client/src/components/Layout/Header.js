import React from "react";
import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("authData");
    navigate("/");
    toast.success("Logout Successful", {
      position: "top-center",
    });
  };
  

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
        <Image src="/logo.png" alt="Logo" style={{ width: "100px", height: "auto" }} />            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <SearchInput />
            <Nav.Link as={NavLink} to="/" className="nav-link">
              Home
            </Nav.Link>

            {categories && (
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/category`}>
                  All Categories
                </NavDropdown.Item>
                {categories.map((category) => (
                  <NavDropdown.Item
                    key={category._id} // Changed key to category.slug
                    as={NavLink}
                    to={`/category/${category.slug}`}
                  >
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {!auth.token.user ? (
              <>
                <Nav.Link as={NavLink} to="/register" className="nav-link">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="nav-link">
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  title={auth.token.user.name ? auth.token.user.name : "USER"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to={`/dashboard/${
                      auth.token.user.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <Nav.Link as={NavLink} to="/cart" className="nav-link">
              Cart ({cart.length})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
