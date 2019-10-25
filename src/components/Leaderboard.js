import React, { Component } from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component {

  componentDidMount() {

  }

  render() {

    const  { userScores } = this.props

    console.log(userScores)


    return (
      <div>
        <div className="ui centered grid">
          <div><h2>Leaderboard</h2></div>
        </div>
        <div className="ui centered grid">
          <div className="eight wide column">
              <div className="ui stacked segment">
                <div className="ui items">

                  { userScores.map((user) =>
                    <div className="item" key={user.id}>
                      <div className="ui small image">
                        <img src={user.avatarURL} alt={user.id} />
                      </div>
                      <div className="content">
                        <div className="header"><strong>{user.name}</strong></div>
                        <div className="meta">
                          <span className="price">Score: <strong>{user.questions + user.answers}</strong> </span>
                          <span className="stay"></span>
                        </div>
                        <div className="description">
                          <p><strong>Questions Asked:</strong> {user.questions}</p>
                          <p><strong>Answered Questions</strong>: {user.answers}</p>
                        </div>
                      </div>
                    </div>
                  )
                  }

                </div>
              </div>
          </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps({users, authentication}) {
  return {
      users,
      authenticated: authentication,
      userScores: Object.values(users).map(user => {

        return {
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          questions: user.questions.length,
          answers: Object.keys(user.answers).length,

        }

      }).sort((a, b) => (b.questions+b.answers) - (a.questions+a.answers))

  }
}

export default connect(mapStateToProps)(Leaderboard)