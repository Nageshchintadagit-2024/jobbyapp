import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobsItem from '../SimilarJobsItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetailsObject: {},
    skillsList: [],
    lifeAtCompanyObject: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const profileUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)

    if (response.ok === true) {
      const fetchedDetails = await response.json()
      const updatedData = {
        jobDetails: fetchedDetails.job_details,
        similarJobs: fetchedDetails.similar_jobs,
      }
      console.log(updatedData)
      this.setState({
        jobDetailsObject: updatedData.jobDetails,
        skillsList: updatedData.jobDetails.skills,
        lifeAtCompanyObject: updatedData.jobDetails.life_at_company,
        similarJobsList: updatedData.similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSimilarObjects = () => {
    const {similarJobsList} = this.state
    return (
      <div className="similar-jobs-container">
        {similarJobsList.map(eachJobItem => (
          <SimilarJobsItem key={eachJobItem.id} jobItem={eachJobItem} />
        ))}
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobDetailsObject, skillsList, lifeAtCompanyObject} = this.state
    const updatedJobDetails = {
      companyLogoUrl: jobDetailsObject.company_logo_url,
      companyWebsiteUrl: jobDetailsObject.company_website_url,
      employmentType: jobDetailsObject.employment_type,
      jobDescription: jobDetailsObject.job_description,
      location: jobDetailsObject.location,
      packagePerAnnum: jobDetailsObject.package_per_annum,
      rating: jobDetailsObject.rating,
      title: jobDetailsObject.title,
      lifeAtCompany: jobDetailsObject.life_at_company,
    }
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = updatedJobDetails

    const updatedSkillsList = skillsList.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const updatedLifeAtCompanyDetails = {
      imageUrl: lifeAtCompanyObject.image_url,
      description: lifeAtCompanyObject.description,
    }

    return (
      <div className="jobs-container">
        <div className="each-job-details-item">
          <div className="each-company-logo-container">
            <div>
              <img
                className="each-company-logo"
                src={companyLogoUrl}
                alt=" job details company logo"
              />
            </div>
            <div className="each-job-title-and-rating-container">
              <h1 className="each-job-title">{title}</h1>
              <div className="each-job-rating-container">
                <IoMdStar size="26" className="each-rating-icon-style" />
                <p className="each-job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="each-job-location-and-role-and-salary-container">
            <div className="each-job-location-and-role-container">
              <div className="each-location-container">
                <MdLocationOn className="job-location-icon" />
                <p className="each-job-location">{location}</p>
              </div>
              <div className="each-internship-container">
                <BsBriefcaseFill className="job-role-icon" />
                <p className="each-job-role">{employmentType}</p>
              </div>
            </div>
            <p className="each-job-salary">{packagePerAnnum}</p>
          </div>
          <hr className="separation" />
          <div className="description-container">
            <h1 className="each-job-title">Description</h1>
            <div className="link-container">
              <a href={companyWebsiteUrl} target="_" className="visit-text">
                <p className="visit-text">Visit</p>
              </a>
              <FiExternalLink className="url-link-style" />
            </div>
          </div>
          <p className="each-job-description-text">{jobDescription}</p>
          <h1 className="skills-text">Skills</h1>
          <ul className="skills-container">
            {updatedSkillsList.map(each => {
              return (
                <li key={each.name} className="each-skill-item">
                  <img
                    className="skill-image"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="skills-text">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {updatedLifeAtCompanyDetails.description}
            </p>
            <img
              className="life-at-company-image"
              src={updatedLifeAtCompanyDetails.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs-main-container">
          <h1 className="similar-jobs-text">Similar Jobs</h1>
          {this.renderSimilarObjects()}
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <>
      <div className="job-failure-view-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="error-msg-1">Oops! Something Went Wrong</h1>
        <p className="error-msg-2">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={this.onClickRetryButtonElement}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="similar-job-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickRetryButtonElement = () => {
    this.getJobDetails()
  }

  render() {
    return (
      <div className="job-details-main-container">
        <Header />
        <div>{this.renderResults()}</div>
      </div>
    )
  }
}

export default JobDetails
