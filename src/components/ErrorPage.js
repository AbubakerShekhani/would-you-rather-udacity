import React from 'react'

const ErrorPage = () => {

  return (<div className="ui container">
            <div className="ui grid center aligned">
              <div className="ui row center aligned">
                <div className="eight wide column">
                  <div class="ui placeholder segment">

                    <div class="ui icon header">
                      <h3>404 Not Found</h3>
                      <i class="ban icon"></i>
                      We don't have content that matches your query
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)

}

export default ErrorPage