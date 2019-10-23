import React, { Component } from 'react'
import {connect} from 'react-redux'

class NewQuestion extends Component {

  render() {
    return(
      <div>
        Post a Poll
      </div>
    )
  }
}


function mapStateToProps({users, authentication}) {
  return {
      users,
      authenticated: authentication,
  }
}

export default connect(mapStateToProps)(NewQuestion)