import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Thumbnail } from 'react-bootstrap'
import { filteredSortedVendors } from '../../selectors'
import Image from 'react-image-resizer'

// Component
export class MatchingLogos extends React.Component {
  // render

  onDragStart (e, v) {
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('text/plain', v)
  }

  render () {
    const { vendors, search } = this.props
    let allvendors = Object.values(vendors)
    let filtered = Object.values(vendors)
      .filter(vendor => vendor.company.toLowerCase().indexOf(search.term) > -1)
      .sort((a, b) => a.company.localeCompare(b.company))
    return (
      <Col xs={12} className='vendorList'>

        {filtered.length === 0
          ? allvendors.slice(0, 15).map(v => (
            <ul key={v.company}>
              <li
                key={v.company}
                draggable='true'
                onDragStart={e => this.onDragStart(e, v.company)}
                className='vendor-logo'
                >
                <Image
                  src={'/vendors/' + v.logo}
                  href='#'
                  width={135}
                  height={38}
                  />
              </li>
            </ul>
            ))
          : filtered.slice(0, 15).map(vendor => (
            <ul key={vendor.company}>
              <li
                key={vendor.company}
                draggable='true'
                onDragStart={e => this.onDragStart(e, vendor.company)}
                className='vendor-logo'
                >
                <Image
                  src={'/vendors/' + vendor.logo}
                  href='#'
                  width={135}
                  height={38}
                  />
              </li>
            </ul>
            ))}
      </Col>
    )
  }
}

// export the connected class
function mapStateToProps (state) {
  return {
    vendors: state.vendors || {},
    search: state.search || {}
  }
}

export default connect(mapStateToProps)(MatchingLogos)
