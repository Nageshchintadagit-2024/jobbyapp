import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {IoFileTrayFull} from 'react-icons/io5'
import {IoIosLogOut} from 'react-icons/io'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="link">
          {' '}
          <img
            className="navbar-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="menu-container-mobile-view">
          <Link to="/" className="link">
            {' '}
            <li className="list">
              <IoMdHome color="white" size="30" className="icon-style" />
            </li>
          </Link>
          <Link to="/jobs" className="link">
            {' '}
            <li className="list">
              <IoFileTrayFull color="white" size="30" className="icon-style" />
            </li>
          </Link>
          <li className="list">
            <IoIosLogOut
              color="white"
              size="30"
              className="icon-style"
              onClick={onClickLogout}
            />
          </li>
        </ul>
        <ul className="menu-container-desktop-view">
          <Link to="/" className="link">
            {' '}
            <li className="list-item">Home</li>{' '}
          </Link>
          <Link to="/jobs" className="link">
            <li className="list-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
