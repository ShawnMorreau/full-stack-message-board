import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import homeLogo from "../images/warbler-logo.png";
import {logout} from "../store/actions/auth";
function NavBar(props) {
    const logout=e=>{
        e.preventDefault();
        props.logout();
    }
    return (
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                        <img src={homeLogo} alt="Home" />
                    </Link>
                </div>
                {props.currentUser.isAuthenticated ? (
                    <ul className="navbar-nav nav navbar-right">
                       <li>
                           <Link to={`/users/${props.currentUser.user.id}/messages/new`}>
                                New message
                            </Link>
                       </li>
                       <li>
                           <a onClick={logout}>Log out</a>
                       </li>
                    </ul>
                ):
                <ul className="navbar-nav nav navbar-right">
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                </ul>
                }
            </div>
        </nav>
    );
}
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}
export default connect(mapStateToProps,{logout})(NavBar);