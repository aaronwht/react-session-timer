import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Homepage from './Homepage';
import { SecondsRemainingProvider } from './useSecondsRemainingContext';
import Signin from './SignIn';
import PublicPage from './PublicPage';

import 'bootstrap/dist/css/bootstrap.css';
import PrivatePage from './PrivatePage';

const App: React.FC = () => {
  return (
    <SecondsRemainingProvider>
      <Router>
        <Switch>
          <Route path='/public' exact={true} component={PublicPage} />
          <Route path='/private' exact={true} component={PrivatePage} />
          <Route path='/' exact={true} component={Homepage} />
          <Route path='/signin' exact={true} component={Signin} />
        </Switch>
      </Router>
    </SecondsRemainingProvider>
  );
};

export default App;
