import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer, handleGetQuestions } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { handleReceiveUsers } from '../actions/users'
import PollResult from './PollResult'

class QuestionDetails extends Component {

  constructor(props) {
    super(props)
    this.state = { selectedAnswer: null }
    this.props.dispatch(handleGetQuestions())
    this.props.dispatch(handleReceiveUsers())
  }


  componentDidMount() {
    this.props.dispatch(handleGetQuestions())
    this.props.dispatch(handleReceiveUsers())
  }

  handleOptionChange = changeEvent => {

    this.setState({
      selectedAnswer: changeEvent.target.value
    });


  };

  handleFormSubmit = event => {
    event.preventDefault()
    console.log(this.state.selectedAnswer)
    const userAnswer = {
            authedUser: this.props.authenticated,
            qid: this.props.question.id,
            answer: this.state.selectedAnswer }

    this.props.dispatch(handleSaveQuestionAnswer(userAnswer))

    console.log("hls")

  }

  render() {

    const { question, users, answered, authenticated } = this.props

    if (!authenticated) {
      return  <Redirect to="/" />
    }

    if (question === null) {
      return <Redirect to="/ErrorPage" />
    }

    return (
            <div className="ui centered grid">
              <div className="eight wide column">
              { (!answered) ?
                <form onSubmit={this.handleFormSubmit}>
                <div className="ui centered card">
                  <div className="content">
                    <div className="right floated meta"></div>
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

                      <div className="form-check">
                        <label>
                          <input
                            type="radio"
                            name="question-answer"
                            value="optionOne"

                            className="form-check-input"
                            onChange={this.handleOptionChange}
                          />
                          {question.optionOne.text}
                        </label>
                      </div>

                      <div className="form-check">
                        <label>
                          <input
                            type="radio"
                            name="question-answer"
                            value="optionTwo"
                            className="form-check-input"
                            onChange={this.handleOptionChange}
                          />
                          {question.optionTwo.text}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="extra content right aligned">
                  <button className="positive ui button" type="submit">Vote</button>
                  </div>
                </div>
              </form>
              :
                <PollResult question={question} />
              }
              </div>
            </div>
          );
  }
}

function mapStateToProps({users, authentication, questions}, ownProps) {

  const question = questions[ownProps.match.params.id]

  if (!question) {
    return {
      users,
      authenticated: authentication,
      questions,
      question: null,
      answered: null,
    }
  }


  const answered = (question.optionOne.votes.includes(authentication)
                  || question.optionTwo.votes.includes(authentication)) ? true : false


  return {
      users,
      authenticated: authentication,
      questions,
      question,
      answered,
  }
}

export default connect(mapStateToProps)(QuestionDetails)