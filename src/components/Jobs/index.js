import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="input-container">
            <input type="search" className="input-El" placeholder="Search" />
          </div>
          <div className="profile-card">
            <img
              src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
              className="profile-img"
            />
            <h1 className="profile-name">Charan Kumar Madipadiga</h1>
            <p className="role">Full-stack Developer and Data Analyst</p>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
