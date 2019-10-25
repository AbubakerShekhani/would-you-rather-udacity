import React, {Component, Fragment } from 'react'
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
import Navbar from './Navbar'
import LoadingBar from 'react-redux-loading'

class App extends Component {

  handleLogout = () => {


    this.props.dispatch(logoutUser())


  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <Fragment>
            <LoadingBar />
            <Navbar />
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
        </Fragment>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps({authentication}) {
  return {
      authenticated: authentication,
      loading: authentication === null
  }
}

export default connect(mapStateToProps)(App);
