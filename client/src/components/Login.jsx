import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { axiosInstance } from "../helpers/authentication";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disabled: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(e) {
    const { email, password } = this.state;
    this.setState({
      disabled: true
    });
    e.preventDefault();
    const LoginQuery = `mutation{
      signinUser(
        email: {
          email: "${email}",
          password: "${password}"
        }
      ){
        token
        user{
          id
          email
        }
      }
    }`;

    try {
      const res = await axiosInstance.post(
        "graphql",
        { query: LoginQuery },
        {}
      );
      const { token, user } = res.data.data.signinUser;
      const { history } = this.props;

      window.localStorage.setItem("token", token);
      window.localStorage.setItem("email", user.email);
      history.push("/");
    } catch (error) {
      const { history } = this.props;
      this.setState({
        disabled: false
      });
      toastr.error("Incorrect Username or Password");
      history.push("/login");
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div className="login-form">
        {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your Account
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleLogin}
                  disabled={disabled}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              {/* eslint-disable-next-line */}
              New to us? <Link to="/register">Register</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
