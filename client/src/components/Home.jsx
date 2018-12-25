import React, { Component } from "react";
import { Redirect } from "react-router";
import { axiosInstance } from "../helpers/authentication";
import ResponsiveContainer from "./ResponsiveContainer";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout(e) {
    e.preventDefault();
    const res = await axiosInstance.delete("logout", {}, {});
    if (res) {
      // eslint-disable-next-line no-console
      console.log(res);
      window.localStorage.clear();
      this.setState({ logout: true });
    }
  }

  render() {
    const { logout } = this.state;
    return logout ? (
      <Redirect to="/login" />
    ) : (
      <ResponsiveContainer handleLogout={this.handleLogout} />
    );
  }
}

export default Home;
