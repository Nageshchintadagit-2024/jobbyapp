import {Redirect} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onClickSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameContainer = () => {
    const {username} = this.state

    return (
      <div className="user-details-container">
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          className="input"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state

    return (
      <div className="user-details-container">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onClickSubmitForm}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          {this.renderUserNameContainer()}
          {this.renderPasswordContainer()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
