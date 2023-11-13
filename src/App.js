import {Route, Switch, Redirect} from 'react-router-dom'
import CourseItem from './components/CourseItem'
import CoursesHome from './components/CoursesHome'
import NotFoundRoute from './components/NotFoundRoute'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={CoursesHome} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route path="/bad-path" component={NotFoundRoute} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
