import React, { Component } from 'react'
import {
  Button,
  Glyphicon,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'

class NewFile extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.save = this.save.bind(this)

    this.state = {
      show: false,
      value: '',
      newcompany: ''
    }
  }
  handleChange (e) {
    this.setState({ newcompany: e.target.value })
  }
  handleClose () {
    this.setState({ show: false })
  }
  handleShow () {
    this.setState({ show: true })
    this.render(<NewFile />)
  }
  save () {
    console.log(this.state.newcompany)

    axios
      .get('/data/NewCompany.json')
      .then(
        function (response) {
          console.log(response.data)
          var data = response.data
          data = data.map(company => {
            console.log('Company name: ', company.name)
            company.name = this.state.newcompany
            console.log('New Company name: ', company.name)
            return company
          }, {})

          this.props.dispatch({
            type: 'VENDORMAP_SET',
            fileName: data[0].name + '.json',
            data: data
          })
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error)
      })
    this.setState({ show: false })
  }

  render () {
    return (
      <div>
        <Button bsStyle='link' onClick={this.handleShow}>
          <Glyphicon glyph='
 glyphicon glyphicon-file' />
          <h5>New</h5>
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <ModalHeader closeButton>
            <ModalTitle>New File</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form>
              <FormGroup>
                <ControlLabel>Enter Company Name</ControlLabel>
                <FormControl
                  name='company'
                  type='text'
                  placeholder='Enter text'
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </ModalBody>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle='primary' onClick={this.save}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    fileDetails: state.fileDetails || {},
    vendorMap: state.vendorMap || {}
  }
}

export default connect(mapStateToProps)(NewFile)
