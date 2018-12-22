import PropTypes from 'prop-types'
import React  from 'react'
import {
  Container,
  List,
  Button, Header, Modal,
  Segment, Form, TextArea
} from 'semantic-ui-react'

import { axiosInstance } from '../helpers/authentication';
import { toastr } from 'react-redux-toastr'
import '../App.css'



class HomepageHeading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUrls: [],
      modalOpen: false,
      url: '',
      description: ''
    }
    this.handleCreateLink = this.handleCreateLink.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  componentDidMount() {
    this.showUrlListings();
  }

  async handleCreateLink() {
    let createListings = `mutation{
      createLink(
        url: "${this.state.url}",
        description: "${this.state.description}"
      ){
        id
        url
        description
      }
    }
    `
    const token = window.localStorage.getItem("token")
    const email = window.localStorage.getItem("email")
    try{
      const res = await axiosInstance.post("graphql", { query: createListings },{headers: { 'X-User-Email': email, 'X-User-Token': token}})
      console.log(res, 'response');
      if(res) {
        this.handleClose();
        this.showUrlListings();
      }
    }catch(e){
      toastr.error(e.message)
    }
  }

  async showUrlListings(){
    let showListings = `query {
      allLinks {
        id
        url
        description,
        postedBy {
          id
          email
        }
      }
    }`
    const token = window.localStorage.getItem("token")
    const email = window.localStorage.getItem("email")
    try{
      const res = await axiosInstance.post("graphql", { query: showListings },{headers: {'X-User-Email': email, 'X-User-Token': token}})
      this.setState({
        allUrls: res.data.data.allLinks
      })
    }catch(e){
      toastr.error(e.message)
    }
  }
  render() {

    const urlItems = this.state.allUrls.map(url =>
      <List.Item key={url.id}>
        <List.Icon name='linkify' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as='a'>{url.url}</List.Header>
          <List.Description as='a'>{url.description}</List.Description>
          <List.Description as='a'><em>Created by <strong>{url.postedBy.email}</strong></em></List.Description>
        </List.Content>
      </List.Item>
    )
    return(
      <div>
      <Container>
        <div className="ui clearing segment create-link-container">
        <Modal
        trigger={<Button className="ui right floated teal button" onClick={this.handleOpen}>Add Link</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
      <Header icon='browser' content='Create New Link' />

      <Modal.Content>
        <Form size='large'>
            <Segment>
              <Form.Input label='Url'
                placeholder='Url e.g http://www.google.com'
                onChange={e => this.setState({ url: e.target.value })}
              />
              <Form.Field control={TextArea} label='Description' placeholder='A short description about the link..'
                onChange={e => this.setState({ description: e.target.value })}
              />
              <Button color='teal' fluid size='large' onClick={this.handleCreateLink}>
                Create Link
              </Button>
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
        </div>
        <List divided relaxed>
          {urlItems}
        </List>
      </Container>
      </div>
    )
  }

}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading;
