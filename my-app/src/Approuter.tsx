import React, {Suspense} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Preloader from './components/common/Preloader';
const Employe = React.lazy(() => import('./components/Employe/Employe'));
const AddIssues = React.lazy(() => import('./components/Employe/AddIssues'));

const Approuter = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Suspense fallback={<Preloader/>}>
                    <Route exact path="/" component={Employe} />
                    <Route exact path="/add" component={AddIssues} />
                </Suspense>
            </Switch>
        </Router>
    )
}

export default Approuter
