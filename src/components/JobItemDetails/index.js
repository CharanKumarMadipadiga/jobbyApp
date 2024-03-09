import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp, IoBagHandleSharp} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {jobDetailsObj: {}, similarJobDetails: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  convertSkills = skills => {
    const updatedSkills = skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    return updatedSkills
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }

      this.setState({jobDetailsObj: updatedData})
    }
  }

  renderSkills = skillsList => (
    <ul className="skills-container">
      {skillsList.map(eachItem => (
        <li className="skills-item">
          <img
            src={eachItem.imageUrl}
            alt={eachItem.name}
            className="skill-img"
          />
          <p className="skill-name">{eachItem.name}</p>
        </li>
      ))}
    </ul>
  )

  render() {
    const {jobDetailsObj} = this.state
    const {skills} = jobDetailsObj
    const updatedSkills = skills ? this.convertSkills(skills) : []
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
      description,
      imageUrl,
    } = jobDetailsObj

    return (
      <>
        <Header />
        <div className="job-details-container">
          <div className="job-details-card">
            <div className="logo-rating-container-jobDetails">
              <img
                src={companyLogoUrl}
                alt="logo"
                className="job-details-company-logo"
              />
              <div className="job-details-role-rating-container">
                <h1 className="job-details-company-title">{title}</h1>
                <span className="job-details-span-con">
                  <IoIosStar className="job-details-rating-icon" />
                  <p className="job-details-rating">{rating}</p>
                </span>
              </div>
            </div>
            <div className="job-details-location-package-container">
              <div className="job-details-sub-container">
                <div className="job-details-location-con">
                  <IoLocationSharp className="icon" />
                  <p className="job-details-place">{location}</p>
                </div>
                <div className="job-details-location-con">
                  <IoBagHandleSharp className="job-details-icon" />
                  <p className="job-details-place">{employmentType}</p>
                </div>
              </div>
              <p className="job-details-package">{packagePerAnnum}</p>
            </div>
            <hr className="job-details-card-line" />
            <div className="description-visit-link-con">
              <h2 className="job-details-description-heading">Description</h2>
              <a href={companyWebsiteUrl} className="visit-con">
                <p className="visit">Visit</p>
                <BsBoxArrowUpRight className="visit-icon" />
              </a>
            </div>
            <p className="job-details-job-description">{jobDescription}</p>
            <h2 className="side-heading">Skills</h2>
            {this.renderSkills(updatedSkills)}
            <div className="company-section-con">
              <div className="company-content-section">
                <h2 className="side-heading">Life at Company</h2>
                <p className="company-description">{description}</p>
              </div>
              <div className="img-container">
                <img src={imageUrl} className="company-img" alt="company img" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
