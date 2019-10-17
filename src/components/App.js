import React, {Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import Dashboard from './Dashboard'


class App extends Component {

  render() {

    return (
      <div className='container'>
        {
          this.props.authenticated ?
          <Dashboard /> :
          <Login />
        }
      </div>
    )
  }
}

function mapStateToProps({authentication}) {
  return {
      authenticated: authentication,
  }
}

export default connect(mapStateToProps)(App);
