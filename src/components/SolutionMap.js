import React from 'react'
import { connect } from 'react-redux'
import SolutionMapListRight from './SolutionMapListRight'
import SolutionMapListLeft from './SolutionMapListLeft'
import { Row, Col, Image } from 'react-bootstrap'
import axios from 'axios'
import ImageResize from 'react-image-resizer'

class SolutionMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasImage: false,
      status: 'pause',
      extension: ['.jpg', '.png'],
      value: ''
    }
  }
  allowDrop (ev) {
    ev.preventDefault()
  }
  drop (event) {
    event.preventDefault()
    console.log('value:', event.dataTransfer.getData('text/plain'))
    if (
      !event.dataTransfer.getData('text/plain').includes('http')
    ) {
      const data = event.dataTransfer.getData('text/plain')
      var obj = JSON.parse(data)
      const { payload } = obj
      console.log('obj.target', obj.payload.target)
      if (obj.payload.target === 'Remove') {
        this.props.dispatch({
          type: 'VENDORMAP_UPDATE',
          payload: payload
        })
        console.log('update')
      } else {
        this.props.dispatch({
          type: 'VENDORMAP_UPDATEALL',
          payload: payload
        })
        console.log('updateAll')
      }
    }
  }

  componentWillMount () {
    console.log('---componentWillMount---')
    this.companyLogoFinder()
  }
  companyLogoFinder () {
    var companyName, result = ''
    var _companyName = 'notFound'
    let found = false
    var companyArray = []
    this.props.vendorMap.map(cmp => (companyName = cmp.name))
    this.state.extension.map(ex => {
      companyArray.push(companyName.toLowerCase() + ex)
    })
    this.handleImage().then(element => {
      element.some(r => {
        if (companyArray.includes(r.toLowerCase())) {
          _companyName = r.toLowerCase()
          found = true
        }
      })
      _companyName !== 'notFound'
        ? (result = _companyName)
        : (result = this.props.vendorMap[0].name)
      console.log('result:', result)
      return this.setState({
        hasImage: found,
        value: result,
        status: this.props.vendorMap[0].name
      })
    })
  }
  handleImage () {
    return axios
      .get('/company-logo')
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  componentWillReceiveProps (nextProps) {
    console.log('---componentWillReceiveProps---')
  }

  shouldComponentUpdate (nextProps, nextState) {
    let shouldUpdate = nextState.status === nextState.status
    console.log('shouldComponentUpdate? ', shouldUpdate)
    return shouldUpdate
  }

  componentDidUpdate (nextProps, nextState) {
    console.log('---componentDidUpdate---')

    if (nextState.status !== nextProps.vendorMap[0].name) {
      this.companyLogoFinder()
      this.setState({
        status: nextProps.vendorMap[0].name
      })
      console.log('value? ', this.state.value)
    }
  }

  render () {
    return (
      <Row className='row-solutionMap'>
        <Col md={5} className='col-solutionMap'>
          {this.props.vendorMap.map((company, index) => (
            <div key={index}>
              {company.categories.map(
                (category, index) =>
                  (category.dir === 'left'
                    ? <SolutionMapListLeft key={index} {...category} />
                    : null)
              )}
            </div>
          ))}
        </Col>

        <Col
          md={2}
          className='col-solutionMap'
          onDragOver={this.allowDrop.bind(this)}
          onDrop={e => this.drop(e)}
        >

          <Row className='row-middle'>

            <Image
              src={'/company-logo/Sample.jpg'}
              className='company-bglogo'
              responsive
            />
            {console.log('---Render---')}
            {console.log('comp name: ', this.props.vendorMap[0].name)}
            {console.log('state: ', this.state)}
            {!this.state.hasImage
              ? <h2>{this.props.vendorMap[0].name}</h2>
              : <div className='company-logo'>
                <ImageResize
                  href='#'
                  src={'/company-logo/' + this.state.value}
                  width={200}
                  height={50}
                  />
              </div>}
            )}

          </Row>

        </Col>

        <Col md={5} className='col-solutionMap'>
          {this.props.vendorMap.map((company, index) => (
            <div key={index}>
              {company.categories.map(
                (category, index) =>
                  (category.dir === 'right'
                    ? <SolutionMapListRight key={index} {...category} />
                    : null)
              )}
            </div>
          ))}
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => {
  return {
    vendorMap: state.vendorMap
  }
}

export default connect(mapStateToProps)(SolutionMap)
