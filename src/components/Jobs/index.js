import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CheckBoxItem from '../CheckBoxItem'
import RadioTabItems from '../RadioTabItems'
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
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    profileObj: {},
    employmentTypeArray: [],
    minimumSalary: '',
    searchInput: '',
  }

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
    const {employmentTypeArray, minimumSalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeArray.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
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

  changeRadioTab = value => {
    this.setState({minimumSalary: value}, this.getJobsList)
  }

  renderRadioTabs = () => (
    <>
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="checkbox-list">
        {salaryRangesList.map(eachItem => (
          <RadioTabItems
            radioTabDetails={eachItem}
            changeRadioTab={this.changeRadioTab}
          />
        ))}
      </ul>
    </>
  )

  checkBoxChange = id => {
    const {employmentTypeArray} = this.state
    if (employmentTypeArray.includes(id)) {
      const updatedList = employmentTypeArray.filter(
        eachItem => eachItem !== id,
      )
      this.setState({employmentTypeArray: updatedList}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({
          employmentTypeArray: [...prevState.employmentTypeArray, id],
        }),
        this.getJobsList,
      )
    }
  }

  renderCheckBoxTabs = () => (
    <>
      <h1 className="employment-heading">Types of Employment</h1>
      <ul className="checkbox-list">
        {employmentTypesList.map(eachItem => (
          <CheckBoxItem
            checkBoxDetails={eachItem}
            checkBoxChange={this.checkBoxChange}
          />
        ))}
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
    const jobsLength = jobsList.length
    const noOfJobs = jobsLength > 0
    return noOfJobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobItem jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onClickSearchBar = () => {
    this.getJobsList()
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
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
                aria-label="Search"
                onClick={this.onClickSearchBar}
              >
                <BsSearch className="search-icon" />
              </button>
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
          <div className="input-all-jobs-list-con">
            <div className="jobs-input-container-desktop">
              <input
                type="search"
                className="jobs-input-El"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
                aria-label="Search"
                onClick={this.onClickSearchBar}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllSections()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
