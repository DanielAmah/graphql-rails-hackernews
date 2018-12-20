import React, { Component } from 'react'
import { Redirect } from 'react-router'

import ResponsiveContainer from './ResponsiveContainer'


class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      logout: false
    }
  }

  handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem("jwt-token");
    this.setState({ logout: true });
  }

  render() {
    return (
      this.state.logout ?
      (<Redirect to="/login" />):
      <ResponsiveContainer handleLogout = {this.handleLogout} />
    )
  }
}

export default Home
