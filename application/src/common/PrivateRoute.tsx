import * as React from 'react';  
import { Redirect, Route } from 'react-router-dom';

// Utils
import { isLoggedIn } from './Auth';

const PrivateRoute = ({ component: Component, ...rest } : any) => {
    const render = (props : any) => (
        isLoggedIn() ? 
            ( <Component {...props} /> ) : 
            ( <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />)
    );

    return (  
        <Route {...rest} render={render} />
    )
};

export default PrivateRoute; 