import React, { Component } from 'react'
import { connect } from 'react-redux'
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

        if (this.props.authenticated) {
            console.log('Logged In. Redirect to Dashboard')
        }

        const { users, questions } = this.props;


        const authedUser = this.props.authenticated

        console.log(questions)



        return (

            <div className="container">
                <p>
                    Welcome to the "Would You Rather App"
                </p>

                {
                (authedUser) ? <div>Signed in as {authedUser} .

                </div>
                :
                    <div>
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