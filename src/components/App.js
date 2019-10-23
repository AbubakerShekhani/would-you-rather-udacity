import React, {Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import Dashboard from './Dashboard'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'

class App extends Component {

  render() {

    return (
      <div className='ui container'>

          <BrowserRouter>
            { this.props.authenticated ?
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/questions/:id" exact component={QuestionDetails} />
              <Route path="/add" exact component={NewQuestion} />
            </Switch>
            :
            <Login />
            }
          </BrowserRouter>

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
