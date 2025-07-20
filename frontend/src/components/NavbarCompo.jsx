import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { BookSto } from "../Context";

function NavbarCompo() {
  const { token, userDetails, logout } = useContext(BookSto);
  const navigate = useNavigate();

  return (
    <>
      <nav
        class="navbar bg-dark border-bottom border-body p-3"
        data-bs-theme="dark"
      >
        <div className="mx-2 d-flex align-items-center justify-content-between">
          <div>
            <Navbar.Brand
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              BookSto
            </Navbar.Brand>
          </div>
          <Nav className="me-auto">
            <span
              className="text-white mx-2 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </span>
            <span
              className="text-white mx-2 cursor-pointer position-relative"
              onClick={() => {
                navigate("/search");
              }}
            >
              AI Search
              <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
              </span>
            </span>
            <span
              className="text-white mx-2 cursor-pointer"
              onClick={() => {
                navigate("/about");
              }}
            >
              About Us
            </span>
          </Nav>
        </div>
            {token && userDetails ? (
              <span class="nav-item dropdown">
                <span
                  class="dropdown-toggle text-info"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello, {userDetails.name}
                </span>
                <ul class="dropdown-menu">
                  <li>
                    <span
                      class="dropdown-item cursor-pointer"
                      onClick={() => {
                        navigate("/my-address");
                      }}
                    >
                      My Address
                    </span>
                  </li>
                  <li>
                    <span
                      class="dropdown-item cursor-pointer"
                      onClick={() => {
                        navigate("/my-orders");
                      }}
                    >
                      My Orders
                    </span>
                  </li>
                  <li>
                    <span
                      class="dropdown-item cursor-pointer"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              </span>
            ) : (
              <span
                className="text-white mx-2 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>
            )}
      </nav>
    </>
  );
}

export default NavbarCompo;
