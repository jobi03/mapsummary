import React from 'react'
import {
  Nav,
  NavItem,
  Glyphicon,
  Navbar,
  NavDropdown,
  MenuItem,
  FieldGroup,
  NavItemLink
} from 'react-bootstrap'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import FileReaderInput from 'react-file-reader-input'
import fileDownload from 'js-file-download'
import { connect } from 'react-redux'

// Menu component
export class Menu extends React.Component {
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

    this.props.dispatch({
      type: 'VENDORMAP_SET',
      fileName: file.name,
      data: data
    })
  }

  saveAs () {
    const { fileDetails, vendorMap } = this.props
    fileDownload(JSON.stringify(vendorMap, null, 2), fileDetails.name)
  }

  // render
  render () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#home'>McAfee</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItemLink onClick={this.loadFile.bind(this)}>

            Load
          </NavItemLink>

        </Nav>
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
