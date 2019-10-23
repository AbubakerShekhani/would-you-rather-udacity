import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './App.css'

class QuestionList extends Component {

  render() {

    const authedUser = this.props.authenticated
    const { answeredQuestions, unAnsweredQuestions, users } = this.props

    return (
              <div className="ui container centered">
                    <h2>Questions</h2>
                    <h3>UnAnswered Questions</h3>
                    { unAnsweredQuestions.map((question) =>
                        /*
                        <div class="row">
                            <div>
                                <div>{question.author} asks:</div>
                                <div><h4>Would you rather</h4></div>
                                <div></div>
                                <div>Option 1: {question.optionOne.text} - Votes: {question.optionOne.votes.length}</div>
                                <div>Option 2: {question.optionTwo.text} - Votes: {question.optionTwo.votes.length}</div>
                                <div>Dated: {question.timestamp}</div>
                                <div><button>View</button></div>
                            </div>
                            <hr />
                        </div>
                        */

                       <div className="ui card" key={question.id}>
                        <div className="content">
                          <div className="right floated meta">14h</div>
                          <img className="ui avatar image" src={users[question.author].avatarURL} alt={question.author}  /> {question.author} asks
                        </div>
                        <div className="image">
                          <img />
                        </div>
                        <div className="content">
                          <a className="header">Would You Rather?</a>
                          <div className="meta">
                          </div>
                          <div className="description">
                            <div>Option 1: {question.optionOne.text} - Votes: {question.optionOne.votes.length}</div>
                            <div>Option 2: {question.optionTwo.text} - Votes: {question.optionTwo.votes.length}</div>
                          </div>
                        </div>
                        <div className="extra content right aligned">
                          <Link to={`/questions/${question.id}`}>
                            View Poll
                          </Link>
                        </div>
                       </div>
                        ) }

                    <h3>Answered Questions</h3>
                    { answeredQuestions.map((question) =>

                        <div className="ui card" key={question.id}>
                        <div className="content">
                          <div className="right floated meta">14h</div>
                          <img className="ui avatar image" src={users[question.author].avatarURL} alt={question.author} /> {question.author} asks
                        </div>
                        <div className="image">
                          <img />
                        </div>
                        <div className="content">
                          <a className="header">Would You Rather?</a>
                          <div className="meta">
                          </div>
                          <div className="description">
                            <div>Option 1: {question.optionOne.text} - Votes: {question.optionOne.votes.length}</div>
                            <div>Option 2: {question.optionTwo.text} - Votes: {question.optionTwo.votes.length}</div>
                          </div>
                        </div>
                        <div className="extra content right aligned">
                          <Link to={`/questions/${question.id}`}>
                            View Poll
                          </Link>
                        </div>
                       </div>
                     ) }
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

export default connect(mapStateToProps)(QuestionList)