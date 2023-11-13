import {Link} from 'react-router-dom'
import './index.css'

const NotFoundRoute = () => (
  <div className="not-found-container">
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </nav>

    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="not-found-image"
    />

    <h1 className="not-found-header">Page Not Found</h1>

    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFoundRoute
