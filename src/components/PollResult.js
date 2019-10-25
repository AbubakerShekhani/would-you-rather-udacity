import React, { Component } from "react";
import { connect } from "react-redux";

class PollResult extends Component {
  render() {

    const { question, users, totalVotes, authenticated } = this.props

    return (
      <div>
        <div className="ui centered card">
          <div className="content">
            <div className="right floated meta"></div>
            <img
              className="ui avatar image"
              src={users[question.author].avatarURL}
              alt={question.author}
            />{" "}
            {question.author} asks
          </div>
          <div className="image">
            <img />
          </div>
          <div className="content">
            <a className="header">Poll Results</a>
            <div className="meta"></div>
            <div className="description">
              <div>
                <strong>Option 1:</strong> {question.optionOne.text}{" "}
                {question.optionOne.votes.includes(authenticated) ? (
                  <i class="yellow star icon"></i>
                ) : (
                  ""
                )}
              </div>
              <div>
                <strong>Votes</strong>: {question.optionOne.votes.length} /{" "}
                {totalVotes} :{" "}
                {Math.round(
                  (question.optionOne.votes.length / totalVotes) * 100
                )}
                %
              </div>

              <div>
                <strong>Option 2:</strong> {question.optionTwo.text}{" "}
                {question.optionTwo.votes.includes(authenticated) ? (
                  <i class="yellow star icon"></i>
                ) : (
                  ""
                )}{" "}
              </div>
              <div>
                <strong>Votes</strong>: {question.optionTwo.votes.length} /{" "}
                {totalVotes} :{" "}
                {Math.round(
                  (question.optionTwo.votes.length / totalVotes) * 100
                )}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authentication, questions }, ownProps) {

  const question = ownProps.question
  const totalVotes    =  question.optionOne.votes.length + question.optionTwo.votes.length

  return {
      users,
      authenticated: authentication,
      questions,
      question,
      totalVotes
  }
}
export default connect(mapStateToProps)(PollResult);
