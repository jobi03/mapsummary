import React, { Component } from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import fileDownload from 'js-file-download'

class Save extends Component {
  constructor (props) {
    super(props)
    this.save = this.save.bind(this)
  }

  save () {
    const { fileDetails, vendorMap } = this.props

    fileDownload(JSON.stringify(vendorMap, null, 2), fileDetails.name)
    // RNFetchBlob.fs.writeStream('/public/data', 'JSONStream').then(stream => {
    //   stream.write(RNFetchBlob.JSONStream.encode('foo'))
    //   return stream.close()
    // })

    console.log('Saved')
  }
  render () {
    return (
      <div>
        <Button
          bsStyle='link'
          disabled={!this.props.vendorMap.length > 0}
          onClick={this.save}
        >
          <Glyphicon glyph='glyphicon glyphicon-floppy-disk' />
          <h5>Save</h5>
        </Button>
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

export default connect(mapStateToProps)(Save)
