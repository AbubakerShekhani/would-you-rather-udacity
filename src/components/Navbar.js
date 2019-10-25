import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/authentication'

class Navbar extends Component {

  handleLogout = () => {

    this.props.dispatch(logoutUser())


  }

  render() {
    return (<div className='ui container'>
    <div className="ui inverted menu">
      <div className="ui container">
        <Link to="/" className="item">Home</Link>
        <Link to="/add" className="item">New Question</Link>
        <Link to="/leaderboard" className="item">Leaderboard</Link>
      </div>
      { this.props.authenticated
        &&
        <div className="right menu">
          <a className="ui item">
            {this.props.authenticated}
          </a>
          <a className="ui item" onClick={this.handleLogout} >Logout</a>
        </div> }
    </div>
  </div>)
  }

}


function mapStateToProps({authentication}) {
  return {
      authenticated: authentication,
  }
}

export default connect(mapStateToProps)(Navbar)