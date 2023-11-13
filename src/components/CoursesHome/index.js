import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const CourseDetails = props => {
  const {coursesDetails} = props
  const {id, name, logoUrl} = coursesDetails

  return (
    <li className="li-container">
      <Link to={`/courses/${id}`} className="link">
        <img src={logoUrl} alt={name} className="image" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CoursesHome extends Component {
  state = {
    coursesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}
    const res = await fetch(url, options)
    if (res.ok === true) {
      const resBody = await res.json()
      console.log(resBody)
      const fetchedData = resBody.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        coursesData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => this.getCoursesDetails()

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <ul className="ul-container">
        {coursesData.map(eachCourse => (
          <CourseDetails key={eachCourse.id} coursesDetails={eachCourse} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
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

  renderLoader = () => (
    <div data-testid="loader" className="courses-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCourses = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="courses-container">
        <nav className="navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </nav>
        <h1 className="main-heading">Courses</h1>
        {this.renderCourses()}
      </div>
    )
  }
}

export default CoursesHome
