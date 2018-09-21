import React from 'react'
import { Image, Row, Col, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import ImageResize from 'react-image-resizer'

class SolutionMapListLeft extends React.Component {
  onDragStart (e, id, productName, vendorName) {
    var data = {
      payload: {
        id: id,
        target: 'Remove',
        params: {
          productName: productName,
          vendorName: 'NA',
          vendorNameOld: vendorName
        }
      }
    }
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify(data))
  }
  onDragStartToRemove (e, id, productName, vendorName) {
    var data = {
      payload: {
        id: id,
        target: 'RemoveAll',
        params: {
          productName: productName,
          vendorName: 'NA',
          vendorNameOld: vendorName
        }
      }
    }
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify(data))
  }
  allowDrop (ev) {
    ev.preventDefault()
  }
  drop (event, id, vendorNameOld, productName, pid) {
    event.preventDefault()
    var data = event.dataTransfer.getData('Text')
    if (data.includes('payload')) {
      var obj = JSON.parse(data)
      const { params } = obj.payload
      data = params.vendorNameOld
    }
    this.props.dispatch({
      type: 'VENDORMAP_UPDATE',
      payload: {
        id: id,
        target: 'Remove',
        vendorNameOld: vendorNameOld,
        params: {
          productName: productName,
          vendorName: data
        }
      }
    })
  }
  updateAll (event, id, vendorNameOld, productName, pid) {
    event.preventDefault()
    var data = event.dataTransfer.getData('Text')
    this.props.dispatch({
      type: 'VENDORMAP_UPDATEALL',
      payload: {
        id: id,
        target: 'RemoveAll',
        vendorNameOld: vendorNameOld,
        params: {
          productName: productName,
          vendorName: event.dataTransfer.getData('Text')
        }
      }
    })
  }
  render () {
    return (
      <Panel>
        <Row className='row-cat'>
          <Col xs={4} className='solutionMapList__col-category'>
            <Image
              key={this.props.id}
              draggable='true'
              onDragOver={this.allowDrop.bind(this)}
              onDrop={e =>
                this.updateAll(
                  e,
                  this.props.id,
                  this.props.product.vendorName,
                  this.props.product.productName,
                  this.props.product.id
                )}
              onDragStart={e =>
                this.onDragStartToRemove(
                  e,
                  this.props.id,
                  this.props.product.productName,
                  this.props.product.vendorName
                )}
              src={'/images/' + this.props.icon}
              className='cat-logo'
            />
            <div
              onDragOver={this.allowDrop.bind(this)}
              onDrop={this.drop.bind(this)}
            />
            <h4 className='cat-title'>{this.props.title}</h4>
          </Col>
          <Col xs={8} className='solutionMapList__col-left'>
            {this.props.product &&
              this.props.product.map((pro) => ( // <div key={pro.productName}>
                <Row className='row-cat' key={pro.productName + pro.vendorName}>
                  <Col xs={8} className='prod'>
                    <h4>{pro.productName}</h4>
                  </Col>
                  <Col
                    xs={4}
                    className='logo'
                    onDragOver={this.allowDrop.bind(this)}
                    onDrop={e =>
                      this.drop(
                        e,
                        this.props.id,
                        pro.vendorName,
                        pro.productName,
                        pro.id
                      )}
                  >
                    {pro.vendorName === 'NA'
                      ? <div
                        onDragStart={e =>
                            this.onDragStart(
                              e,
                              this.props.id,
                              pro.productName,
                              pro.vendorName
                            )}
                        onDragOver={this.allowDrop.bind(this)}
                        onDrop={e =>
                            this.drop(
                              e,
                              this.props.id,
                              pro.vendorName,
                              pro.productName,
                              pro.id
                            )}
                        >
                        <ImageResize
                          href='#'
                          src='/images/NA.JPG'
                          width={140}
                          height={35}
                          />
                      </div>
                      : <div
                        draggable='true'
                        onDragStart={e =>
                            this.onDragStart(
                              e,
                              this.props.id,
                              pro.productName,
                              pro.vendorName
                            )}
                        className='vendor-logo'
                        onDragOver={this.allowDrop.bind(this)}
                        onDrop={e =>
                            this.drop(
                              e,
                              this.props.id,
                              pro.vendorName,
                              pro.productName,
                              pro.id
                            )}
                        >
                        <ImageResize
                          href='#'
                          src={'/vendors/' + pro.vendorName + '.jpg'}
                          width={135}
                          height={32}
                          />
                      </div>}
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>
      </Panel>
    )
  }
}

function mapStateToProps (state) {
  return {
    vendorMap: state.vendorMap
  }
}

export default connect(mapStateToProps)(SolutionMapListLeft)
