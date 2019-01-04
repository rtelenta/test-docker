import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/fonts/fonts.scss';
import './assets/styles/styles.scss';
import Detail from './components/Detail/Detail';
import Explorer from './components/Explorer/Explorer';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import MyQuestions from './components/MyQuestions/MyQuestions';
import Question from './components/Question/Question';
import Reply from './components/Reply/Reply';

import PrivateRoute from './common/PrivateRoute';
import withTracker from './common/withTracker';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>   
            <PrivateRoute exact={true} path="/logout" component={withTracker(Logout)} />
            <Route exact={true} path="/" component={withTracker(Login)} />
            <PrivateRoute exact={true} path="/question" component={withTracker(Question)} />
            <PrivateRoute exact={true} path="/explorer" component={Explorer} />
            <PrivateRoute exact={true} path="/explorer/:tab" component={Explorer} />
            <PrivateRoute exact={true} path="/question/:id/reply" component={withTracker(Reply)} />
            <PrivateRoute exact={true} path="/question/:id/detail" component={withTracker(Detail)} />
            <PrivateRoute exact={true} path="/my-questions" component={MyQuestions} />
            <PrivateRoute exact={true} path="/my-questions/:tab" component={MyQuestions} />
        </div>
    </Router>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();