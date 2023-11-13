import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const CourseDetails = props => {
  const {courseDetails} = props
  const {imageUrl, name, description} = courseDetails
  return (
    <li className="course-li-container">
      <div className="course-card-container">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="description-card">
          <h1 className="description-header">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    </li>
  )
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItem extends Component {
  state = {
    courseData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const res = await fetch(url, options)
    if (res.ok) {
      const resBody = await res.json()
      console.log(resBody)
      const fetchedData = [resBody.course_details].map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        imageUrl: eachCourse.image_url,
        description: eachCourse.description,
      }))

      this.setState({
        courseData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => this.getCourseDetails()

  successView = () => {
    const {courseData} = this.state
    return (
      <div className="course-container">
        <nav className="navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </nav>
        <ul className="course-ul-container">
          {courseData.map(eachCourse => (
            <CourseDetails key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="courses-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.retry} className="retry-button">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default CourseItem
