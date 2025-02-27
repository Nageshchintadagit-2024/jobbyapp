import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
