import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`jobs/${id}`} className="job-card-link-style">
      <li className="each-job-item">
        <div className="company-logo-container">
          <div>
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
          </div>
          <div className="job-title-and-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <IoMdStar size="26" className="rating-icon-style" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-and-role-and-salary-container">
          <div className="job-location-and-role-container">
            <div className="location-container">
              <MdLocationOn className="job-location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="internship-container">
              <BsBriefcaseFill className="job-role-icon" />
              <p className="job-role">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="separation" />
        <h1 className="job-title">Description</h1>
        <p className="job-description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
