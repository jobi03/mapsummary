import React from "react";
import { Nav, NavItem, Glyphicon, Navbar } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

// Menu component
export default class Footer extends React.Component {
  // render
  render() {
    return (
      <Navbar fixedBottom>
        <Nav>
          <NavItem>
            McAfee Component Graph Tool
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
