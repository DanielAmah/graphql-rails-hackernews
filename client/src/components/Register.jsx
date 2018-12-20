import React, { Component }  from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { axiosInstance } from '../helpers/authentication';
import { Link } from 'react-router-dom'

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleRegister(e){
    e.preventDefault();
    console.log(this.state.email, this.state.password)
    const RegistrationQuery =`mutation{
      createUser(
        authProvider: {
          email: {
          email: "${this.state.email}",
          password: "${this.state.password}",
          }
        }
      ){
        id
      }
    }`

      try{
        const res = await axiosInstance.post("graphql", { query: RegistrationQuery },{})
        console.log(res.data.data.createUser);
        if(res.data.data.createUser){
          this.props.history.push("/login")
        }
        else{
          this.props.history.push("/register")
        }

      }catch(e){
        console.log(e);
        this.props.history.push("/register")
      }

  }

  render() {
    return (
      <div className='login-form'>
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
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create an Account
          </Header>
          <Form size='large'>
            <Segment>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Button color='teal' fluid size='large' onClick={this.handleRegister}>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            {/* eslint-disable-next-line*/}
            Already registered? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
    )
  }
}

export default Register
