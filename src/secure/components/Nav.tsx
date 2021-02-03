import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Role } from "../../classes/role";
import { User } from "../../classes/user";

class Nav extends Component {
  state = {
    redirect: false,
    user: new User(0, "", "", "", new Role(0, "", []), []),
  };

  componentDidMount = async () => {
    const response = await axios.get("user");
    console.log(response);

    this.setState({
      user: response.data.data,
    });
  };

  handleClick = () => {
    localStorage.clear();
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
          Dashboard
        </a>
        <ul className="my-2 my-md-0 mr-md-3">
          <Link to={"/profile"} className="p-2 text-white">
            {this.state.user.first_name} {this.state.user.last_name}
          </Link>
          <a className="p-2 text-white" onClick={this.handleClick}>
            Sign out
          </a>
        </ul>
      </nav>
    );
  }
}

export default Nav;
