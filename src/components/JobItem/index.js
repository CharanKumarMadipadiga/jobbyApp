import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp, IoBagHandleSharp} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    location,
    jobDescription,
    rating,
    packagePerAnnum,
    employmentType,
    title,
  } = jobDetails

  return (
    <li className="job-card-item">
      <div className="logo-rating-container">
        <img src={companyLogoUrl} alt="logo" className="company-logo" />
        <div className="role-rating-container">
          <h1 className="company-title">{title}</h1>
          <span className="span-con">
            <IoIosStar className="rating-icon" />
            <p className="rating">{rating}</p>
          </span>
        </div>
      </div>
      <div className="location-package-container">
        <div className="sub-container">
          <div className="location-con">
            <IoLocationSharp className="icon" />
            <p className="place">{location}</p>
          </div>
          <div className="location-con">
            <IoBagHandleSharp className="icon" />
            <p className="place">{employmentType}</p>
          </div>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="card-line" />
      <h2 className="description-heading">Description</h2>
      <p className="job-description">{jobDescription}</p>
    </li>
  )
}

export default JobItem
