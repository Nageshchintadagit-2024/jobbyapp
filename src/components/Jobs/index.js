import Header from '../Header'
import {Component} from 'react'

import AllJobsSection from '../AllJobsSection'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="jobs-container">
          <AllJobsSection />
        </div>
      </div>
    )
  }
}

export default Jobs
