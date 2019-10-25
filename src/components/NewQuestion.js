import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion, handleGetQuestions } from "../actions/questions";

class NewQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = { optionOne: "", optionTwo: "" };
  }

  handleChange = (event, option) => {
    if (option === "OptionOne") {
      this.setState({optionOne: event.target.value})
    } else {
      this.setState({optionTwo: event.target.value})
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    const question = {
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
      author: this.props.authedUser
    }


    this.props.dispatch(handleAddQuestion(question))
    this.props.history.push('/')



  }


  render() {
    const { authedUser } = this.props;

    return (
      <div className="ui container">
        <div className="ui grid center aligned">
          <div className="ui row center aligned">
            <div className="eight wide column">
              <h2>Post a Poll</h2>
              <form className="ui large form" onSubmit={this.handleFormSubmit}>
                <div className="ui stacked segment">
                  <div className="field">
                    <div className="ui left labeled input">
                      <label className="ui label">
                        Option 1
                      </label>
                      <input
                        type="text"
                        name="optionOne"
                        id="optionOne"
                        maxLength="40"
                        value={this.state.optionOne}
                        onChange={(event) => this.handleChange(event, "OptionOne")}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left labeled input">
                      <label className="ui label">
                        Option 2
                      </label>
                      <input
                        type="text"
                        name="optionTwo"
                        id="optionTwo"
                        maxLength="40"
                        value={this.state.optionTwo}
                        onChange={(event) => this.handleChange(event, "optionTwo")}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left labeled input"></div>
                    <button className="positive ui button">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authentication, questions }) {
  return {
    users,
    questions,
    authedUser: authentication
  };
}

export default connect(mapStateToProps)(NewQuestion);
