import React, { Component } from "react"
import UserService from "../services/user.service"

// this component will display public content availible to everyone
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        UserService.getPublicContent()
            .then(res => {
                this.setState({
                    content: res.data
                })
            },
            error => {
                this.setState({
                    content: (
                        error.response && 
                        error.response.data) ||
                        error.message || error.toString() 
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
          )
    }
}