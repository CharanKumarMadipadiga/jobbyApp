import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {jobsList: [], apiStatus: apiStatusConstants.initial, profileObj: {}}

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileObj: updatedProfileData})
    }
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
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
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

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-caption">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobItem jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderAllSections = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderJobsList()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {profileObj} = this.state
    const {name, shortBio, profileImageUrl} = profileObj

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
                src={profileImageUrl}
                className="profile-img"
                alt="profile"
              />
              <h1 className="profile-name">{name}</h1>
              <p className="role">{shortBio}</p>
            </div>
            <hr className="line" />
            {this.renderCheckBoxTabs()}
            <hr className="line" />
            {this.renderRadioTabs()}
          </div>
          {this.renderAllSections()}
        </div>
      </>
    )
  }
}

export default Jobs
