import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Employe from './components/Employe/Employe';
import AddIssues from './components/Employe/AddIssues';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Employe} />
          <Route exact path="/add" component={AddIssues} />
          {/* <Route component={NotFound} />  */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
