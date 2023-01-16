import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
           <h1 className="logo">E-DASHBOARD</h1>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>{" "}
          </li>
          <li>
            <Link to="/add">Add Product</Link>{" "}
          </li>
          <li>
            <Link to="/update">Update Product</Link>{" "}
          </li>

          <li>
            <Link to="/profile">Profile</Link>{" "}
          </li>
          <li>
            <Link to="/signup" onClick={logout} >
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          {/* <li>{auth?<Link to='/signup' onClick={logout}>logout</Link>:<Link to='/signup'>signup</Link>} </li>
        <li><Link to='/login'>login</Link> </li> */}
        </ul>
      ) : (
        <ul className="nav-ul  nav-right">
          <li >
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>{" "}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
