import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";
import QuestionItem from "./QuestionItem";

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = { uaq: true, aq: false };
  }

  handleMenuChange = option => {
    if (option === "UAQ") {
      this.setState({ uaq: true, aq: false });
    } else {
      this.setState({ uaq: false, aq: true });
    }
  };

  render() {
    const authedUser = this.props.authenticated;
    const { answeredQuestions, unAnsweredQuestions, users } = this.props;

    return (
      <div>
        <div className="ui compact menu">
          <a className="item" onClick={event => this.handleMenuChange("UAQ")}>
            UnAnswered Questions
          </a>
          <a className="item" onClick={event => this.handleMenuChange("AQ")}>
            Answered Questions
          </a>
        </div>

        <div className="ui container centered">
          <h2>Questions</h2>
          {this.state.uaq && (
            <div>
              <h3>UnAnswered Questions</h3>
              {unAnsweredQuestions.map(question => (
                <QuestionItem
                  question={question}
                  users={users}
                  key={question.id}
                />
              ))}
            </div>
          )}

          {this.state.aq && (
            <div>
              <h3>Answered Questions</h3>
              {answeredQuestions.map(question => (
                <QuestionItem
                  question={question}
                  users={users}
                  key={question.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authentication, questions }) {
  return {
    users,
    authenticated: authentication,
    questions,
    unAnsweredQuestions: Object.values(questions)
      .filter(q => !users[authentication].answers.hasOwnProperty(q.id))
      .sort((a, b) => b.timestamp - a.timestamp),
    answeredQuestions: Object.values(questions)
      .filter(q => users[authentication].answers.hasOwnProperty(q.id))
      .sort((a, b) => b.timestamp - a.timestamp)
  };
}

export default connect(mapStateToProps)(QuestionList);
