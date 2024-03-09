import {Route, Switch} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import Jobs from './components/Jobs'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={Jobs} />
  </Switch>
)

export default App
