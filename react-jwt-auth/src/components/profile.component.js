import React, { Component } from "react"
import AuthService from "../services/auth.service"
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

// this component supplies content to the user's profile page
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.handleInput = this.handleInput.bind(this)
        this.onChangeNoXSSInput = this.onChangeNoXSSInput.bind(this)
        this.onChangeReflectedXSSInput = this.onChangeReflectedXSSInput.bind(this)
        this.handleXSSInput = this.handleXSSInput.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            noXSS: '',
            reflectedXSS: '',
            submitted: false,
        }
    }    

    handleInput(e) {
      // ...
      console.log('form submit')
    }

    // CRITICAL POINT
    // passing user input through eval function to display alert
    // if the input isn't javaScript code, an exception is thrown (message in console), 
    // and text is displayed on site and in the input field above;
    // otherwise the eval function will run js code such as: alert(1)
    handleXSSInput() {
      const input = this.state.reflectedXSS.toString()
      try {
        eval(input)
        this.setState({
          noXSS: ''
        })
      } catch(err) {
        this.setState({
          noXSS: 'invalid xss input'
        })
        console.log('invalid xss input')
      }
    }

    onChangeNoXSSInput(e) {
      this.setState({
        noXSS: e.target.value
      })
    }

    onChangeReflectedXSSInput(e) {
      this.setState({
        reflectedXSS: e.target.value
      })
    }

    render() {
        const { currentUser } = this.state
        const xssPrep = <b></b>

        return (
            <div className="container">
              <header className="jumbotron">
                <h3>
                  <strong>{currentUser.username}</strong> Profile
                </h3>
              </header>
              <p>
                <strong>(90s) Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </p>
              <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>

              <div className="form-container">
                <Form onSubmit={this.handleInput} ref={c => {
                    this.form = c;
                  }}>
                  <div className="form-group">
                    <label>no xss</label>
                    <Input 
                      type="text"
                      className="form-control"
                      name="noXSS"
                      value={this.state.noXSS}
                      onChange={this.onChangeNoXSSInput}
                      />
                  </div>
                  <div className="form-group">
                    <label>reflecting xss</label>
                    <Input 
                      type="text"
                      className="form-control"
                      name="reflectXSS"
                      value={this.state.reflectedXSS}
                      onChange={this.onChangeReflectedXSSInput}
                      />
                  </div>
                </Form>  
                <div className="form-group">
                    <button className="btn btn-primary btn-blcok" onClick={this.handleXSSInput}>
                      <span>Check XSS</span>
                    </button>   
                </div>                         
              </div>

              <h2>{this.state.noXSS}</h2>         
            </div>
          )
    }
}