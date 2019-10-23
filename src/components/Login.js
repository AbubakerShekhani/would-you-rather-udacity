import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleReceiveUsers } from '../actions/users'
import { loginUser } from '../actions/authentication'
import { handleGetQuestions } from '../actions/questions'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { user: ''}
    }


    componentDidMount() {


        this.props.dispatch(handleReceiveUsers())
    }


    onSelectUserForLogin = (event) => {

        this.setState({
           user: event.target.value
        })


    }

    onFormSubmit = (event) => {
        event.preventDefault();


        const userId = this.state.user
        this.props.dispatch(loginUser(userId))
        this.props.dispatch(handleGetQuestions())


    }

    render() {

        const authedUser = this.props.authenticated

        if (authedUser) {
           return  <Redirect to="/" />
        }

        const { users, questions } = this.props;

        console.log(questions)



        return (

            <div className="ui container">
                <div className="ui grid center aligned">
                    <div className="ui row center aligned">
                        <div className="wide column">
                            <h1>
                                Welcome to the "Would You Rather App"
                            </h1>
                        </div>
                    </div>
                </div>

                {

                    <div className="ui grid center aligned ">
                        <div className="ui center aligned row">
                            <div className="eleven wide column">
                                <div className="search-bar ui segment">

                                    <p>
                                        Please sign in to continue
                                    </p>
                                    <form onSubmit={this.onFormSubmit.bind(this)}>
                                    <select onChange={this.onSelectUserForLogin}>
                                        <option value="" key="0">Select</option>
                                        {
                                            Object.values(users).map((user) =>
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            )
                                        }
                                    </select>
                                    <button type="submit" disabled={!this.state.user}>Submit</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

function mapStateToProps({users, authentication, questions}) {
    return {
        users,
        authenticated: authentication,
        questions
    }
}

export default connect(mapStateToProps)(Login)