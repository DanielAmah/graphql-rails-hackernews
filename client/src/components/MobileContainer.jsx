/* eslint-disable */
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";
import { isAuthenticated } from "../helpers/authentication";
import { jsonwebtoken } from "../helpers/jsonwebtoken";

import HomepageHeading from "./HomepageHeading";

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, handleLogout } = this.props;
    const { sidebarOpened } = this.state;
    const loggedInUser = jsonwebtoken();

    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          {!isAuthenticated() ? (
            <span>
              <Menu.Item as="a">Log in</Menu.Item>
              <Menu.Item as="a">Sign Up</Menu.Item>
            </span>
          ) : (
            <span>
              <span>
                {`Welcome back! ${
                  loggedInUser !== undefined ? loggedInUser : ""
                } `}
              </span>
              <Menu.Item as="a" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </span>
          )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  {!isAuthenticated() ? (
                    <span>
                      <Button as="a">Log in</Button>
                      <Button as="a" style={{ marginLeft: "0.5em" }}>
                        Sign Up
                      </Button>
                    </span>
                  ) : (
                    <Button as="a" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}
MobileContainer.defaultProps = {
  children: []
};

MobileContainer.propTypes = {
  children: PropTypes.node
};

export default MobileContainer;
