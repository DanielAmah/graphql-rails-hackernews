import PropTypes from 'prop-types'
import React from 'react'
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

const ResponsiveContainer = (props, { children }) => (
  <div>
    <DesktopContainer handleLogout = {props.handleLogout}>{children}</DesktopContainer>
    <MobileContainer handleLogout = {props.handleLogout}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer;
