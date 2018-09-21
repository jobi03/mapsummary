import React from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import SearchPanel from './SearchPanel'
import SolutionMap from './SolutionMap'

const Home = props => (
  <Grid>
    {props.vendorMap.length > 0
      ? <Row>
        <Col md={10} id='capture' className='solutionMapList'>
          <Row>
            <SolutionMap />
          </Row>
        </Col>
        <Col md={2} className='searchPanel'>
          <SearchPanel />
        </Col>
      </Row>
      : <Row className='box-layout__center-box'>
        <Image src={'/company-logo/McAfee-largLogo.png'} />
      </Row>}
  </Grid>
)
const mapStateToProps = state => {
  return {
    vendorMap: state.vendorMap
  }
}

export default connect(mapStateToProps)(Home)
