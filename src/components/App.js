import React, {Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import Dashboard from './Dashboard'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import { logoutUser } from '../actions/authentication'
import { handleGetQuestions } from '../actions/questions'
import ErrorPage from './ErrorPage'

class App extends Component {

  handleLogout = () => {

    this.props.dispatch(logoutUser())


  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <div className='ui container'>
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
          </div>

          { this.props.authenticated ?
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/questions/:id" exact component={QuestionDetails} />
            <Route path="/add" exact component={NewQuestion} />
            <Route path="/leaderboard" exact component={Leaderboard} />
            <Route path="/login" exact component={Login} />
            <Route component={ErrorPage} />
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
