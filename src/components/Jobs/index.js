import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {jobsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        rating: eachItem.rating,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        title: eachItem.title,
        id: eachItem.id,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRadioTabs = () => (
    <>
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="checkbox-list">
        <li className="checkbox-container">
          <input type="radio" id="10" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="10">
            10 LPA and Above
          </label>
        </li>
        <li className="checkbox-container">
          <input type="radio" id="20" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="20">
            20 LPA and Above
          </label>
        </li>
        <li className="checkbox-container">
          <input type="radio" id="30" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="30">
            30 LPA and Above
          </label>
        </li>
        <li className="checkbox-container">
          <input type="radio" id="40" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="40">
            40 LPA and Above
          </label>
        </li>
      </ul>
    </>
  )

  renderCheckBoxTabs = () => (
    <>
      <h1 className="employment-heading">Types of Employment</h1>
      <ul className="checkbox-list">
        <li className="checkbox-container">
          <input type="checkbox" id="full time" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="full time">
            Full Time
          </label>
        </li>
        <li className="checkbox-container">
          <input type="checkbox" id="part time" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="part time">
            Part Time
          </label>
        </li>
        <li className="checkbox-container">
          <input type="checkbox" id="freelance" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="freelance">
            Freelance
          </label>
        </li>
        <li className="checkbox-container">
          <input type="checkbox" id="internship" className="checkbox-El" />
          <label className="checkbox-label" htmlFor="internship">
            Internship
          </label>
        </li>
      </ul>
    </>
  )

  render() {
    const {jobsList} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="side-bar-desktop-container">
            <div className="jobs-input-container-mobile">
              <input
                type="search"
                className="jobs-input-El"
                placeholder="Search"
              />
            </div>
            <div className="profile-card">
              <img
                src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                className="profile-img"
                alt="profile"
              />
              <h1 className="profile-name">Charan Kumar Madipadiga</h1>
              <p className="role">Full-stack Developer and Data Analyst</p>
            </div>
            <hr className="line" />
            {this.renderCheckBoxTabs()}
            <hr className="line" />
            {this.renderRadioTabs()}
          </div>
          <div className="desktop-content-view">
            <p className="para">box</p>
            <ul className="jobs-list-container">
              {jobsList.map(eachItem => (
                <JobItem jobDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
