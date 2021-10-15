import logo from './logo.svg';
import './App.css';
import Search from './Components/Search/Search';
import UserProfile from './Components/UserProfile/UserProfile';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Search}/>
          <Route path="/:name" component={UserProfile}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
