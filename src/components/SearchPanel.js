import React from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col,
  Panel,
  Form,
  FormGroup,
  FormControl,
  Glyphicon
} from 'react-bootstrap'
import MatchingLogos from './common/MatchingLogos'

// Home page component
export class SearchPanel extends React.Component {
  // render

  onChange (e) {
    console.log(e.target.value)

    this.props.dispatch({
      type: 'SEARCH_UPDATE',
      params: {
        term: e.target.value.trim().toLowerCase()
      }
    })
  }

  render () {
    return (
      <Col xs={12}>
        <Row>
          <FormGroup>
            <FormControl type='text' onChange={e => this.onChange(e)} />
            <FormControl.Feedback>
              <Glyphicon glyph='search' />
            </FormControl.Feedback>
          </FormGroup>
        </Row>

        <Row>
          <MatchingLogos />
        </Row>
      </Col>
    )
  }
}

export default connect()(SearchPanel)
