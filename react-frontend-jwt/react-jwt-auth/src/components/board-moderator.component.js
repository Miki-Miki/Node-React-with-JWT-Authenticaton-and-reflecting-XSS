import React, { Component } from 'react'
import UserService from '../services/user.service'

// this component will display content for the moderator role
export default class BoardModerator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        UserService.getModeratorBoard().then(
            res => {
                this.setState({
                    content: res.data
                })
            },
            err => {
                this.setState({
                    content: 
                        (err.response &&
                            err.response.data &&
                            err.response.data.message) ||
                            err.message || err.toString() 
                })
            }
        )
    }

    render() {
        return (
            <div className="container">
              <header className="jumbotron">
                <h3>{this.state.content}</h3>
              </header>
            </div>
          );
    }
}