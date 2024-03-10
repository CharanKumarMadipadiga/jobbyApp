import {IoMdHome, IoIosLogOut} from 'react-icons/io'
import {IoBagHandleSharp} from 'react-icons/io5'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="tabs-list-sm">
        <Link to="/">
          <IoMdHome className="tabs-icon" />
        </Link>
        <Link to="/jobs">
          <IoBagHandleSharp className="tabs-icon" />
        </Link>
        <IoIosLogOut
          className="tabs-icon"
          htmlFor="logout"
          onClick={onClickLogout}
        />
      </ul>
      <ul className="desktop-tabs-list">
        <li>
          <Link to="/" className="tab-item-desktop border">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="tab-item-desktop border">
            Jobs
          </Link>
        </li>
      </ul>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
