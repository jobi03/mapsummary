import React from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'
import Menu from './common/Menu'
import Footer from './common/Footer'
// import "../stylesheets/main.scss";
import '../styles/styles.scss'
import axios from 'axios'

// app component
export class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { navHeight: 100 }
    // this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount () {
    // the first time we load the app, we need that users list
    // this.props.dispatch({type: 'VENDORS_LOAD'});
    axios
      .get('/vendors')
      .then(
        function (response) {
          console.log(response.data)
          // save the users in state
          var vendors = response.data.reduce((memo, filename) => {
            var companyName =
              filename.substr(0, filename.lastIndexOf('.')) || filename
            memo[companyName] = { company: companyName, logo: filename }
            return memo
          }, {})
          this.props.dispatch({
            type: 'VENDORS_SAVE',
            vendors: vendors
          })
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error)
      })
  }

  // render
  render () {
    // show the loading state while we wait for the app to load
    const { vendors, children } = this.props
    if (!Object.keys(vendors).length) {
      return <ProgressBar active now={100} />
    }

    // render
    return (
      <div
        style={{
          paddingTop: this.state.navHeight,
          paddingLeft: 50,
          paddingRight: 50
        }}
      >
        <Menu ref={e => (this._menu = e)} />
        {children}
        <Footer />
      </div>
    )
  }
}

// export the connected class
function mapStateToProps (state) {
  return {
    vendors: state.vendors || {}
  }
}

export default connect(mapStateToProps)(App)
