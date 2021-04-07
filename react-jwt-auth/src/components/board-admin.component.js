import React, { Component } from 'react'
import UserService from '../services/user.service'

// this component will display content for the admin role
export default class BoardAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        //going to /api/test/admin
        UserService.getAdminBoard().then(
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