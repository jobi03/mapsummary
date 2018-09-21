import React from 'react'
import { connect } from 'react-redux'
import SolutionMapListRight from './SolutionMapListRight'
import SolutionMapListLeft from './SolutionMapListLeft'
import { Row, Col, Grid, Image } from 'react-bootstrap'

const SolutionMap = props => (
  <Row className='row-solutionMap'>
    <Col md={5} className='col-solutionMap'>
      {props.vendorMap.map(
        product =>
          (product.dir === 'left'
            ? <SolutionMapListLeft key={product.id} {...product} />
            : null)
      )}

    </Col>

    <Col md={2} className='col-solutionMap'>
      <Image src={'/company-logo/Sample.jpg'} className='company-bglogo' />
      {props.vendorMap.map((product, index) => (
        <div key={index}>{console.log('Company: ', product.Mcafee)}</div>
      ))
      // <Image
      //   key={product.key}
      //   src='/company-logo/McAfee.jpg'
      //   className='company-logo'
      // />
      }
    </Col>

    <Col md={5} className='col-solutionMap'>
      {props.vendorMap.map(
        product =>
          (product.dir === 'right'
            ? <SolutionMapListRight key={product.id} {...product} />
            : null)
      )}
    </Col>

  </Row>
)
const mapStateToProps = state => {
  return {
    vendorMap: state.vendorMap,
    fileDetails: state.fileDetails
  }
}

export default connect(mapStateToProps)(SolutionMap)
