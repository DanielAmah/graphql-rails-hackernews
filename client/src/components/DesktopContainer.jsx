import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import { isAuthenticated } from "../helpers/authentication";
import { jsonwebtoken } from "../helpers/jsonwebtoken";

import HomepageHeading from "./HomepageHeading";

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, handleLogout } = this.props;
    const { fixed } = this.state;
    const loggedInUser = jsonwebtoken();
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item position="right">
                  {!isAuthenticated() ? (
                    <span>
                      <Button as="a">Log in</Button>
                      <Button
                        as="a"
                        primary={fixed}
                        style={{ marginLeft: "0.5em" }}
                      >
                        Sign Up
                      </Button>
                    </span>
                  ) : (
                    <span>
                      <span>
                        {`Welcome back! ${
                          loggedInUser !== undefined ? loggedInUser : ""
                        } `}
                      </span>
                      <Button as="a" onClick={handleLogout}>
                        Logout
                      </Button>
                    </span>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.defaultProps = {
  children: []
};

DesktopContainer.propTypes = {
  children: PropTypes.node
};

export default DesktopContainer;
