import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { axiosInstance } from "../helpers/authentication";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disabled: false
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleRegister(e) {
    const { email, password } = this.state;
    const { history } = this.props;
    this.setState({
      disabled: true
    });
    e.preventDefault();
    const RegistrationQuery = `mutation{
      createUser(
        authProvider: {
          email: {
          email: "${email}",
          password: "${password}",
          }
        }
      ){
        id
      }
    }`;

    try {
      const res = await axiosInstance.post(
        "graphql",
        { query: RegistrationQuery },
        {}
      );
      if (res.data.data.createUser) {
        history.push("/login");
      } else {
        history.push("/register");
      }
    } catch (error) {
      this.setState({
        disabled: false
      });
      history.push("/register");
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
              Create an Account
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
                  onClick={this.handleRegister}
                  disabled={disabled}
                >
                  Register
                </Button>
              </Segment>
            </Form>
            <Message>
              {/* eslint-disable-next-line */}
              Already registered? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Register;
