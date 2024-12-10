import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import ProfileSection from '../ProfileSection'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentTypeIdList: [],
    mimimumPackageId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getAllJobsData()
  }

  getAllJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypeIdList, mimimumPackageId, searchInput} = this.state
    const employmentTypeString = employmentTypeIdList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${mimimumPackageId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = data.jobs.map(eachObject => ({
        companyLogoUrl: eachObject.company_logo_url,
        id: eachObject.id,
        employmentType: eachObject.employment_type,
        jobDescription: eachObject.job_description,
        location: eachObject.location,
        packagePerAnnum: eachObject.package_per_annum,
        rating: eachObject.rating,
        title: eachObject.title,
      }))
      console.log(updatedJobDetails)
      this.setState({
        jobsList: updatedJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length < 1) {
      return (
        <div className="no-jobs-view-container">
          <img
            className="no-jobs-view-image"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="error-msg-1">No Jobs Found</h1>
          <p className="error-msg-2">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-success-view-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
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
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
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

  changeEmploymentTypeId = employmentType => {
    const {employmentTypeIdList} = this.state
    if (employmentTypeIdList.includes(employmentType) === false) {
      this.setState(
        prevState => ({
          employmentTypeIdList: [
            ...prevState.employmentTypeIdList,
            employmentType,
          ],
        }),
        this.getAllJobsData,
      )
    }
  }

  changeSalaryRangeId = salaryRangeId => {
    this.setState({mimimumPackageId: salaryRangeId}, this.getAllJobsData)
  }

  getResults = () => {
    this.getAllJobsData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitChange = searchInput => {
    this.setState({searchInput})
  }

  onClickSearchIcon = () => {
    this.getAllJobsData()
  }

  onClickRetryButton = () => {
    this.getAllJobsData()
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="all-jobs-container">
        <div className="profile-and-filters-section">
          <ProfileSection
            onSubmitChange={this.onSubmitChange}
            getResults={this.getResults}
            searchInput={searchInput}
          />
          <FiltersGroup
            changeEmploymentTypeId={this.changeEmploymentTypeId}
            changeSalaryRangeId={this.changeSalaryRangeId}
          />
        </div>
        <div className="each-job-details-section">
          <div className="jobs-search-container">
            <input
              className="input"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
            >
              <BsSearch
                className="search-icon"
                onClick={this.onClickSearchIcon}
              />
            </button>
          </div>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
