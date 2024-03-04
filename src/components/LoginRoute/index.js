import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isErrorDisplay: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    const {username} = this.state
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    const {password} = this.state
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label-El" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="input-El"
          required
          id="password"
          placeholder="Password"
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
          value={password}
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="label-El" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="input-El"
          required
          id="username"
          placeholder="Username"
          onChange={this.onChangeUsername}
          onBlur={this.onBlurUsername}
          value={username}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwtToken', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({isErrorDisplay: true, errorMessage: error})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userObj = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userObj),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMessage, isErrorDisplay} = this.state
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={this.onSubmitLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt="website logo"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button className="login-btn" type="submit">
            Login
          </button>
          {isErrorDisplay && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
