import React from 'react'
import { Row, Col, Button, Glyphicon, Navbar, Image } from 'react-bootstrap'
import FileReaderInput from 'react-file-reader-input'
import { connect } from 'react-redux'
import NewFile from './NewFile'
import Save from './Save'
import Download from './Download'

// Menu component
export class Menu extends React.Component {
  constructor (props) {
    super(props)

    this.handleChangeFile = this.handleChangeFile.bind(this)
    this.loadFile = this.loadFile.bind(this)
    this.newFile = this.newFile.bind(this)
  }

  handleChangeFile (event) {
    let file = event.target.files[0]
    console.log('File', file)

    if (file) {
      let data = new FormData()
      data.append('file', file)
      // axios.post('/files', data)...
      console.log('Data', file.value)
    }
  }
  // todo: error checking!!!!
  loadFile (e, results) {
    const [[progress, file]] = results
    console.log('Data:', progress)
    var data = JSON.parse(progress.target.result)

    this.setState({ vMap: results.length })

    this.props.dispatch({
      type: 'VENDORMAP_SET',
      fileName: file.name,
      data: data
    })
  }
  newFile () {
    console.log('Newfile')
    this.setState({ hidden: true })
  }

  // render
  render () {
    const { fileDetails, vendorMap } = this.props
    this.state = {
      hidden: vendorMap.length !== 0
    }
    return (
      <Navbar fixedTop>

        <Row>
          <Col md={2} className='file-menu'>
            <Image src='/company-logo/McAfee-smallLogo.png' />
          </Col>
          <Col md={2} className='file-menu'>
            <Col md={2} className='file-menu'>

              <NewFile />

            </Col>

            <Col md={2} className='file-menu'>
              <FileReaderInput
                as='text'
                id='my-file-input'
                onChange={this.loadFile}
              >
                <Button bsStyle='link'>
                  <Glyphicon glyph='glyphicon glyphicon-folder-open' />
                  <h5>Load</h5>
                </Button>
              </FileReaderInput>
            </Col>

            <Col md={2} className='file-menu'>
              {this.state.hidden && <Save />}
            </Col>

            <Col md={3} className='file-menu'>
              {this.state.hidden && <Download />}
            </Col>

            <Col md={3} className='file-menu' />

          </Col>
          <Col md={8} className='file-menu' />

        </Row>
      </Navbar>
    )
  }
}

// export the connected class
function mapStateToProps (state) {
  return {
    fileDetails: state.fileDetails || {},
    vendorMap: state.vendorMap || {}
  }
}

export default connect(mapStateToProps)(Menu)
