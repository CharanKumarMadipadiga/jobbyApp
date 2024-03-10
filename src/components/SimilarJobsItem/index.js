import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp, IoBagHandleSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'

import './index.css'

const SimilarJobsItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="similar-jobs-card">
      <div className="similar-logo-rating-container">
        <img src={companyLogoUrl} alt="logo" className="similar-company-logo" />
        <div className="similar-role-rating-container">
          <h1 className="similar-company-title">{title}</h1>
          <span className="similar-span-con">
            <IoIosStar className="similar-rating-icon" />
            <p className="similar-rating">{rating}</p>
          </span>
        </div>
      </div>
      <h2 className="similar-description-heading">Description</h2>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-sub-container">
        <div className="similar-location-con">
          <IoLocationSharp className="similar-icon" />
          <p className="similar-place">{location}</p>
        </div>
        <div className="similar-location-con">
          <IoBagHandleSharp className="similar-icon" />
          <p className="similar-place">{employmentType}</p>
        </div>
      </div>
    </Link>
  )
}

export default SimilarJobsItem
