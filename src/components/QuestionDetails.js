import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'

class QuestionDetails extends Component {

  constructor(props) {
    super(props)
    this.state = { selectedAnswer: null }
  }


  componentDidMount() {

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

  }

  render() {

    const { question, users, answered, totalVotes, authenticated } = this.props

    console.log(totalVotes)

    return (
            <div>
              { (!answered) ?
                <form onSubmit={this.handleFormSubmit}>
                <div className="ui card">
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
                    <button type="submit">
                      Vote
                    </button>
                  </div>
                </div>
              </form>
              :
              /* UnAnwswered */
              <div className="ui card">
                <div className="content">
                  <div className="right floated meta">14h</div>
                  <img className="ui avatar image" src={users[question.author].avatarURL} alt={question.author} /> {question.author} asks
                </div>
                <div className="image">
                  <img />
                </div>
                <div className="content">
                    <a className="header">Poll Results</a>
                    <div className="meta">
                    </div>
                    <div className="description">
                      <div>Option 1: {question.optionOne.text} -
                        Votes: {question.optionOne.votes.length}
                      </div>
                        { (question.optionOne.votes.includes(authenticated)) ? (<div>*You Voted*</div>) : '' }
                      <div>Option 2: {question.optionTwo.text} -
                        Votes: {question.optionTwo.votes.length}
                        { (question.optionTwo.votes.includes(authenticated)) ? (<div>*You Voted*</div>) : '' }
                      </div>
                    </div>
                  </div>
              </div>
              }
            </div>
          );
  }
}

function mapStateToProps({users, authentication, questions}, ownProps) {

  const question = questions[ownProps.match.params.id]
  const answered = (question.optionOne.votes.includes(authentication)
                  || question.optionTwo.votes.includes(authentication)) ? true : false
  const totalVotes    =  question.optionOne.votes.length + question.optionTwo.votes.length

  return {
      users,
      authenticated: authentication,
      questions,
      question,
      answered,
      totalVotes
  }
}

export default connect(mapStateToProps)(QuestionDetails)