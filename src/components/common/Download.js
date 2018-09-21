import React, { Component } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import html2canvas from 'html2canvas'

class Download extends Component {
  constructor (props) {
    super(props)
    this.download = this.download.bind(this)
    this.state = {
      anchorElement: '',
      imgFileName: '',
      imgLink: ''
    }
  }

  download () {
    const { fileDetails, vendorMap } = this.props
    html2canvas(document.querySelector('#capture')).then(canvas => {
      document.body.appendChild(canvas), this.setState({
        imgLink: canvas.toDataURL('image/png')
      }), console.log('image filename: ', vendorMap[0].name)
      this.setState({ imgFileName: vendorMap[0].name + '.png' })
      this.anchorElement.click()
    })
  }

  render () {
    return (
      <div>
        <Button
          bsStyle='link'
          disabled={!this.props.vendorMap.length > 0}
          onClick={this.download}
        >
          <Glyphicon glyph='glyphicon glyphicon-floppy-disk' />
          <h5>Download</h5>
        </Button>
        <a
          id='blank'
          ref={el => {
            if (el) {
              this.anchorElement = el
            }
          }}
          href={this.state.imgLink}
          download={this.state.imgFileName}
        />
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

export default connect(mapStateToProps)(Download)
