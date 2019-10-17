import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { handleReceiveUsers } from '../actions/users'


class Dashboard extends Component {


    componentDidMount() {
        //this.props.dispatch(handleReceiveUsers())


    }

    render() {

        const questions = this.props.questions

        const { answeredQuestions, unAnsweredQuestions } = this.props

        console.log(unAnsweredQuestions)
        console.log(answeredQuestions)

        return (
            <div class="container">
                <h2>Display list of questions</h2>
                    <h3>UnAnswered Questions</h3>
                    { unAnsweredQuestions.map((question) =>

                        <div class="row">
                            <div>
                                <div>{question.author} asks:</div>
                                <div><h3>Would you rather</h3></div>
                                <div></div>
                                <div>{question.optionOne.text} - Votes: {question.optionOne.votes.length}</div>
                                <div>{question.optionTwo.text} - Votes: {question.optionTwo.votes.length}</div>
                                <div>Dated: {question.timestamp}</div>

                            </div>
                            <hr />
                        </div>

                        ) }

                    <h3>Answered Questions</h3>
                    { answeredQuestions.map((question) =>

                        <div class="row">
                            <div>
                                <div>{question.author} asks: On<span>{question.timestamp}</span></div>
                                <div><h3>Would you rather</h3></div>
                                <div></div>
                                <div>{question.optionOne.text} - Votes: {question.optionOne.votes.length}</div>
                                <div>{question.optionTwo.text} - Votes: {question.optionTwo.votes.length}</div>
                                <div>Dated: {question.timestamp}</div>

                            </div>
                            <hr />
                        </div>

                        ) }

                    {/* {
                        Object.values(questions).map((question) =>
                            (
                                <li key={question.id}> {question.id}
                                    <ul>
                                        <li>{question.author}</li>
                                        <li>{question.timestamp}</li>
                                        <li>
                                            { Object.values(question.optionOne).map((op) =>
                                                 ( op.text )
                                                )}
                                        </li>
                                        <li>
                                            { Object.values(question.optionTwo).map((op) => op.text)}
                                        </li>
                                    </ul>
                                </li>
                            )
                        )
                    } */}


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