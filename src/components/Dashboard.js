import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { handleReceiveUsers } from '../actions/users'
import QuestionList from './QuestionList';


class Dashboard extends Component {

    render() {
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
                <div className="ui grid centered">
                    <div className="ui row">
                        <div className="eight wide column">
                            <QuestionList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({users, authentication, questions}) {
    return {
        users,
        authenticated: authentication,
        questions,
        unAnsweredQuestions: Object.values(questions).filter(q =>
            !users[authentication].answers.hasOwnProperty(q.id)).sort((a,b) => b.timestamp - a.timestamp),
        answeredQuestions: Object.values(questions).filter(q =>
            users[authentication].answers.hasOwnProperty(q.id)).sort((a,b) => b.timestamp - a.timestamp),

    }
}

export default connect(mapStateToProps)(Dashboard)