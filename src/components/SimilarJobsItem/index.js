import './index.css'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobsItem = props => {
  const {jobItem} = props

  const updatedJobItem = {
    companyLogoUrl: jobItem.company_logo_url,
    companyWebsiteUrl: jobItem.company_website_url,
    employmentType: jobItem.employment_type,
    jobDescription: jobItem.job_description,
    location: jobItem.location,
    rating: jobItem.rating,
    title: jobItem.title,
  }

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = updatedJobItem

  return (
    <li className="similar-job-item">
      <div className="similar-company-logo-container">
        <div>
          <img
            className="similar-company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
        </div>
        <div className="similar-job-title-and-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <IoMdStar size="26" className="similar-rating-icon-style" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-title">Description</h1>
      <p className="similar-job-description-text">{jobDescription}</p>
      <div className="similar-job-location-and-role-and-salary-container">
        <div className="similar-job-location-and-role-container">
          <div className="similar-location-container">
            <MdLocationOn className="similar-job-location-icon" />
            <p className="similar-job-location">{location}</p>
          </div>
          <div className="similar-internship-container">
            <BsBriefcaseFill className="similar-job-role-icon" />
            <p className="similar-job-role">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsItem
