import React from "react";
import { Link } from 'react-router-dom'

const QuestionItem = props => {

  const question = props.question
  const users    = props.users

  return (
    <div className="ui card" key={question.id}>
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
        <a className="header">Would You Rather?</a>
        <div className="meta"></div>
        <div className="description">
          <div>
            ... {question.optionOne.text}... or ...{question.optionTwo.text}...
          </div>
        </div>
      </div>
      <div className="extra content right aligned">
        <Link to={`/questions/${question.id}`}>View Poll</Link>
      </div>
    </div>
  );
};

export default QuestionItem;
