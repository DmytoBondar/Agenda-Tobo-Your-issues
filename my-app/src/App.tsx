import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Home from './components/Home/Home';
import Employe from './components/Employe/Employe';
import EmployeEdit from './components/Employe/EmployeEdit';
import AddIssues from './components/Employe/AddIssues';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/em" component={Employe} />
          <Route exact path="/add" component={AddIssues} />
          {/* <Route exact path="/edit/" component={EmployeEdit} /> */}
          {/* <Route exact path="/about" component={About} /> */}
          {/* <Route exact path="/contact" component={Contact} /> */}
          {/* <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />
          <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
