import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class ProfileSection extends Component {
  state = {profileData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
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
        name: fetchedDetails.profile_details.name,
        profileImageUrl: fetchedDetails.profile_details.profile_image_url,
        shortBio: fetchedDetails.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-success-view-container">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-view-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
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

  onChangeSearch = event => {
    const {onSubmitChange} = this.props
    onSubmitChange(event.target.value)
  }

  onClickSearch = () => {
    const {getResults} = this.props
    getResults()
  }

  onClickRetry = () => {
    this.getProfileData()
  }

  render() {
    const {searchInput} = this.props
    return (
      <div className="profile-container">
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearch}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onClickSearch}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderResults()}
        <hr className="separator" />
      </div>
    )
  }
}

export default ProfileSection
