import React, { Component } from 'react'
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from 'reactstrap'

import SolutionMapListRight from './SolutionMapListRight'
import SolutionMapListLeft from './SolutionMapListLeft'

class MapLayout extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col md={4}><SolutionMapListLeft /></Col>
          <Col md={4}><SolutionMapListRight /></Col>
        </Row>
      </Container>
    )
  }
}

export default MapLayout
