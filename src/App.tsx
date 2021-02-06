import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Homepage from './Homepage';
import Signin from './SignIn';
import PublicPage from './PublicPage';
import ProtectedPage from './ProtectedPage';

import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/public' exact={true} component={PublicPage} />
        <Route path='/protected' exact={true} component={ProtectedPage} />
        <Route path='/' exact={true} component={Homepage} />
        <Route path='/signin' exact={true} component={Signin} />
      </Switch>
    </Router>
  );
};

export default App;
