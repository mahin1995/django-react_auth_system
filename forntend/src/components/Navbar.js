import React,{useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth_action";
import {Navigate} from "react-router-dom";

function Navbar({ logout, isAuthenticated }) {
  const [redirect,setRedirect]=useState(false)
 
  const logout_user=()=>{
    logout()
    setRedirect(true)
  }
  const guestLinks = () => (
    <React.Fragment>
    <li className="nav-item">
      <Link to="/login" className="nav-link">
        Login
      </Link>
    </li>
    <li className="nav-item">
      <Link to="signup/" className="nav-link">
        signup
      </Link>
    </li>
  </React.Fragment>
  )
  const authLink = () => (
    <React.Fragment>
    <li className="nav-item">
      <Link to="/" className="nav-link active" aria-current="page">
        Home
      </Link>
    </li>
    <li className="nav-item">
      <a href="#!" onClick={logout_user} className="nav-link">
        Logout
      </a>
    </li>
  </React.Fragment>
  )
  // const logoutHandaler = () => {
  //   logout();
  // };
  return (
    <React.Fragment>
  <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="fs-4">React auth example</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            aria-controls="navbarNav"
            data-bs-target="#navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            {isAuthenticated?authLink():guestLinks()}

            </ul>
          </div>
        </div>
      </nav>
    </div>
    {redirect?<Navigate to="/" />:<React.Fragment></React.Fragment>}
    </React.Fragment>
  
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
