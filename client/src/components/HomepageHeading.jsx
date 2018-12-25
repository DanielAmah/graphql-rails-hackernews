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
import Loader from './Loader'
import '../App.css'


const PER_PAGE = 7
class HomepageHeading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUrls: [],
      modalOpen: false,
      url: '',
      description: '',
      disabled: false,
      loading: false,
      offset: 0,
      limit: PER_PAGE,
      total: 0
    }
    this.handleCreateLink = this.handleCreateLink.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true,  disabled: false })

  handleClose = () => this.setState({ modalOpen: false,  disabled: true})

  componentDidMount() {
    this.showUrlListings();
  }

  async handleCreateLink() {
    this.setState({
      disabled: true,
      loading: true
    })
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
        this.setState({
          loading: false
        })
        this.handleClose();
        this.showUrlListings();
      }
    }catch(e){
      this.setState({
        disabled: false
      })
      toastr.error(e.message)
    }
  }

  async showUrlListings(){
    this.setState({
      loading: true
    })
    let showListings = `query {
      allLinks(first: ${this.state.limit}, skip: ${this.state.offset}) {
        id
        url
        description,
        postedBy {
          id
          email
        }
      }
      meta {
        count
      }
    }`
    const token = window.localStorage.getItem("token")
    const email = window.localStorage.getItem("email")
    try{
      const res = await axiosInstance.post("graphql", { query: showListings },{headers: {'X-User-Email': email, 'X-User-Token': token}})
      this.setState({
        allUrls: res.data.data.allLinks,
        total: res.data.data.meta.count,
        loading: false
      })
    }catch(e){
      toastr.error(e.message)
    }
  }

  handlePageClickPrev =() => {
    // Load prev 10 users
    let offset = this.state.offset - PER_PAGE
    if (offset < 0) return
    this.setState({offset: offset}, () => {
      this.showUrlListings();
    });
  };

  handlePageClickNext = () => {
    // Load next 10 users
    let offset = this.state.offset + PER_PAGE
    if (offset <= this.state.total){

     this.setState({offset: offset }, () => {
      this.showUrlListings();
    });
  }
  else {
    this.setState({
      disabled: true
      })
    }
  }
  render() {
    const {disabled, loading, allUrls } = this.state;
    const urlItems = allUrls.map(url =>
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
              <Button color='teal' fluid size='large' onClick={this.handleCreateLink} disabled={disabled}>
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
        {
          loading && (<Loader />)
        }
        <List divided relaxed>
          {urlItems}
        </List>
        <button onClick={this.handlePageClickPrev}>Prev</button>
        <button onClick={this.handlePageClickNext}>Next</button>
      </Container>
      </div>
    )
  }

}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading;
