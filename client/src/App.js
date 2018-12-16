import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = { email: '', password: '', jwt: '', urls: [] }

  login(e) {
    e.preventDefault()

    let query =`mutation{
      signinUser(
        email: {
          email: "${this.state.email}",
          password: "${this.state.password}"
        }
      ){
        token
        user{
          id
          email
        }
      }
    }`

    fetch('http://localhost:3001/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      let user = data.data.signinUser

      if(user) {
        this.setState({
          jwt: user.token
        }, () => {
          this.retrieveUrls();
        })
      }
      else {
        alert('Incorrect username or password')
      }
    })
  }

  retrieveUrls() {
    let query = `query {
      allLinks {
        id
        url
        description
      }
    }`

    fetch('http://localhost:3001/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.jwt}`,
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ urls: data.data.allLinks })
      })
  }

  renderUrlsListing() {
    let urlRecords = this.state.urls.map(url => {
      return (
        <tr key={url.id}>
          <td>{url.id}</td>
          <td>{url.url}</td>
          <td>{url.description}</td>
        </tr>
      )
    })
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Url</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{urlRecords}</tbody>
      </table>
    )
  }

  renderLogin() {
    return (
      <div>
        <h3>Login</h3>
        <form>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              autoComplete="on"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={this.state.password}
              autoComplete="on"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={e => this.login(e)}>
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.jwt === '' && this.renderLogin()}
        {this.state.jwt !== '' && this.renderUrlsListing()}
      </div>
    )
  }
}

export default App
